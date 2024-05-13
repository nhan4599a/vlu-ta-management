import mongoose, { Schema } from "mongoose"

export interface ITask {
    termId: string,
    scheduleId: string,
    assigner: string,
    content: string,
    assignee: string,
    isCompleted: boolean
}

export const TaskSchema = new Schema<ITask>({
    termId: { type: String, required: true },
    scheduleId: { type: String, required: true },
    assigner: { type: String, required: true },
    content: { type: String, required: true },
    assignee: { type: String, required: true },
    isCompleted: { type: Boolean, required: true }
})