import { Schema, model } from "mongoose";

const applicationFormSchema = new Schema({
    name: String,
    phoneNumber: String,
    class: String,
    code: String,
    termId: String,
    evidence: String,
    attachments: [String]
})

const ApplicationForm = model('ApplicationForm', applicationFormSchema)