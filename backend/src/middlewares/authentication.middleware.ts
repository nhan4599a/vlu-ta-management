import { Request, Response, NextFunction } from "express";
import { JwksClient } from "jwks-rsa";
import { JwtPayload, Secret, verify } from "jsonwebtoken";
import { IUser } from "../db/models/user";
import { IBaseRequest } from "../types/integration.types";
import DbInstance from "../db";
import { constants } from "../constants";
import { Role } from "../constants/role.enum";

type JwtHeader = {
  kid?: string | undefined;
};

type GetSigningKeyCallback = (err: Error | null, key?: Secret) => void;

type GetUserInfoCallback = (err: Error | null, user?: IUser) => void;

const getSigningKey = ({ kid }: JwtHeader, callback: GetSigningKeyCallback) => {
  const client = new JwksClient({
    jwksUri: constants.AUTHENTICATION.JWKS_URI,
  });

  return client.getSigningKey(kid, (err, key) => {
    callback(err, key?.getPublicKey());
  });
};

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

      const user = users[0] ?? {
        code: schoolUserInfo[0],
        email: email,
        roles: [
          constants.AUTHENTICATION.ADMIN_ACCOUNTS.includes(email)
            ? Role.Admin
            : Role.Student,
        ],
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

  verify(accessToken!, getSigningKey, (err, payload) => {
    if (err) {
      res.status(401).json({
        success: false,
        message: err.message,
      });
    } else {
      const request = req as IBaseRequest;
      getUserInfo(request.db, payload as JwtPayload, (err, user) => {
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
  });
};
