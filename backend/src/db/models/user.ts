import { Schema, model } from "mongoose";
import { Role } from "../../constants/role.enum";

export interface IUser {
    email: string,
    active: boolean,
    name?: string,
    roles: [Role]
}

export const UserSchema = new Schema<IUser>({
    email: { type: String, required: true },
    active: { type: Boolean, required: true },
    name: { type: String, required: false },
    roles: { type: [Number], required: true }
})