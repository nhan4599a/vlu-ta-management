import { Request, Response } from "express";
import { createTypedRequest } from "../../helper/type.helper";
import { IUser } from "../../db/models/user";
import { ColumnMapping } from "../../types/integration.types";
import { readExcelFile, writeExcelData } from "../../helper/file.helper";
import { Workbook } from "excel4node";
import mongoose, { AnyBulkWriteOperation } from "mongoose";
import { IApplicationForm } from "../../db/models/application-form";
import DbInstance from "../../db";
import { IScheduleDetail, ITerm } from "../../db/models/term";

const mapping: ColumnMapping<IUser> = {
  name: { column: 1, headerName: "Tên sinh viên" },
  code: { column: 2, headerName: "MSSV" },
  class: { column: 3, headerName: "Lớp" },
  phoneNumber: { column: 4, headerName: "Số điện thoại" },
};

type GroupedResult<TKey> = {
  _id: TKey;
  applications: IApplicationForm[];
};

type GroupedResultV2 = {
  scheduleGroup: GroupedResult<mongoose.Types.ObjectId>[];
  userGroup: GroupedResult<string>[];
};

const readPassTrainingFile = async (
  file: Express.Multer.File
): Promise<string[]> => {
  const data = await readExcelFile(file);

  return data.map((item) => {
    return item[1].toString();
  });
};

const getMaxCandidatesCount = async (
  db: DbInstance,
  scheduleId: mongoose.Types.ObjectId
): Promise<number> => {
  const result = await db.terms.aggregate<{ candidatesCount: number }>([
    {
      $unwind: {
        path: "$classes",
        includeArrayIndex: "classIndex",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$classes.schedule",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ["$$ROOT", "$classes"],
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ["$$ROOT", "$schedule"],
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ["$$ROOT", "$classes"],
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ["$$ROOT", "$schedule"],
        },
      },
    },
    {
      $match: {
        "schedule._id": scheduleId,
      },
    },
    {
      $project: {
        candidatesCount: "$shedule.registrationInfo.candidatesCount",
        _id: 0,
      },
    },
  ]);

  return result[0].candidatesCount;
};

