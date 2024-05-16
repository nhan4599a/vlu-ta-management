import express from "express";
import { IRegistrationInfo } from "../../db/models/term";
import { createTypedRequest } from "../../helper/type.helper";
import {
  getApplicationsList,
  getApplicationsOfSchedule,
  getRecruimentInfo,
} from "./recruit.service";
import { responseWithValue } from "../../helper/response.helper";
import { uploadMultipleFilesMiddleware } from "../../helper/upload.helper";

const router = express.Router();

type CreateRegistrationInfo = Omit<IRegistrationInfo, "approved">;

type ApprovalInfo = {
  approved: boolean;
};

type ApplyRecruimentRequest = {
  phoneNumber: string;
  description: string;
  termScore: number;
  avgScore: number;
};

router.get("/applications", async (req, res) => {
  const applications = getApplicationsList(req);

  responseWithValue(res, applications);
});

router.get("/classes/:classId/applications", async (req, res) => {
  const applications = getApplicationsOfSchedule(req);

  responseWithValue(res, applications);
});

router.get("/classes/:classId", async (req, res) => {
  const recruimentInfo = getRecruimentInfo(req);

  responseWithValue(res, recruimentInfo);
});

router.post("/classes/:classId", async (req, res) => {
  const { db, params, body } = createTypedRequest<CreateRegistrationInfo, {}>(
    req
  );

  await db.terms.findOneAndUpdate(
    {
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

  responseWithValue(res, undefined);
});

router.patch("/classes/:classId", async (req, res) => {
  const { db, body, params } = createTypedRequest<ApprovalInfo, {}>(req);

  await db.terms.findOneAndUpdate(
    {
      "classes._id": params.classId,
    },
    {
      $set: {
        "classes.$.registrationInfo.approved": body.approved,
      },
    }
  );

  responseWithValue(res, undefined);
});

router.post(
  "/classes/:classId/apply",
  uploadMultipleFilesMiddleware,
  async (req, res) => {
    const { db, body, params, user, files } = createTypedRequest<
      ApplyRecruimentRequest,
      {}
    >(req);

    const { code, class: userClass, name } = user;

    const uploadedFiles =
      (files as Express.Multer.File[])?.map((file) => file.path) ?? [];

    await db.appliactions.create({
      scheduleId: params.classId,
      code,
      name,
      class: userClass,
      ...body,
      attachments: uploadedFiles,
      stage1Approval: false,
      stage2Approval: false,
    });

    responseWithValue(res, undefined);
  }
);

router.patch("/applications/:id/approve", async (req, res) => {
  const { db, body, params } = createTypedRequest<ApprovalInfo, {}>(req);

  await db.appliactions.findByIdAndUpdate(params.classId, {
    $set: {
      stage1Approval: body.approved,
    },
  });

  responseWithValue(res, undefined)
});

export default router;
