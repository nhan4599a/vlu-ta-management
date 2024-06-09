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

type VoteUserScoreRequest = {
  votingScores: number[];
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

router.patch("/:userId/vote", async (req, res) => {
  const { db, body, params } = createTypedRequest<VoteUserScoreRequest>(req);

  const user = await db.users.findOne(
    {
      _id: new mongoose.Types.ObjectId(params.userId),
    },
    {
      votingCount: 1,
      votingScores: 1,
      _id: 0,
    }
  );

  const votingUpdateRequest = user!.votingScores.map((score, index) => {
    return {
      [`votingScores.$[${index}]`]:
        (score + body.votingScores[index]) / (user!.votingCount + 1),
    };
  });

  votingUpdateRequest.push({
    votingCount: user!.votingCount + 1,
  });

  await db.users.updateOne(
    {
      _id: new mongoose.Types.ObjectId(params.userId),
    },
    {
      $set: Object.assign({}, ...votingUpdateRequest),
    }
  );

  responseWithValue(res, null)
});

export default router;
