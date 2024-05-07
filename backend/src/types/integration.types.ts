import { Request, Response } from "express";
import DbInstance from "../db";
import { env } from "../env";

export interface IBaseRequest extends Request {
    db: DbInstance
}

export interface TypedRequest<TBody extends {} = {}> extends IBaseRequest {
    body: TBody
}

export interface BaseResponse<TResult> extends Response<TResult> {
    success: boolean
}

export abstract class HttpError extends Error {
    statusCode: number

    constructor(statusCode: number, message: string) {
        super(message)
        this.statusCode = statusCode
    }
}

export class BadRequestError extends HttpError {
    constructor(message: string) {
        super(400, message)
    }
}

export class InternalServerError extends HttpError {
    constructor(message: string) {
        super(500, env.isDev ? message : 'Internal server error')
    }
}