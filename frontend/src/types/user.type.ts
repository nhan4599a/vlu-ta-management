export interface IUser {
    _id: string,
	code?: string,
    class?: string,
	name?: string,
	email?: string,
	active: boolean,
	role: Role
}

export enum Role {
    Student,
    Teacher,
    StudentAssociate,
    Assistant
}