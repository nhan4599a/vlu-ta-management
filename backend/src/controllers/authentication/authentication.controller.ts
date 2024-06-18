import express from "express";
import { IBaseRequest } from "../../types/integration.types";
import { responseWithValue } from "../../helper/response.helper";

const router = express.Router();

router.post("/post-login", async (req, res) => {
  const { db, user } = req as IBaseRequest;

  const isUserExisted = await db.users.exists({
    email: user.email,
  });

  if (!isUserExisted) {
    const { currentSetting, ...actualUserInfo } = user
    await db.users.create(actualUserInfo);
  }

  responseWithValue(res, user)
});

export default router;
