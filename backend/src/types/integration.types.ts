import { Request, Response } from "express";
import DbInstance from "../db";
import { env } from "../env";
import { ExtendedUser } from "../db/models/user";

export interface IBaseRequest extends Request {
    db: DbInstance,
    user: ExtendedUser
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

export class UnauthenticatedError extends HttpError {
    constructor(message: string) {
        super(401, message)
    }
}

export class ForbiddenError extends HttpError {
    constructor() {
        super(403, 'Không có quyền')
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

type ColumnMappingDetail = {
    column: number
    headerName?: string
}

export type ColumnMapping<TData> = {
    [column in keyof TData]?: ColumnMappingDetail
}