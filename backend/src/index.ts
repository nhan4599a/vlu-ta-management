import express, { Express } from 'express'
import termController from './controllers/term/term.controller'
import { BaseResponse, IBaseRequest } from './types/integration.types'
import { env } from './env'
import DbInstance from './db'

const app: Express = express()

app.use(express.json())

app.use((req, _, next) => {
    const baseReq = req as IBaseRequest
    baseReq.db = new DbInstance()

    try {
        return next()
    } catch (e) {
        return {
            success: false
        } as BaseResponse<null>
    }
})

app.use('/hoc-phan', termController)

app.listen(env.PORT, () => {
    console.log(`[Server]: Server is running at http://localhost:${env.PORT}`)
})