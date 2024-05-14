import { Request } from "express";
import { Role } from "../../constants/role.enum";
import { createTypedRequest } from "../../helper/type.helper";
import { PaginationRequest } from "../../types/integration.types";
import { paginate } from "../../helper/pagination.helper";
import { PipelineStage } from "mongoose";

type GetUserByRoleQuery = PaginationRequest & {
  role: Role;
  isAssistant: boolean;
};

export const getUsersList = (req: Request) => {
  const { db, query } = createTypedRequest<{}, GetUserByRoleQuery>(req);

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
