import express, { Express } from 'express'
import termController from './controllers/term/term.controller'
import { IBaseRequest } from './types/integration.types'
import { env } from './env'
import DbInstance from './db'
import { errorLogging, globalErrorHandler } from './middlewares/errors.middleware'
import { standardizeResponse } from './middlewares/hooks.middleware'

const app: Express = express()

app.use(express.json())

app.use(standardizeResponse)
app.use((req, _, next) => {
    const baseReq = req as IBaseRequest
    baseReq.db = new DbInstance()

    next()
})

app.use('/hoc-phan', termController)

app.use(errorLogging)
app.use(globalErrorHandler)

app.listen(env.PORT, () => {
    console.log(`[Server]: Server is running at http://localhost:${env.PORT}`)
})