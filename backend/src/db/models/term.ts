import { Schema } from "mongoose";
import { DayInWeek } from "../../constants/day.enum";

export interface IScheduleDetail {
    day: DayInWeek,
    startLesson: number,
    endLesson: number
}

export interface IRegistrationInfo {
    candidatesCount: number,
    criteria: string,
    reason: string,
    approved: boolean
}

export interface ITermClass {
    lecture: string,
    name: string,
    startDate: Date,
    endDate: Date,
    attendanceRecordFile: string | null,
    maxStudentsCount: number,
    registrationInfo: IRegistrationInfo | null,
    schedule: IScheduleDetail[]
}

export interface ITerm {
    name: string,
    code: string,
    type: string,
    credits: number,
    sessions: number,
    classes: ITermClass[]
}

const RegistrationInfoSchema = new Schema<IRegistrationInfo>({
    candidatesCount: { type: Number, required: true },
    criteria: { type: String, required: true },
    reason: { type: String, required: true },
    approved: { type: Boolean, required: true }
})

const TermClassSchema = new Schema<ITermClass>({
    lecture: { type: String, required: true },
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    attendanceRecordFile: { type: String, required: false },
    maxStudentsCount: { type: Number, required: true },
    registrationInfo: { type: RegistrationInfoSchema, required: false },
    schedule: [
        {
            day: { type: Number, enum: DayInWeek, required: true },
            startLesson: { type: Number, required: true },
            endLesson: { type: Number, required: true }
        }
    ]
})

export const TermSchema = new Schema<ITerm>({
    name: { type: String, required: true },
    code: { type: String, required: true },
    type: { type: String, required: true },
    credits: { type: Number, required: true },
    sessions: { type: Number, required: true },
    classes: [TermClassSchema]
})