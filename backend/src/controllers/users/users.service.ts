import { Request } from "express";
import { Role } from "../../constants/role.enum";
import { createTypedRequest } from "../../helper/type.helper";
import { PaginationRequest } from "../../types/integration.types";
import { paginate } from "../../helper/pagination.helper";
import { PipelineStage } from "mongoose";

type GetUserQuery = PaginationRequest & {
  role: Role;
  isAssistant: boolean;
  needEducated: boolean;
};

export const getUsersList = (req: Request) => {
  const { db, query } = createTypedRequest<{}, GetUserQuery>(req);

  if (query.needEducated) {
    return paginate(db.applications, query, [
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
          mapped_users: 0
        },
      },
    ]);
  }

  const matchPipeline: PipelineStage = {
    $match: {
      role: query.role,
    },
  };

  if (query.isAssistant) {
    matchPipeline.$match.isAssistant = true;
  }

  return paginate(db.users, query, [matchPipeline]);
};
