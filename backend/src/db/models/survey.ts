import { Schema } from "mongoose"

export interface ISurveyInfo {
    semester: number,
    year: number,
    lecture: string,
    assistant: string,
    isSubmited: boolean
}

export const SurveyInfoSchema = new Schema<ISurveyInfo>({
    semester: { type: Number, required: true },
    year: { type: Number, required: true },
    lecture: { type: String, required: true, index: true },
    assistant: { type: String, required: true, index: true },
    isSubmited: { type: Boolean, required: true }
})