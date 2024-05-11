import { Request } from "express"
import { IBaseRequest, ITypedRequest } from "../types/integration.types"

export const createTypedRequest = <TBody extends {}, TQuery extends {}>(req: Request) => {
    return req as IBaseRequest as ITypedRequest<TBody, TQuery>
}
