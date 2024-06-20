import express from "express";
import { getUsersList } from "./users.service";
import { responseWithValue } from "../../helper/response.helper";
import { createTypedRequest } from "../../helper/type.helper";
import mongoose from "mongoose";

const router = express.Router();

type UpdateUserStatusRequest = {
  active: boolean;
};

type UpdateUserInfoRequest = {
  phoneNumber: string;
};

router.get("/", async (req, res) => {
  const users = await getUsersList(req);

  responseWithValue(res, users);
});

router.post("/:userId/active", async (req, res) => {
  const { db, body, params } = createTypedRequest<UpdateUserStatusRequest>(req);

  await db.users.findByIdAndUpdate(new mongoose.Types.ObjectId(params.userId), {
    $set: {
      active: body.active,
    },
  });

  responseWithValue(res, undefined);
});

router.patch("/:userId", async (req, res) => {
  const { db, body, params } = createTypedRequest<UpdateUserInfoRequest>(req);

  await db.users.findByIdAndUpdate(new mongoose.Types.ObjectId(params.userId), {
    $set: {
      phoneNumber: body.phoneNumber,
    },
  });

  responseWithValue(res, undefined);
});

router.get("/:userId", async (req, res) => {
  const { db, params } = createTypedRequest(req);

  const user = await db.users.findById(
    new mongoose.Types.ObjectId(params.userId)
  );

  responseWithValue(res, user);
});

router.get("/info", async (req, res) => {
  const { db, user } = createTypedRequest(req);

  const data = await Promise.all([
    db.users.findOne({ code: user.code }).lean().exec(),
    db.settings.findOne().lean().exec(),
  ]);

  responseWithValue(res, {
    user: data[0],
    setting: data[1],
  });
});

export default router;
