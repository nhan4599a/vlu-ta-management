import { Request, Response } from "express";
import DbInstance from "../db";

export interface IBaseRequest extends Request {
    db: DbInstance
}

export interface TypedRequest<TBody extends {} = {}> extends IBaseRequest {
    body: TBody
}

export interface BaseResponse<TResult> extends Response<TResult> {
    success: boolean
}