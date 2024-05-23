import { Schema } from "mongoose"

export interface ISetting {
    startDate: Date
    endDate: Date
    semester: number
    year: number
}

export const SettingSchema = new Schema<ISetting>({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    semester: { type: Number, required: true },
    year: { type: Number, required: true }
})