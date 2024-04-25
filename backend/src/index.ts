import express, { Express } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

dotenv.config()
const port = process.env.PORT || 5000

const app: Express = express()

app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`[Server]: Server is running at http://localhost:${port}`)
})