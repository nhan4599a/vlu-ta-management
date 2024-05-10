import express from "express";
import { IRegistrationInfo } from "../../db/models/term";
import { createTypedRequest } from "../../helper/type.helper";

const router = express.Router();

type CreateRegistrationInfo = Omit<IRegistrationInfo, "approved">;

type ApproveRegistrationInfo = {
    approved: boolean
}

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
      },
    }
  );

  res.json({});
});

router.patch("/:id/classes/:classId", async (req, res) => {
  const { db, body, params } = createTypedRequest<ApproveRegistrationInfo, {}>(req);

  await db.terms.findOneAndUpdate(
    {
      _id: params.id,
      "classes._id": params.classId,
    },
    {
      $set: {
        "classes.$.registrationInfo.approve": body.approved,
      },
    }
  );

  res.json({})
});

export default router;
