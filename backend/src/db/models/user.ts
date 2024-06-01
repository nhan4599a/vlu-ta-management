import { Schema } from "mongoose";
import { Role } from "../../constants/role.enum";

export interface IUser {
    code?: string,
    class?: string,
    phoneNumber?: string,
    email: string,
    active: boolean,
    name: string,
    role: Role,
    isAssistant: boolean
}

export const UserSchema = new Schema<IUser>({
    code: { type: String, required: false, unique: true },
    class: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    email: { type: String, required: true },
    active: { type: Boolean, required: true },
    name: { type: String, required: true },
    role: { type: Number, required: true },
    isAssistant: { type: Boolean, required: true }
})