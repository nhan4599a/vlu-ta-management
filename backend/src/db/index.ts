import {
    Connection,
    Model,
    createConnection,
    mongo
} from 'mongoose'
import { ITerm, TermSchema } from './models/term'
import { IUser, UserSchema } from './models/user'
import { env } from '../env'

export default class DbInstance {
    #dbConnection: Connection
    #dbSession: mongo.ClientSession | undefined

    terms: Model<ITerm>
    users: Model<IUser>

    constructor() {
        this.#dbConnection = createConnection(env.CONNECTION_STRING)
        this.terms = this.#dbConnection.model('Term', TermSchema)
        this.users = this.#dbConnection.model('User', UserSchema)
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