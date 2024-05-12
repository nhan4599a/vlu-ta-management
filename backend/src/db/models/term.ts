import { Schema } from "mongoose";
import { DayInWeek } from "../../constants/day.enum";

export interface IScheduleDetail {
    day: DayInWeek,
    startLesson: number,
    endLesson: number,
    type: string,
    registrationInfo: IRegistrationInfo | null
}

export interface IRegistrationInfo {
    candidatesCount: number,
    criteria: string,
    reason: string,
    approved: boolean | null
}

export interface ITermClass {
    lecture: string,
    name: string,
    startDate: Date,
    endDate: Date,
    attendanceRecordFile: string | null,
    maxStudentsCount: number,
    schedule: IScheduleDetail[]
}

export interface ITerm {
    name: string,
    code: string,
    credits: number,
    sessions: number,
    classes: ITermClass[]
}

const RegistrationInfoSchema = new Schema<IRegistrationInfo>({
    candidatesCount: { type: Number, required: true },
    criteria: { type: String, required: true },
    reason: { type: String, required: true },
    approved: { type: Boolean, required: false }
})

const TermClassSchema = new Schema<ITermClass>({
    lecture: { type: String, required: true },
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    attendanceRecordFile: { type: String, required: false },
    maxStudentsCount: { type: Number, required: true },
    schedule: [
        {
            day: { type: Number, enum: DayInWeek, required: true },
            startLesson: { type: Number, required: true },
            endLesson: { type: Number, required: true },
            type: { type: String, required: true },
            registrationInfo: { type: RegistrationInfoSchema, required: false },
        }
    ]
})

export const TermSchema = new Schema<ITerm>({
    name: { type: String, required: true },
    code: { type: String, required: true },
    credits: { type: Number, required: true },
    sessions: { type: Number, required: true },
    classes: [TermClassSchema]
})