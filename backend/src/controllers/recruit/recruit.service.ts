import { Request } from "express";
import { createTypedRequest } from "../../helper/type.helper";
import mongoose from "mongoose";
import { IRegistrationInfo } from "../../db/models/term";

export const getRecruimentInfo = (req: Request) => {
  const { db, params } = createTypedRequest<{}, {}>(req);

  return db.terms
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
        $match: {
          "classes._id": new mongoose.Types.ObjectId(params.classId),
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$classes", "$$ROOT"],
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
          registrationInfo: 0
        },
      },
    ])
    .exec()
    .then((terms) => terms[0]);
};
