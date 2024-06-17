import express from "express";
import { createTypedRequest } from "../../helper/type.helper";
import { PaginationRequest } from "../../types/integration.types";
import { paginate } from "../../helper/pagination.helper";
import { responseWithValue } from "../../helper/response.helper";

const router = express.Router();

type GetSurveyInfoRequest = PaginationRequest & {
  lecture: string;
};

type SubmitAssistantSurveyRequest = {
  surveyData: number[];
  code: string;
};

router.get("/", async (req, res) => {
  const { db, query, user } = createTypedRequest<{}, GetSurveyInfoRequest>(req);

  const data = await paginate(db.surveyInfo, query, [
    {
      $match: {
        lecture: query.lecture,
        semester: user.currentSetting!.semester,
        year: user.currentSetting!.year
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "assistant",
        foreignField: "code",
        as: "info",
      },
    },
    {
      $unwind: {
        path: "$info",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ["$$ROOT", "$info"],
        },
      },
    },
    {
      $project: {
        name: 1,
        code: 1,
        email: 1,
        phoneNumber: 1,
        lecture: 1,
        isSubmited: 1,
        _id: 0,
      },
    },
  ]);

  responseWithValue(res, data);
});

router.post("/", async (req, res) => {
  const {
    db,
    body,
    user: loggedInUser,
  } = createTypedRequest<SubmitAssistantSurveyRequest>(req);

  await db.startTransaction();

  const user = await db.users.findOne(
    {
      code: body.code,
    },
    {
      votingCount: 1,
      votingScores: 1,
      _id: 0,
    }
  );

  const votingUpdateRequest = user!.votingScores!.map((score, index) => {    
    return {
      [`votingScores.${index}`]:
        (score + body.surveyData[index]) / (user!.votingCount! + 1),
    };
  });

  votingUpdateRequest.push({
    votingCount: user!.votingCount! + 1,
  });

  await Promise.all([
    db.users.updateOne(
      {
        code: body.code,
      },
      {
        $set: Object.assign({}, ...votingUpdateRequest),
      }
    ),
    db.surveyInfo.updateOne(
      {
        lecture: loggedInUser.code!,
        assistant: body.code,
      },
      {
        $set: {
          isSubmited: true,
        },
      }
    ),
  ]);

  await db.commitTransaction();

  responseWithValue(res, null);
});

export default router;
