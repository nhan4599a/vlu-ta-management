import { Schema, mongo } from "mongoose";
import { Attachment, AttachmentSchema } from "./common";

export interface IApplicationForm {
  _id: mongo.ObjectId;
  scheduleId: mongo.ObjectId;
  semester: number;
  year: number;
  name: string;
  code: string;
  email: string;
  class: string;
  phoneNumber: string;
  termScore: number;
  avgScore: number;
  description: string;
  attachments: Attachment[];
  stage1Approval: boolean | null;
  stage2Approval: boolean | null;
  isPending: boolean;
  priority: number;
}

export const ApplicationFormSchema = new Schema<IApplicationForm>({
  _id: { type: Schema.Types.ObjectId, required: true },
  scheduleId: { type: Schema.Types.ObjectId, required: true, index: true },
  semester: { type: Number, required: true },
  year: { type: Number, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  class: { type: String, required: true },
  code: { type: String, required: true },
  email: { type: String, required: true },
  termScore: { type: Number, required: true },
  avgScore: { type: Number, required: true },
  description: { type: String, required: false },
  attachments: {
    type: [AttachmentSchema],
    required: false,
  },
  stage1Approval: { type: Boolean, required: true },
  stage2Approval: { type: Boolean, required: true },
  isPending: { type: Boolean, required: true },
  priority: { type: Number, required: true },
});
