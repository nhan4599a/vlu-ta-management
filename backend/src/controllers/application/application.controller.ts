import express from "express";
import {
  importPassTrainingList,
  writeEligibleList,
} from "./application.service";
import { responseWithValue } from "../../helper/response.helper";
import { uploadFileMiddleware } from "../../helper/upload.helper";

const router = express.Router();

router.post("/export-eligible", async (req, res) => {
  await writeEligibleList(req, res);
});

router.post("/import-training", uploadFileMiddleware, async (req, res) => {
  await importPassTrainingList(req);

  responseWithValue(res, null);
});

export default router;
