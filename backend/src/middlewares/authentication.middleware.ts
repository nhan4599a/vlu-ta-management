import { Request, Response, NextFunction } from "express";
import { JwtPayload, decode } from "jsonwebtoken";
import { IUser } from "../db/models/user";
import { IBaseRequest, UnauthenticatedError } from "../types/integration.types";
import DbInstance from "../db";
import { constants } from "../constants";
import { Role } from "../constants/role.enum";
import mongoose from "mongoose";
import axios from "axios";
import { ISetting } from "../db/models/setting";

type GetUserInfoCallback = (
  err: Error | null,
  user?: IUser & {
    _id: mongoose.Types.ObjectId;
    currentSetting: ISetting | null;
  }
) => void;

const getUserInfo = (
  db: DbInstance,
  payload: JwtPayload,
  callback: GetUserInfoCallback
) => {
  const email = payload[constants.AUTHENTICATION.EMAIL_CLAIM];
  Promise.all([db.users.where({ email: email }).exec(), db.settings.findOne()])
    .then(([users, setting]) => {
      const schoolUserInfo = payload["name"].split(" - ");

      const role = constants.AUTHENTICATION.ADMIN_ACCOUNTS.includes(email)
        ? Role.StudentAssociate
        : Role.Student;

      const user = {
        ...users[0],
      } ?? {
        code: schoolUserInfo[0],
        email: email,
        role: role,
        name: schoolUserInfo[1],
        class: schoolUserInfo[2],
        active: true,
        isAssistant: false,
        votingCount: 0,
        votingScores: [0, 0, 0, 0, 0]
      };

      callback(null, {
        ...user,
        currentSetting: setting
      });
    })
    .catch((err) => callback(err, undefined));
};

const verifyAccessToken = (accessToken: string) => {
  return axios.get("https://graph.microsoft.com/v1.0/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  const accessToken = authHeader?.split(" ")[1];

  if (!authHeader || !accessToken) {
    throw new UnauthenticatedError("Invalid access token");
  }
  
  verifyAccessToken(accessToken!)
    .then(() => {
      const request = req as IBaseRequest;
      const decodedToken = decode(accessToken!, {
        complete: true,
      });

      getUserInfo(
        request.db,
        decodedToken!.payload as JwtPayload,
        (err, user) => {
          if (err) {
            res.status(500).json({
              success: false,
              message: "Internal server error",
            });
          } else {
            request.user = user!;
            next();
          }
        }
      );
    })
    .catch(() => {
      res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    });
};
