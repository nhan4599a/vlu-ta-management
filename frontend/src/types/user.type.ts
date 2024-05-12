export interface IUser {
	code?: string,
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