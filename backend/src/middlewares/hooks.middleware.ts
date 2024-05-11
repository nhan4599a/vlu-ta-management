import { Request, Response, NextFunction } from "express"
import DbInstance from "../db"
import { IBaseRequest, IExtendedResponse } from "../types/integration.types"

export const attachDbInstance = (req: Request, _: Response, next: NextFunction) => {
    const baseReq = req as IBaseRequest
    baseReq.db = new DbInstance()

    next()
}

export const extendResponseMethods = (_: Request, res: Response, next: NextFunction) => {
    const baseRes = res as IExtendedResponse

    baseRes.success = (function<TResult>(this: typeof res, result: TResult) {
        this.json({
            success: true,
            result: result
        })
    }).bind(res)

    baseRes.error = (function(this: typeof res, message: string) {
        this.json({
            success: false,
            error: message
        })
    }).bind(res)

    next()
}