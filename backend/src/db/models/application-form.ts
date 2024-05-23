import { Schema, mongo } from "mongoose";

export interface IApplicationForm {
  _id: mongo.ObjectId;
  scheduleId: mongo.ObjectId;
  semester: number;
  year: number;
  name: string;
  code: string;
  class: string;
  phoneNumber: string;
  termScore: number;
  avgScore: number;
  description: string;
  attachments: string[];
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
  termScore: { type: Number, required: true },
  avgScore: { type: Number, required: true },
  description: { type: String, required: false },
  attachments: {
    type: [
      {
        savedFileName: String,
        originalFileName: String,
      },
    ],
    required: false,
  },
  stage1Approval: { type: Boolean, required: true },
  stage2Approval: { type: Boolean, required: true },
  isPending: { type: Boolean, required: true },
  priority: { type: Number, required: true },
});
