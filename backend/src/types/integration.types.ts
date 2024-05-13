import { Request, Response } from "express";
import DbInstance from "../db";
import { env } from "../env";
import { IUser } from "../db/models/user";
import mongoose from "mongoose";

export interface IBaseRequest extends Request {
    db: DbInstance,
    user: IUser & {
        _id: mongoose.Types.ObjectId
    }
}

export interface ITypedRequest<TBody extends {} = {}, TQuery extends {} = {}> extends IBaseRequest {
    body: TBody,
    query: TQuery
}

export interface IExtendedResponse extends Response {
    error: (message: string) => void
    success: <TResult>(result: TResult) => void
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

export type PaginationRequest = {
    page: number
}

export type PaginationResponse<TResult> = {
    data: TResult[],
    count: number
}