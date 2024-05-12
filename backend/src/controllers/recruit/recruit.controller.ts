import express from "express";
import { IRegistrationInfo } from "../../db/models/term";
import { createTypedRequest } from "../../helper/type.helper";
import { getRecruimentInfo } from "./recruit.service";
import { responseWithValue } from "../../helper/response.helper";

const router = express.Router();

type CreateRegistrationInfo = Omit<IRegistrationInfo, "approved">;

type ApproveRegistrationInfo = {
  approved: boolean;
};

router.get("/:id/classes/:classId", async (req, res) => {
  const recruimentInfo = getRecruimentInfo(req);

  responseWithValue(res, recruimentInfo)
});

router.post("/:id/classes/:classId", async (req, res) => {
  const { db, params, body } = createTypedRequest<CreateRegistrationInfo, {}>(
    req
  );

  await db.terms.findOneAndUpdate(
    {
      _id: params.id,
      "classes._id": params.classId,
    },
    {
      $set: {
        "classes.$.registrationInfo": {
          ...body,
          approved: null,
        }
      },
    }
  );

  responseWithValue(res, undefined)
});

router.patch("/:id/classes/:classId", async (req, res) => {
  const { db, body, params } = createTypedRequest<ApproveRegistrationInfo, {}>(
    req
  );

  await db.terms.findOneAndUpdate(
    {
      _id: params.id,
      "classes._id": params.classId,
    },
    {
      $set: {
        "classes.$.registrationInfo.approved": body.approved,
      },
    }
  );

  responseWithValue(res, undefined)
});

export default router;
