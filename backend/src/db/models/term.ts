import { Schema } from "mongoose";
import { DayInWeek } from "../../constants/day.enum";

export interface ITermClass {
    PIC: string,
    startDate: Date,
    endDate: Date,
    attendanceRecordFile: string | null,
    schedule: [
        {
            day: DayInWeek,
            lesson: number,
            length: number
        }
    ]
}

export interface ITerm {
    name: string,
    code: string,
    type: string,
    credits: number,
    classes: [ITermClass]
}

const TermClassSchema = new Schema<ITermClass>({
    PIC: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    attendanceRecordFile: { type: String, required: false },
    schedule: [
        {
            day: { type: DayInWeek, required: true },
            lesson: { type: Number, required: true },
            length: { type: Number, required: true }
        }
    ]
})

export const TermSchema = new Schema<ITerm>({
    name: { type: String, required: true },
    code: { type: String, required: true },
    type: { type: String, required: true },
    credits: { type: Number, required: true },
    classes: [TermClassSchema]
})