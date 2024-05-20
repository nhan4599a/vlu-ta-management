import express from "express";
import { getUsersList } from "./users.service";
import { responseWithValue } from "../../helper/response.helper";
import { createTypedRequest } from "../../helper/type.helper";
import mongoose from "mongoose";

const router = express.Router();

type UpdateUserStatusRequest = {
  active: boolean;
};

router.get("/", async (req, res) => {
  const users = await getUsersList(req);

  responseWithValue(res, users);
});

router.patch("/:userId", async (req, res) => {
  const { db, body, params } = createTypedRequest<UpdateUserStatusRequest, {}>(
    req
  );

  await db.users.findByIdAndUpdate(new mongoose.Types.ObjectId(params.userId), {
    $set: {
      active: body.active,
    },
  });

  responseWithValue(res, undefined);
});

export default router;
