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
import { orderBy } from "lodash";

const mapping: ColumnMapping<IUser> = {
  name: { column: 1, headerName: "Tên sinh viên" },
  code: { column: 2, headerName: "MSSV" },
  class: { column: 3, headerName: "Lớp" },
  phoneNumber: { column: 4, headerName: "Số điện thoại" },
};

type GroupedResult = {
  _id: string;
  applications: IApplicationForm[];
};

const readPassTrainingFile = async (
  file: Express.Multer.File
): Promise<string[]> => {
  const data = await readExcelFile(file);

  return data.map((item) => {
    return item[1].toString();
  });
};

const getScheduleInfo = async (
  db: DbInstance,
  scheduleId: mongoose.Types.ObjectId
): Promise<IScheduleDetail> => {
  const result = await db.terms.aggregate<IScheduleDetail>([
    {
      $unwind: {
        path: "$classes",
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
  const headerStyle = wb.createStyle({
    fill: {
      type: "pattern",
      patternType: "solid",
      fgColor: "#FFFF00",
      bgColor: "#FFFF00"
    },
  });
  ws.cell(1, 1, 1, 4).style(headerStyle);
  wb.write("Danh sách đào tạo trợ giảng.xlsx", res);
};

export const importPassTrainingList = async (req: Request) => {
  const { db, file, user } = createTypedRequest(req);

  const passedTrainingCode = await readPassTrainingFile(file!);

  const { currentSetting } = user;

  const groupData = await db.applications
    .aggregate<GroupedResult>([
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
          priority: 1,
        },
      },
      {
        $group: {
          _id: "$code",
          applications: {
            $push: {
              _id: "$_id",
              code: "$code",
              scheduleId: "$scheduleId",
              termScore: "$termScore",
              avgScore: "$avgScore",
              priority: "$priority",
            },
          },
        },
      },
    ])
    .exec();

  const scheduleInfoMap = new Map<mongoose.Types.ObjectId, IScheduleDetail>();
  const scheduleApplicationsMap = new Map<
    mongoose.Types.ObjectId,
    IApplicationForm[]
  >();

  const applicationActions: AnyBulkWriteOperation<IApplicationForm>[] = [];
  const usersActions: AnyBulkWriteOperation<IUser>[] = [];
  const termsActions: AnyBulkWriteOperation<ITerm>[] = [];

  await db.startTransaction();

  for (const { _id, applications } of groupData) {
    if (!passedTrainingCode.includes(_id)) {
      applicationActions.push(
        ...applications.map((application) => {
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

    const scheduleMap = new Map<number, [number, number][]>();

    for (const application of applications) {
      if (!scheduleInfoMap.has(application.scheduleId)) {
        scheduleInfoMap.set(
          application.scheduleId,
          await getScheduleInfo(db, application.scheduleId)
        );
      }

      const scheduleInfo = scheduleInfoMap.get(application.scheduleId);

      const schedule = scheduleMap.get(scheduleInfo!.day);

      // Check if time is overlapsed
      if (
        !schedule ||
        !schedule.some(
          ([start, end]) =>
            scheduleInfo!.startLesson >= start &&
            scheduleInfo!.startLesson <= end
        )
      ) {
        const savedApplications =
          scheduleApplicationsMap.get(application.scheduleId) ?? [];

        scheduleApplicationsMap.set(application.scheduleId, [
          ...savedApplications,
          application,
        ]);

        if (!schedule) {
          scheduleMap.set(scheduleInfo!.day, [
            [scheduleInfo!.startLesson, scheduleInfo!.endLesson],
          ]);
        } else {
          scheduleMap.set(scheduleInfo!.day, [
            ...schedule,
            [scheduleInfo!.startLesson, scheduleInfo!.endLesson],
          ]);
        }
      } else {
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
      }
    }
  }

  for (const [scheduleId, uoApplications] of scheduleApplicationsMap) {
    const applications = orderBy(
      uoApplications,
      ["termScore", "avgScore", "priority"],
      ["desc", "desc", "asc"]
    );

    let matchedCount = 1;

    for (let i = 1; i < applications.length; i++) {
      const { termScore, avgScore, priority } = applications[i];

      if (
        termScore === applications[0].termScore &&
        avgScore === applications[0].avgScore &&
        priority === applications[0].priority
      ) {
        matchedCount++;
        continue;
      }

      break;
    }

    const { candidatesCount } =
      scheduleInfoMap.get(scheduleId)!.registrationInfo!;

    if (applications.length <= candidatesCount) {
      applicationActions.push(
        ...applications.map((e) => {
          return {
            updateOne: {
              filter: {
                _id: e._id,
              },
              update: {
                $set: {
                  stage2Approval: true,
                },
              },
            },
          };
        })
      );
      usersActions.push(
        ...applications.map((application) => {
          return {
            updateOne: {
              filter: {
                code: application.code,
              },
              update: {
                $set: {
                  isAssistant: true,
                },
              },
            },
          };
        })
      );
      termsActions.push(
        ...applications.map((application) => {
          return {
            updateOne: {
              filter: {
                "classes.schedule._id": scheduleId,
              },
              update: {
                $push: {
                  "classes.$[].schedule.$[i].assistants": application.code,
                },
              },
              arrayFilters: [
                {
                  "i._id": scheduleId,
                },
              ],
            },
          };
        })
      );
    } else {
      if (matchedCount > candidatesCount) {
        applicationActions.push(
          ...applications.slice(0, matchedCount).map((e) => {
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
        applicationActions.push(
          ...applications.slice(matchedCount).map((e) => {
            return {
              updateOne: {
                filter: {
                  _id: e._id,
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
      } else {
        applicationActions.push(
          ...applications.slice(0, candidatesCount).map((e) => {
            return {
              updateOne: {
                filter: {
                  _id: e._id,
                },
                update: {
                  $set: {
                    stage2Approval: true,
                  },
                },
              },
            };
          })
        );
        usersActions.push(
          ...applications.slice(0, candidatesCount).map((application) => {
            return {
              updateOne: {
                filter: {
                  code: application.code,
                },
                update: {
                  $set: {
                    isAssistant: true,
                  },
                },
              },
            };
          })
        );
        termsActions.push(
          ...applications.slice(0, candidatesCount).map((application) => {
            return {
              updateOne: {
                filter: {
                  "classes.schedule._id": scheduleId,
                },
                update: {
                  $push: {
                    "classes.$[].schedule.$[i].assistants": application.code,
                  },
                },
                arrayFilters: [
                  {
                    "i._id": scheduleId,
                  },
                ],
              },
            };
          })
        );
        applicationActions.push(
          ...applications.slice(candidatesCount).map((e) => {
            return {
              updateOne: {
                filter: {
                  _id: e._id,
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

export const getImportPassTrainingResult = (req: Request) => {
  const { db, user } = createTypedRequest(req);

  return db.terms
    .aggregate([
      {
        $match: {
          year: user.currentSetting?.year,
          semester: user.currentSetting?.semester,
        },
      },
      {
        $unwind: {
          path: "$classes",
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
        $lookup: {
          from: "applications",
          localField: "classes.schedule._id",
          foreignField: "scheduleId",
          as: "applications",
          pipeline: [
            {
              $match: {
                year: user.currentSetting?.year,
                semester: user.currentSetting?.semester,
              },
            },
          ],
        },
      },
      {
        $set: {
          _id: "$classes.schedule._id",
          day: {
            $switch: {
              branches: [
                {
                  case: {
                    $eq: ["$classes.schedule.day", 0],
                  },
                  then: "Thứ 2",
                },
                {
                  case: {
                    $eq: ["$classes.schedule.day", 1],
                  },
                  then: "Thứ 3",
                },
                {
                  case: {
                    $eq: ["$classes.schedule.day", 2],
                  },
                  then: "Thứ 4",
                },
                {
                  case: {
                    $eq: ["$classes.schedule.day", 3],
                  },
                  then: "Thứ 5",
                },
                {
                  case: {
                    $eq: ["$classes.schedule.day", 4],
                  },
                  then: "Thứ 6",
                },
                {
                  case: {
                    $eq: ["$classes.schedule.day", 5],
                  },
                  then: "Thứ 7",
                },
                {
                  case: {
                    $eq: ["$classes.schedule.day", 6],
                  },
                  then: "Chủ nhật",
                },
              ],
              default: "",
            },
          },
          lesson: {
            $concat: [
              {
                $toString: "$classes.schedule.startLesson",
              },
              "-",
              {
                $toString: "$classes.schedule.endLesson",
              },
            ],
          },
          count: { $size: "$applications" },
          applications: {
            $filter: {
              input: "$applications",
              as: "applications",
              cond: {
                $or: [{ isPending: true }, { stage2Approval: true }],
              },
            },
          },
        },
      },
      {
        $project: {
          classes: 0,
          semester: 0,
          year: 0,
          credits: 0,
          sessions: 0,
        },
      },
    ])
    .exec();
};

export const approveFinal = async (req: Request) => {
  const { db, params } = createTypedRequest(req);

  const id = new mongoose.Types.ObjectId(params.id);

  const application = await db.applications.findById(id);

  const applicationActions: AnyBulkWriteOperation<IApplicationForm>[] = [];
  const usersActions: AnyBulkWriteOperation<IUser>[] = [];
  const termsActions: AnyBulkWriteOperation<ITerm>[] = [];

  await db.startTransaction();

  applicationActions.push({
    updateOne: {
      filter: {
        _id: id,
      },
      update: {
        $set: {
          stage2Approval: true,
          isPending: false,
        },
      },
    },
  });
  usersActions.push({
    updateOne: {
      filter: {
        code: application!.code,
      },
      update: {
        $set: {
          isAssistant: true,
        },
      },
    },
  });
  termsActions.push({
    updateOne: {
      filter: {
        "classes.schedule._id": application!.scheduleId,
      },
      update: {
        $push: {
          "classes.$[].schedule.$[i].assistants": application!.code,
        },
      },
      arrayFilters: [
        {
          "i._id": application!.scheduleId,
        },
      ],
    },
  });

  await Promise.all([
    db.applications.bulkWrite(applicationActions),
    db.users.bulkWrite(usersActions),
    db.terms.bulkWrite(termsActions),
  ]);

  await db.commitTransaction();
};
