import { Schema, mongo } from "mongoose"

export interface ITask {
    scheduleId: mongo.ObjectId,
    assigner: string,
    content: string,
    assignee: string,
    isCompleted: boolean
}

export const TaskSchema = new Schema<ITask>({
    scheduleId: { type: Schema.Types.ObjectId, required: true, index: true },
    assigner: { type: String, required: true },
    content: { type: String, required: true },
    assignee: { type: String, required: true, index: true },
    isCompleted: { type: Boolean, required: true }
})