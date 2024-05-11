import { Response } from "express";
import { HttpError, IExtendedResponse } from "../types/integration.types";

export const responseWithValue = <TResult>(res: Response, result: TResult) => {
  const extendedResponse = res as IExtendedResponse;

  extendedResponse.success(result);
};

export const responseError = (res: Response, error: HttpError) => {
  const extendedResponse = res as IExtendedResponse;

  extendedResponse.status(error.statusCode).error(error.message);
};
