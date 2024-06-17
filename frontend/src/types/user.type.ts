export interface IUser {
    _id: string,
	code?: string,
    class?: string,
    phoneNumber?: string,
	name?: string,
	email?: string,
	active: boolean,
	role: Role,
    votingScores: number[]
}

export enum Role {
    Student,
    Teacher,
    StudentAssociate,
    Assistant
}