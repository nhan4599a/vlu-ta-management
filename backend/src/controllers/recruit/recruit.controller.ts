import express from "express";
import { IRegistrationInfo } from "../../db/models/term";
import { createTypedRequest } from "../../helper/type.helper";
import {
  getApplicationsList,
  getApplicationsOfSchedule,
  getRecruimentInfo,
} from "./recruit.service";
import { responseWithValue } from "../../helper/response.helper";
import {
  mapAttachment,
  uploadMultipleFilesMiddleware,
} from "../../helper/upload.helper";
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
  const { db, params } = createTypedRequest(req);

  const application = await db.applications.findById(params.id);

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
          approved: true,
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

    const { code, class: userClass, name } = user;

    const uploadedFiles =
      (files as Express.Multer.File[])?.map(mapAttachment) ?? [];

    await db.startTransaction();

    const currentSetting = await db.settings.findOne();

    const registerCount = await db.applications
      .countDocuments({
        year: currentSetting!.year,
        semester: currentSetting!.semester,
        code: code,
      })
      .exec();

    await db.users.updateOne(
      {
        code: code,
      },
      {
        $set: {
          phoneNumber: body.phoneNumber,
        },
      }
    );
    await db.applications.updateOne(
      {
        scheduleId: params.classId,
        code: code,
      },
      {
        $set: {
          scheduleId: params.classId,
          code,
          name,
          class: userClass,
          ...body,
          attachments: uploadedFiles,
          stage1Approval: null,
          stage2Approval: null,
          isPending: false,
          priority: registerCount,
          year: currentSetting!.year,
          semester: currentSetting!.semester
        },
      },
      {
        upsert: true,
      }
    );

    await db.commitTransaction();
    responseWithValue(res, undefined);
  }
);

router.patch("/applications/:id/approve", async (req, res) => {
  const { db, body, params } = createTypedRequest<ApprovalInfo, {}>(req);

  await db.applications.findByIdAndUpdate(
    new mongoose.Types.ObjectId(params.id),
    {
      $set: {
        stage1Approval: body.approved,
      },
    }
  );

  responseWithValue(res, undefined);
});

export default router;
