import express from "express";
import { uploadFileMiddleware } from "../../helper/upload.helper";
import {
  getAssitantsInfo,
  getTermClassInfo,
  getTermData,
  readTermData,
} from "./term.service";
import { responseWithValue } from "../../helper/response.helper";
import { createTypedRequest } from "../../helper/type.helper";
import { ITask } from "../../db/models/task";
import mongoose, { AnyBulkWriteOperation } from "mongoose";

const router = express.Router();

enum TaskAction {
  Add,
  Update,
  Delete,
}

type TaskItem = ITask & {
  state: TaskAction | null;
  _id: string | null;
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

router.get("/classes/:classId/users/:userId/tasks", async (req, res) => {
  const { db, params } = createTypedRequest(req);

  const tasks = await db.tasks.where({
    _id: params.id,
    scheduleId: params.classId,
    assignee: params.userId,
  });

  responseWithValue(res, tasks);
});

router.post("/classes/:classId/users/:userId/tasks", async (req, res) => {
  const { db, params, body, user } = createTypedRequest<CreateTaskRequest, {}>(
    req
  );

  const actions: AnyBulkWriteOperation<ITask>[] = [];

  for (const taskItem of body.tasks.filter((item) => item.state !== null)) {
    const { state, _id, ...actualTask } = taskItem;

    switch (state) {
      case TaskAction.Add:
        actions.push({
          insertOne: {
            document: {
              ...actualTask,
              scheduleId: params.classId,
              assigner: user._id.toString(),
              assignee: params.userId,
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
                isCompleted: actualTask.isCompleted,
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
    scheduleId: params.classId,
    assignee: params.userId,
  });

  responseWithValue(res, tasks);
});

export default router;
