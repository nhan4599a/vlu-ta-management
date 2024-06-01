import express from "express";
import {
  approveFinal,
  getImportPassTrainingResult,
  importPassTrainingList,
  writeEligibleList,
} from "./application.service";
import { responseWithValue } from "../../helper/response.helper";
import { uploadFileMiddleware } from "../../helper/upload.helper";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await getImportPassTrainingResult(req);

  responseWithValue(res, data);
});

router.post("/export-eligible", async (req, res) => {
  await writeEligibleList(req, res);
});

router.post("/import-training", uploadFileMiddleware, async (req, res) => {
  await importPassTrainingList(req);

  responseWithValue(res, null);
});

router.post("/approve/:id", async (req, res) => {
  await approveFinal(req);

  responseWithValue(res, null);
});

export default router;
