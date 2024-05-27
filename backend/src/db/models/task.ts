import { Schema, mongo } from "mongoose";
import { Attachment, AttachmentSchema } from "./common";

export interface ITask {
  scheduleId: mongo.ObjectId;
  assigner: string;
  content: string;
  assignee: string;
  attachments: Attachment[];
  isCompleted: boolean;
}

export const TaskSchema = new Schema<ITask>({
  scheduleId: { type: Schema.Types.ObjectId, required: true, index: true },
  assigner: { type: String, required: true },
  content: { type: String, required: true },
  assignee: { type: String, required: true, index: true },
  attachments: {
    type: [AttachmentSchema],
    required: false,
  },
  isCompleted: { type: Boolean, required: true },
});
