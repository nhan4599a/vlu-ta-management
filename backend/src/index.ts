import express, { Express } from 'express'
import cors from 'cors'
import termController from './controllers/term/term.controller'
import recruitController from './controllers/recruit/recruit.controller'
import { env } from './env'
import { errorLogging, globalErrorHandler } from './middlewares/errors.middleware'
import { attachDbInstance, extendResponseMethods } from './middlewares/hooks.middleware'

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(attachDbInstance)
app.use(extendResponseMethods)

app.use('/hoc-phan', termController)
app.use('/tuyen-dung', recruitController)

app.use(errorLogging)
app.use(globalErrorHandler)

app.listen(env.PORT, () => {
    console.log(`[Server]: Server is running at http://localhost:${env.PORT}`)
})