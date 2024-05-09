import express, { Express } from 'express'
import cors from 'cors'
import termController from './controllers/term/term.controller'
import recruitController from './controllers/recruit/recruit.controller'
import { IBaseRequest } from './types/integration.types'
import { env } from './env'
import DbInstance from './db'
import { errorLogging, globalErrorHandler } from './middlewares/errors.middleware'
import { standardizeResponse } from './middlewares/hooks.middleware'

const app: Express = express()

app.use(cors())
app.use(express.json())

app.use(standardizeResponse)
app.use((req, _, next) => {
    const baseReq = req as IBaseRequest
    baseReq.db = new DbInstance()

    next()
})

app.use('/hoc-phan', termController)
app.use('/tuyen-dung', recruitController)

app.use(errorLogging)
app.use(globalErrorHandler)

app.listen(env.PORT, () => {
    console.log(`[Server]: Server is running at http://localhost:${env.PORT}`)
})