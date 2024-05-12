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

export default class DbInstance {
    #dbConnection: Connection
    #dbSession: mongo.ClientSession | undefined

    terms: Model<ITerm>
    users: Model<IUser>
    appliactions: Model<IApplicationForm>

    constructor() {
        this.#dbConnection = createConnection(env.CONNECTION_STRING)
        this.terms = this.#dbConnection.model('terms', TermSchema)
        this.users = this.#dbConnection.model('users', UserSchema)
        this.appliactions = this.#dbConnection.model('applications', ApplicationFormSchema)
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