import express, { Express, Router } from 'express'
import dotenv from 'dotenv'
import termController from './controllers/term'

dotenv.config()
const port = process.env.PORT || 5000

const app: Express = express()

app.use(express.json())
app.use('/hoc-phan', termController)


app.listen(port, () => {
    console.log(`[Server]: Server is running at http://localhost:${port}`)
})