import express, { Express } from 'express'
import cors from 'cors'
import termController from './controllers/term/term.controller'
import recruitController from './controllers/recruit/recruit.controller'
import authenticationController from './controllers/authentication/authentication.controller'
import usersController from './controllers/users/users.controller'
import publicController from './controllers/public/public.controller'
import applicationController from './controllers/application/application.controller'
import { env } from './env'
import { errorLogging, globalErrorHandler } from './middlewares/errors.middleware'
import { attachDbInstance, extendResponseMethods } from './middlewares/hooks.middleware'
import { authenticate } from './middlewares/authentication.middleware'

const app: Express = express()

app.use(cors())
app.use(express.json())

app.use(attachDbInstance)
app.use(extendResponseMethods)

app.use(authenticate)

app.use('/public', publicController)
app.use('/hoc-phan', termController)
app.use('/tuyen-dung', recruitController)
app.use('/authenticate', authenticationController)
app.use('/users', usersController)
app.use('/application', applicationController)

app.use(errorLogging)
app.use(globalErrorHandler)

app.listen(env.PORT, () => {
    console.log(`[Server]: Server is running at http://localhost:${env.PORT}`)
})