import { Request } from "express"
import { Role } from "../../constants/role.enum"
import { createTypedRequest } from "../../helper/type.helper"
import { PaginationRequest } from "../../types/integration.types"
import { paginate } from "../../helper/pagination.helper"

type GetUserByRoleQuery = PaginationRequest & {
    role: Role
}

export const getUsersByRole = (req: Request) => {
    const { db, query } = createTypedRequest<{}, GetUserByRoleQuery>(req)

    return paginate(db.users, query, [
        {
            $match: {
                role: query.role
            }
        }
    ])
}