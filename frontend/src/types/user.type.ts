export interface IUser {
    _id: string,
	code?: string,
    class?: string,
	name?: string,
	email?: string,
	active: boolean,
	role: number
}

export enum Role {
    Student,
    Teacher,
    StudentAssociate,
    Admin
}