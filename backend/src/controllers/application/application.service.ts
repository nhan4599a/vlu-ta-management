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