const getScheduleInfo = async (
  db: DbInstance,
  scheduleId: mongoose.Types.ObjectId
): Promise<IScheduleDetail> => {
  const result = await db.terms.aggregate<IScheduleDetail>([
    {
      $unwind: {
        path: "$classes",
        includeArrayIndex: "classIndex",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$classes.schedule",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ["$$ROOT", "$classes"],
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ["$$ROOT", "$schedule"],
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ["$$ROOT", "$classes"],
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ["$$ROOT", "$schedule"],
        },
      },
    },
    {
      $match: {
        "schedule._id": scheduleId,
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  return result[0];
};

export const writeEligibleList = async (req: Request, res: Response) => {
  const { db } = createTypedRequest(req);

  const data = await db.applications
    .aggregate<IUser>([
      {
        $match: {
          stage1Approval: true,
        },
      },
      {
        $group: {
          _id: null,
          users: {
            $addToSet: "$code",
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "users",
          foreignField: "code",
          as: "mapped_users",
        },
      },
      {
        $unwind: {
          path: "$mapped_users",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$mapped_users", "$$ROOT"],
          },
        },
      },
      {
        $project: {
          users: 0,
          mapped_users: 0,
        },
      },
    ])
    .exec();

  const wb = new Workbook();
  const ws = wb.addWorksheet("Danh sách đào tạo trợ giảng");
  writeExcelData(ws, data, mapping);

  wb.write("Danh sách đào tạo trợ giảng.xlsx", res);
};

export const importPassTrainingList = async (req: Request) => {
  const { db, file, user } = createTypedRequest(req);

  const passedTrainingCode = await readPassTrainingFile(file!);

  const { currentSetting } = user;

  const applications = await db.applications
    .aggregate<GroupedResult<mongoose.Types.ObjectId>>([
      {
        $match: {
          year: currentSetting!.year,
          semester: currentSetting!.semester,
          stage1Approval: true,
          stage2Approval: null,
          isPending: false,
        },
      },
      {
        $sort: {
          termScore: -1,
          avgScore: -1,
          priority: -1,
        },
      },
      {
        $group: {
          _id: "$scheduleId",
          applications: {
            $push: {
              _id: "$_id",
              code: "$code",
            },
          },
        },
      },
    ])
    .exec();

  await db.startTransaction();

  const applicationActions: AnyBulkWriteOperation<IApplicationForm>[] = [];
  const usersActions: AnyBulkWriteOperation<IUser>[] = [];
  const termsActions: AnyBulkWriteOperation<ITerm>[] = [];

  for (const group of applications) {
    const numberOfCandidates = await getMaxCandidatesCount(db, group._id);

    const applications: IApplicationForm[] = [];

    for (const application of group.applications) {
      if (!passedTrainingCode.includes(application.code)) {
        applicationActions.push({
          updateOne: {
            filter: {
              _id: application._id,
            },
            update: {
              $set: {
                stage2Approval: false,
              },
            },
          },
        });
      } else {
        applications.push(application);
      }
    }

    if (applications.length > numberOfCandidates) {
      applicationActions.push(
        ...applications.map((e) => {
          return {
            updateOne: {
              filter: {
                _id: e._id,
              },
              update: {
                $set: {
                  isPending: true,
                },
              },
            },
          };
        })
      );
      continue;
    }

    for (const application of applications) {
      applicationActions.push({
        updateOne: {
          filter: {
            _id: application._id,
          },
          update: {
            $set: {
              stage2Approval: true,
            },
          },
        },
      });
      usersActions.push({
        updateOne: {
          filter: {
            code: application.code,
          },
          update: {
            isAssistant: true,
          },
        },
      });
      termsActions.push({
        updateOne: {
          filter: {
            "classes.schedule._id": group._id,
          },
          update: {
            $push: {
              "classes.$[].schedule.$[i].assistants": application.code,
            },
          },
          arrayFilters: [
            {
              "i._id": group._id,
            },
          ],
        },
      });
    }
  }

  await Promise.all([
    db.applications.bulkWrite(applicationActions),
    db.users.bulkWrite(usersActions),
    db.terms.bulkWrite(termsActions),
  ]);

  await db.commitTransaction();
};

export const importPassTrainingListv2 = async (req: Request) => {
  const { db, file, user } = createTypedRequest(req);

  const passedTrainingCode = await readPassTrainingFile(file!);

  const { currentSetting } = user;

  const groups = await db.applications
    .aggregate<GroupedResultV2>([
      {
        $facet: {
          scheduleGroup: [
            {
              $match: {
                year: currentSetting!.year,
                semester: currentSetting!.semester,
                stage1Approval: true,
                stage2Approval: null,
                isPending: false,
              },
            },
            {
              $sort: {
                termScore: -1,
                avgScore: -1,
                priority: -1,
              },
            },
            {
              $group: {
                _id: "$scheduleId",
                applications: {
                  $push: {
                    _id: "$_id",
                    code: "$code",
                  },
                },
              },
            },
          ],
          userGroup: [
            {
              $match: {
                year: currentSetting!.year,
                semester: currentSetting!.semester,
                stage1Approval: true,
                stage2Approval: null,
                isPending: false,
              },
            },
            {
              $sort: {
                priority: -1,
                termScore: -1,
                avgScore: -1,
              },
            },
            {
              $group: {
                _id: "$code",
                applications: {
                  $push: {
                    _id: "$_id",
                    scheduleId: "$scheduleId",
                  },
                },
              },
            },
          ],
        },
      },
    ])
    .exec();

  const data = groups[0];

  await db.startTransaction();

  const applicationActions: AnyBulkWriteOperation<IApplicationForm>[] = [];
  const usersActions: AnyBulkWriteOperation<IUser>[] = [];
  const termsActions: AnyBulkWriteOperation<ITerm>[] = [];

  const scheduleInfoMap = new Map<mongoose.Types.ObjectId, IScheduleDetail>();

  for (const {
    _id: userCode,
    applications: applicationsOfUser,
  } of data.userGroup) {
    if (!passedTrainingCode.includes(userCode)) {
      applicationActions.push(
        ...applicationsOfUser.map((application) => {
          return {
            updateOne: {
              filter: {
                _id: application._id,
              },
              update: {
                $set: {
                  stage2Approval: false,
                },
              },
            },
          };
        })
      );
      continue;
    }

    for (const userApplication of applicationsOfUser) {
      const scheduleInfo =
        scheduleInfoMap.get(userApplication.scheduleId) ??
        (await getScheduleInfo(db, userApplication.scheduleId));

      const { applications } = data.scheduleGroup.find(
        (e) => e._id === userApplication.scheduleId
      )!;

      const applicationsOfSchedule = applications.filter((e) =>
        passedTrainingCode.includes(e.code)
      );

      if (
        applicationsOfSchedule.length >
        scheduleInfo.registrationInfo!.candidatesCount
      ) {
        applicationActions.push(
          ...applicationsOfSchedule.map((e) => {
            return {
              updateOne: {
                filter: {
                  _id: e._id,
                },
                update: {
                  $set: {
                    isPending: true,
                  },
                },
              },
            };
          })
        );
      }
    }
  }

  await Promise.all([
    db.applications.bulkWrite(applicationActions),
    db.users.bulkWrite(usersActions),
    db.terms.bulkWrite(termsActions),
  ]);

  await db.commitTransaction();
};
