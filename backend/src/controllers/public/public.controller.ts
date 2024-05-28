import express from "express";
import { createTypedRequest } from "../../helper/type.helper";

const router = express.Router();

router.get("/:fileName", (req, res) => {
  const { params } = createTypedRequest(req);

  res.sendFile(params.fileName, {
    root: "public",
  });
});

export default router;
