import { NextFunction, Request, Response } from "express";
import {
  BadRequestError,
  HttpError,
  InternalServerError,
} from "../types/integration.types";

export const errorLogging = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(err instanceof BadRequestError)) {
    console.error(err);
  }

  next(err);
};

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const httpError: HttpError =
    err instanceof HttpError ? err : new InternalServerError(err.message);

  res.status(httpError.statusCode).send({
    success: false,
    message: httpError.message,
  });
};
