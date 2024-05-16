import { Request } from "express";
import { createTypedRequest } from "../../helper/type.helper";
import mongoose from "mongoose";
import { IRegistrationInfo } from "../../db/models/term";
import { IBaseRequest, PaginationRequest } from "../../types/integration.types";
import { paginate } from "../../helper/pagination.helper";

export const getRecruimentInfo = async (req: Request) => {
  const { db, params } = createTypedRequest<{}, {}>(req);

  const terms = await db.terms
    .aggregate<IRegistrationInfo | undefined>([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(params.id),
        },
      },
      {
        $unwind: {
          path: "$classes",
        },
      },
      {
        $unwind: {
          path: "$classes.schedule",
        },
      },
      {
        $match: {
          "classes.schedule._id": new mongoose.Types.ObjectId(params.classId),
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$classes.schedule", "$$ROOT"],
          },
        },
      },
      {
        $project: {
          registrationInfo: 1,
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$registrationInfo", "$$ROOT"],
          },
        },
      },
      {
        $project: {
          _id: 0,
          registrationInfo: 0,
        },
      },
    ])
    .exec();

  return terms[0];
};

export const getApplicationsList = (req: Request) => {
  const { db } = req as IBaseRequest;

  return db.terms
    .aggregate([
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
        $set: {
          className: "$name",
          code: {
            $concat: [
              "$code",
              "_",
              "0",
              {
                $toString: {
                  $add: ["$classIndex", 1],
                },
              },
            ],
          },
          rootId: "$_id",
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
        $set: {
          scheduleId: "$classes.schedule._id",
          lesson: {
            $concat: [
              {
                $toString: "$startLesson",
              },
              "-",
              {
                $toString: "$endLesson",
              },
            ],
          },
        },
      },
      {
        $addFields: {
          isApproved: {
            $eq: ["$classes.schedule.registrationInfo.approved", true],
          },
          isRegistered: {
            $ne: ["$classes.schedule.registrationInfo", null],
          },
        },
      },
      {
        $set: {
          name: "$className",
          id: "$rootId",
        },
      },
      {
        $unset: [
          "rootId",
          "classes",
          "schedule",
          "className",
          "startLesson",
          "endLesson",
        ],
      },
      {
        $project: {
          id: 1,
          name: 1,
          code: 1,
          type: 1,
          credits: 1,
          day: 1,
          lesson: 1,
          scheduleId: 1,
          isApproved: 1,
          isRegistered: 1,
          _id: 0,
        },
      },
      {
        $set: {
          day: {
            $switch: {
              branches: [
                {
                  case: {
                    $eq: ["$day", 0],
                  },
                  then: "Thứ 2",
                },
                {
                  case: {
                    $eq: ["$day", 1],
                  },
                  then: "Thứ 3",
                },
                {
                  case: {
                    $eq: ["$day", 2],
                  },
                  then: "Thứ 4",
                },
                {
                  case: {
                    $eq: ["$day", 3],
                  },
                  then: "Thứ 5",
                },
                {
                  case: {
                    $eq: ["$day", 4],
                  },
                  then: "Thứ 6",
                },
                {
                  case: {
                    $eq: ["$day", 5],
                  },
                  then: "Thứ 7",
                },
                {
                  case: {
                    $eq: ["$day", 6],
                  },
                  then: "Chủ nhật",
                },
              ],
              default: "",
            },
          },
        },
      },
      {
        $match: {
          isApproved: false,
        },
      },
      {
        $lookup: {
          from: "applications",
          localField: "scheduleId",
          foreignField: "scheduleId",
          as: "applications",
        },
      },
      {
        $set: {
          count: {
            $size: "$applications",
          },
        },
      },
      {
        $match: {
          count: {
            $gt: 0,
          },
        },
      },
      {
        $set: {
          applications: {
            $slice: ["$applications", 10],
          },
        },
      },
      {
        $project: {
          name: 1,
          lesson: 1,
          applications: 1,
          hasMore: {
            $gt: ["$count", 10],
          },
        },
      },
    ])
    .exec();
};

export const getApplicationsOfSchedule = (req: Request) => {
  const { db, params, query } = createTypedRequest<{}, PaginationRequest>(req);

  return paginate(db.appliactions, query, [
    {
      $match: {
        scheduleId: params.classid,
      },
    },
  ]);
};
