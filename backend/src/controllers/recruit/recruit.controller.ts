import express from "express";
import { IRegistrationInfo } from "../../db/models/term";
import { createTypedRequest } from "../../helper/type.helper";

const router = express.Router();

type CreateRegistrationInfo = Omit<IRegistrationInfo, 'approved'>

router.post("/:id", async (req, res) => {
  const request = createTypedRequest<CreateRegistrationInfo>(req);

  await request.db.terms.findOneAndUpdate(
    {
      "classes._id": request.params.id,
    },
    {
      $set: {
        "classes.$.registrationInfo": {
            ...request.body,
            approved: false
        },
      },
    }
  );

  res.json({})
});

export default router;
