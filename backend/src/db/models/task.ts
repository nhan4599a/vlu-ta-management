import { Schema, mongo } from "mongoose";
import { Attachment } from "./common";

export type TaskAttachment = Attachment & {
  owner: string;
};

const TaskAttachmentSchema = new Schema<TaskAttachment>(
  {
    originalFileName: { type: String, required: true },
    savedFileName: { type: String, required: true },
    owner: { type: String, required: true },
  },
  {
    _id: false,
  }
);

export interface ITask {
  scheduleId: mongo.ObjectId;
  assigner: string;
  content: string;
  assignee: string;
  attachments: TaskAttachment[];
  isCompleted: boolean;
}

export const TaskSchema = new Schema<ITask>({
  scheduleId: { type: Schema.Types.ObjectId, required: true, index: true },
  assigner: { type: String, required: true },
  content: { type: String, required: true },
  assignee: { type: String, required: true, index: true },
  attachments: {
    type: [TaskAttachmentSchema],
    required: false,
  },
  isCompleted: { type: Boolean, required: true },
});
