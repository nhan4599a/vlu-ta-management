import express from "express";
import { IRegistrationInfo } from "../../db/models/term";
import { createTypedRequest } from "../../helper/type.helper";
import { getRecruimentInfo } from "./recruit.service";

const router = express.Router();

type CreateRegistrationInfo = Omit<IRegistrationInfo, "approved">;

type ApproveRegistrationInfo = {
  approved: boolean;
};

router.get("/:id/classes/:classId", async (req, res) => {
  const recruimentInfo = getRecruimentInfo(req);

  res.json(recruimentInfo);
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
        },
        "$classes.$.isRegistered": true,
      },
    }
  );

  res.json({});
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

  res.json({});
});

export default router;
