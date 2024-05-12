import { Schema, model } from "mongoose";

export interface IApplicationForm {
    name: string,
    code: string,
    class: string,
    phoneNumber: string,
    scheduleId: string,
    evidence: string,
    attachments: string[]
}

const applicationFormSchema = new Schema<IApplicationForm>({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    class: { type: String, required: true },
    code: { type: String, required: true },
    scheduleId: { type: String, required: true },
    evidence: { type: String, required: true },
    attachments: { type: [String], required: false }
})

const ApplicationForm = model('ApplicationForm', applicationFormSchema)