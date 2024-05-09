import express from "express";
import { IRegistrationInfo } from "../../db/models/term";
import { createTypedRequest } from "../../helper/type.helper";

const router = express.Router();

type CreateRegistrationInfo = Omit<IRegistrationInfo, "approved">;

router.post("/:id", async (req, res) => {
  const { db, params, body } = createTypedRequest<CreateRegistrationInfo, {}>(
    req
  );

  await db.terms.findOneAndUpdate(
    {
      "classes._id": params.id,
    },
    {
      $set: {
        "classes.$.registrationInfo": {
          ...body,
          approved: false,
        },
      },
    }
  );

  res.json({});
});

export default router;
