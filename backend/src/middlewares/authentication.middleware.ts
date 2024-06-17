import { Request, Response, NextFunction } from "express";
import { JwtPayload, decode } from "jsonwebtoken";
import { ExtendedUser } from "../db/models/user";
import { IBaseRequest, UnauthenticatedError } from "../types/integration.types";
import DbInstance from "../db";
import { constants } from "../constants";
import { Role } from "../constants/role.enum";
import mongoose from "mongoose";
import axios from "axios";

type GetUserInfoCallback = (err: Error | null, user?: ExtendedUser) => void;

const getUserInfo = (
  db: DbInstance,
  payload: JwtPayload,
  callback: GetUserInfoCallback
) => {
  const email = payload[constants.AUTHENTICATION.EMAIL_CLAIM];
  
  Promise.all([db.users.findOne({ email: email }).lean().exec(), db.settings.findOne().lean().exec()])
    .then(([userData, setting]) => {
      const schoolUserInfo = payload["name"].split(" - ");

      const role = constants.AUTHENTICATION.ADMIN_ACCOUNTS.includes(email)
        ? Role.StudentAssociate
        : Role.Student;

      let user: Omit<ExtendedUser, "currentSetting"> | undefined = undefined;

      if (userData) {
        user = userData
      } else {
        user = {
          _id: new mongoose.Types.ObjectId(),
          code: schoolUserInfo[0],
          email: email,
          role: role,
          name: schoolUserInfo[1],
          class: schoolUserInfo[2],
          active: true,
          isAssistant: false,
        };

        if (role === Role.Student) {
          user.votingCount = 0;
          user.votingScores = [0, 0, 0, 0];
        }
      }

      callback(null, {
        ...user,
        currentSetting: setting,
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
  const request = req as IBaseRequest;

  // **** This is only for testing purpose ****
  const id = accessToken.includes("-")
    ? new mongoose.Types.ObjectId(accessToken.split("-")[1])
    : new mongoose.Types.ObjectId();

  request.db.settings.findOne().then((setting) => {
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
        currentSetting: setting
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
        currentSetting: setting,
        votingCount: 0,
        votingScores: [0, 0, 0, 0]
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
        currentSetting: setting
      };
      next();
      return;
    }
  });
  // **** end testing ****
  
//   verifyAccessToken(accessToken!)
//     .then(() => {
//       const request = req as IBaseRequest;
//       const decodedToken = decode(accessToken!, {
//         complete: true,
//       });

//       getUserInfo(
//         request.db,
//         decodedToken!.payload as JwtPayload,
//         (err, user) => {
//           if (err) {
//             res.status(500).json({
//               success: false,
//               message: "Internal server error",
//             });
//           } else {
//             request.user = user!;
//             next();
//           }
//         }
//       );
//     })
//     .catch(() => {
//       res.status(401).json({
//         success: false,
//         message: "Invalid token",
//       });
//     });
};
