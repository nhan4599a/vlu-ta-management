import express from "express";
import { createTypedRequest } from "../../helper/type.helper";
import { Role } from "../../constants/role.enum";
import { ForbiddenError } from "../../types/integration.types";

const router = express.Router();

router.get("/:fileName", (req, res) => {
  const { user, params } = createTypedRequest(req);

  if (user.role !== Role.StudentAssociate) {
    throw new ForbiddenError();
  }

  res.sendFile(params.fileName, {
    root: "public",
  });
});

export default router;
