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
        ? Role.StudentAssociate
        : Role.Student;

      const user = users[0] ?? {
        code: schoolUserInfo[0],
        email: email,
        role: role,
        name: schoolUserInfo[1],
        class: schoolUserInfo[2],
        active: true,
        isAssistant: false,
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
    return;
  }

  const request = req as IBaseRequest;

  // **** This is only for testing purpose ****
  const id = accessToken.includes("-")
    ? new mongoose.Types.ObjectId(accessToken.split("-")[1])
    : new mongoose.Types.ObjectId();

  if (accessToken?.includes(Role[Role.StudentAssociate])) {
    request.user = {
      _id: id,
      active: true,
      email: "admin@vanlanguni.edu.com",
      name: "admin",
      role: Role.StudentAssociate,
      class: "PM2",
      code: "admin",
      isAssistant: false,
    };
    next();
    return;
  } else if (accessToken?.includes(Role[Role.Student])) {
    request.user = {
      _id: id,
      active: true,
      email: "user@vanlanguni.edu.com",
      name: "user",
      role: Role.Student,
      class: "PM2",
      code: "user",
      isAssistant: false,
    };
    next();
    return;
  } else if (accessToken?.includes(Role[Role.Teacher])) {
    request.user = {
      _id: id,
      active: true,
      email: "teacher@vanlanguni.edu.com",
      name: "teacher",
      role: Role.Teacher,
      class: "PM2",
      code: "teacher",
      isAssistant: false,
    };
    next();
    return;
  }
  // **** end testing ****

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
