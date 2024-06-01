import { Schema } from "mongoose";

export type Attachment = {
  savedFileName: String;
  originalFileName: String;
};

export const AttachmentSchema = new Schema<Attachment>(
  {
    savedFileName: { type: String, isRequired: true },
    originalFileName: { type: String, isRequired: true },
  },
  {
    _id: false,
  }
);
