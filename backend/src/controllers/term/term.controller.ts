import express from "express";
import {
  mapAttachment,
  uploadFileMiddleware,
  uploadMultipleFilesMiddleware,
} from "../../helper/upload.helper";
import {
  getAssitantsInfo,
  getTermClassInfo,
  getTermData,
  readTermData,
  updateAttendantUrl,
} from "./term.service";
import { responseWithValue } from "../../helper/response.helper";
import { createTypedRequest } from "../../helper/type.helper";
import { ITask, TaskAttachment } from "../../db/models/task";
import mongoose, { AnyBulkWriteOperation } from "mongoose";
import { Attachment } from "../../db/models/common";

const router = express.Router();

enum TaskAction {
  Add,
  Update,
  Delete,
}

type TaskItem = ITask & {
  state: TaskAction | null;
  _id: string | null;
  attachments: (TaskAttachment | number)[];
};

type CreateTaskRequest = {
  tasks: TaskItem[];
};

router.get("/", async (req, res) => {
  const terms = await getTermData(req);

  responseWithValue(res, terms);
});

router.get("/classes/:classId", async (req, res) => {
  const termClassInfo = await getTermClassInfo(req);

  responseWithValue(res, termClassInfo);
});

router.post("/", uploadFileMiddleware, async (req, res) => {
  const { db, file } = createTypedRequest(req);

  const terms = await readTermData(file!);

  await db.startTransaction();

  await db.settings.findOneAndUpdate(
    {},
    {
      semester: terms[0].semester,
      year: terms[0].year,
    },
    {
      upsert: true,
    }
  );
  await db.terms.insertMany(terms);

  await db.commitTransaction();

  responseWithValue(res, {
    semester: terms[0].semester,
    year: terms[0].year,
  });
});

router.get("/classes/:classId/assistants", async (req, res) => {
  const assistants = await getAssitantsInfo(req);

  responseWithValue(res, assistants);
});

router.get("/classes/:classId/users/:userCode/tasks", async (req, res) => {
  const { db, params } = createTypedRequest(req);

  const tasks = await db.tasks.where({
    scheduleId: new mongoose.Types.ObjectId(params.classId),
    assignee: params.userCode,
  });

  responseWithValue(res, tasks);
});

router.post(
  "/classes/:classId/users/:userCode/tasks",
  uploadMultipleFilesMiddleware,
  async (req, res) => {
    const { db, params, body, user, files } = createTypedRequest<
      CreateTaskRequest,
      {}
    >(req);

    const actions: AnyBulkWriteOperation<ITask>[] = [];

    const classId = new mongoose.Types.ObjectId(params.classId);

    for (const taskItem of body.tasks.filter((item) => item.state !== null)) {
      const { state, _id, attachments, ...actualTask } = taskItem;

      const uploadedFiles: TaskAttachment[] = [];

      const multerFiles = files as Express.Multer.File[];

      if (attachments) {
        for (const attachment of attachments) {
          if (typeof attachment !== "object") {
            uploadedFiles.push({
              ...mapAttachment(multerFiles[Number(attachment)]),
              owner: user.code!,
            });
          } else {
            uploadedFiles.push(attachment);
          }
        }
      }

      switch (Number(state)) {
        case TaskAction.Add:
          actions.push({
            insertOne: {
              document: {
                ...actualTask,
                scheduleId: classId,
                assigner: user.code!,
                assignee: params.userCode,
                attachments: uploadedFiles,
              },
            },
          });
          break;

        case TaskAction.Update:
          actions.push({
            updateOne: {
              filter: {
                _id: new mongoose.Types.ObjectId(_id!),
              },
              update: {
                $set: {
                  content: actualTask.content,
                  isCompleted: actualTask.isCompleted.toString() === "true",
                  attachments: uploadedFiles,
                },
              },
            },
          });
          break;

        case TaskAction.Delete:
          actions.push({
            deleteOne: {
              filter: {
                _id: new mongoose.Types.ObjectId(_id!),
              },
            },
          });
          break;
      }
    }

    await db.tasks.bulkWrite(actions);

    const tasks = await db.tasks.where({
      scheduleId: classId,
      assignee: params.userCode,
    });

    responseWithValue(res, tasks);
  }
);

router.patch("/classes/:classId/attendant", async (req, res) => {
  await updateAttendantUrl(req);

  responseWithValue(res, null);
});

export default router;
