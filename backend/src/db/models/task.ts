import { Schema, mongo } from "mongoose"

export interface ITask {
    scheduleId: mongo.ObjectId,
    assigner: mongo.ObjectId,
    content: string,
    assignee: mongo.ObjectId,
    isCompleted: boolean
}

export const TaskSchema = new Schema<ITask>({
    scheduleId: { type: Schema.Types.ObjectId, required: true },
    assigner: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    assignee: { type: Schema.Types.ObjectId, required: true },
    isCompleted: { type: Boolean, required: true }
})