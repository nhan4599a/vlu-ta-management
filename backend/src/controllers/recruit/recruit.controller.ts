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
import mongoose from "mongoose";

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
  const applications = await getApplicationsList(req);

  responseWithValue(res, applications);
});

router.get("/applications/:id", async (req, res) => {
  const { db, params } = createTypedRequest<{}, {}>(req);

  const application = await db.appliactions.findById(params.id);

  responseWithValue(res, application);
});

router.get("/classes/:classId/applications", async (req, res) => {
  const applications = await getApplicationsOfSchedule(req);

  responseWithValue(res, applications);
});

router.get("/classes/:classId", async (req, res) => {
  const recruimentInfo = await getRecruimentInfo(req);

  responseWithValue(res, recruimentInfo);
});

router.post("/classes/:classId", async (req, res) => {
  const { db, params, body } = createTypedRequest<CreateRegistrationInfo, {}>(
    req
  );

  await db.terms.updateOne(
    {},
    {
      $set: {
        "classes.$[].schedule.$[i].registrationInfo": {
          ...body,
          approved: null,
        },
      },
    },
    {
      arrayFilters: [
        {
          "i._id": new mongoose.Types.ObjectId(params.classId),
        },
      ],
    }
  );

  responseWithValue(res, undefined);
});

router.patch("/classes/:classId", async (req, res) => {
  const { db, body, params } = createTypedRequest<ApprovalInfo, {}>(req);

  await db.terms.updateOne(
    {},
    {
      $set: {
        "classes.$[].schedule.$[i].registrationInfo.approved": body.approved,
      },
    },
    {
      arrayFilters: [
        {
          "i._id": new mongoose.Types.ObjectId(params.classId),
        },
      ],
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

    const { _id, code, class: userClass, name } = user;

    const uploadedFiles =
      (files as Express.Multer.File[])?.map((file) => file.path) ?? [];

    await db.appliactions.updateOne(
      {
        scheduleId: params.classId,
        userId: _id.toString(),
      },
      {
        $set: {
          scheduleId: params.classId,
          userId: _id.toString(),
          code,
          name,
          class: userClass,
          ...body,
          attachments: uploadedFiles,
          stage1Approval: false,
          stage2Approval: false,
        },
      },
      {
        upsert: true,
      }
    );

    responseWithValue(res, undefined);
  }
);

router.patch("/applications/:id/approve", async (req, res) => {
  const { db, body, params } = createTypedRequest<ApprovalInfo, {}>(req);

  await db.appliactions.findByIdAndUpdate(params.id, {
    $set: {
      stage1Approval: body.approved,
    },
  });

  responseWithValue(res, undefined);
});

export default router;
