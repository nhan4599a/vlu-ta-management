import { Schema } from "mongoose"

export interface ISetting {
    semester: number
    year: number
}

export const SettingSchema = new Schema<ISetting>({
    semester: { type: Number, required: true },
    year: { type: Number, required: true }
})