import { Schema, mongo } from "mongoose";

export interface IApplicationForm {
  scheduleId: mongo.ObjectId;
  userId: mongo.ObjectId;
  name: string;
  code: string;
  class: string;
  phoneNumber: string;
  termScore: number;
  avgScore: number;
  description: string;
  attachments: string[];
  stage1Approval: boolean;
  stage2Approval: boolean;
}

export const ApplicationFormSchema = new Schema<IApplicationForm>({
  scheduleId: { type: Schema.Types.ObjectId, required: true, index: true },
  userId: { type: Schema.Types.ObjectId, required: true, index: true },
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
});
