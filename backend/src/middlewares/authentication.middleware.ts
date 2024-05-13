import { Request, Response, NextFunction } from "express";
import { JwtPayload, decode } from "jsonwebtoken";
import { IUser } from "../db/models/user";
import { IBaseRequest } from "../types/integration.types";
import DbInstance from "../db";
import { constants } from "../constants";
import { Role } from "../constants/role.enum";
import mongoose from "mongoose";

type GetUserInfoCallback = (
  err: Error | null,
  user?: IUser & {
    _id: mongoose.Types.ObjectId;
  }
) => void;

const getUserInfo = (
  db: DbInstance,
  payload: JwtPayload,
  callback: GetUserInfoCallback
) => {
  const email = payload[constants.AUTHENTICATION.EMAIL_CLAIM];
  db.users
    .where({
      email: email,
    })
    .exec()
    .then((users) => {
      const schoolUserInfo = payload["name"].split(" - ");

      const role = constants.AUTHENTICATION.ADMIN_ACCOUNTS.includes(email)
        ? Role.Admin
        : Role.Student;

      const user = users[0] ?? {
        code: schoolUserInfo[0],
        email: email,
        role: role,
        name: schoolUserInfo[1],
        class: schoolUserInfo[2],
        active: true,
      };

      callback(null, user);
    })
    .catch((err) => callback(err, undefined));
};

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  const accessToken = authHeader?.split(" ")[1];

  if (!authHeader || !accessToken) {
    res.status(401).json({
      success: false,
      message: "Invalid access token",
    });
  }

  const decodedToken = decode(accessToken!, {
    complete: true,
  });

  if (!decodedToken?.payload) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  } else {
    const request = req as IBaseRequest;
    getUserInfo(request.db, decodedToken.payload as JwtPayload, (err, user) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      } else {
        request.user = user!;
        next();
      }
    });
  }
};
