import { Request } from "express"
import { IBaseRequest, TypedRequest } from "../types/integration.types"

export const createTypedRequest = <TBody extends {}, TQuery extends {}>(req: Request) => {
    return req as IBaseRequest as TypedRequest<TBody, TQuery>
}