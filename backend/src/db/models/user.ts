import { Schema } from "mongoose";
import { Role } from "../../constants/role.enum";

export interface IUser {
    code?: string,
    class?: string,
    email: string,
    active: boolean,
    name: string,
    roles: [Role]
}

export const UserSchema = new Schema<IUser>({
    code: { type: String, required: false },
    class: { type: String, required: false },
    email: { type: String, required: true, index: true },
    active: { type: Boolean, required: true },
    name: { type: String, required: true },
    roles: { type: [Number], required: true }
})