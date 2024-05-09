import express from 'express'
import { IBaseRequest } from '../../types/integration.types'
import { uploadFileMiddleware } from '../../helper/upload.helper'
import { getTermData, readTermData } from './term.service'

const router = express.Router()

router.get('/', async (req, res) => {
    const terms = await getTermData(req)

    res.json(terms)
})

router.post('/', uploadFileMiddleware, async (req, res) => {
    const { db, file } = req as IBaseRequest

    const terms = await readTermData(file!)

    await db.terms.insertMany(terms)

    res.json()
})

export default router