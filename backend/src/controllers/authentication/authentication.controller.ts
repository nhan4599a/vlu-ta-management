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
    await db.users.create(user);
  }

  responseWithValue(res, user)
});

export default router;
