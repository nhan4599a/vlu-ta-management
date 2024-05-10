import express from "express";
import { IBaseRequest } from "../../types/integration.types";

const router = express.Router();

router.post("/post-login", async (req, res) => {
  const { db, user } = req as IBaseRequest;

  const isUserExisted = await db.users.exists({
    email: user.email,
  });

  if (!isUserExisted) {
    await db.users.create(user);
  }

  res.json(user);
});

export default router;
