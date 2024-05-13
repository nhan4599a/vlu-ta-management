import { Request } from "express";
import { createTypedRequest } from "../../helper/type.helper";
import mongoose from "mongoose";
import { IRegistrationInfo } from "../../db/models/term";

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
