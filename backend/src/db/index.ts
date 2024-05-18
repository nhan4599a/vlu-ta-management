import {
    Connection,
    Model,
    createConnection,
    mongo
} from 'mongoose'
import { ITerm, TermSchema } from './models/term'
import { IUser, UserSchema } from './models/user'
import { env } from '../env'
import { ApplicationFormSchema, IApplicationForm } from './models/application-form'
import { ITask, TaskSchema } from './models/task'

export default class DbInstance {
    #dbConnection: Connection
    #dbSession: mongo.ClientSession | undefined

    terms: Model<ITerm>
    users: Model<IUser>
    applications: Model<IApplicationForm>
    tasks: Model<ITask>

    constructor() {
        this.#dbConnection = createConnection(env.CONNECTION_STRING)
        this.terms = this.#dbConnection.model('terms', TermSchema)
        this.users = this.#dbConnection.model('users', UserSchema)
        this.applications = this.#dbConnection.model('applications', ApplicationFormSchema)
        this.tasks = this.#dbConnection.model('tasks', TaskSchema)
    }

    async startTransaction() {
        this.#dbSession = await this.#dbConnection.startSession()

        this.#dbSession.startTransaction()
    }

    async commitTransaction() {
        await this.#dbSession?.commitTransaction()
        await this.#dbSession?.endSession()
    }
}