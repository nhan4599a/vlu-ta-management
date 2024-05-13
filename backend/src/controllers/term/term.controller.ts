import express from 'express'
import { IBaseRequest } from '../../types/integration.types'
import { uploadFileMiddleware } from '../../helper/upload.helper'
import { getAssitantsInfo, getTermData, readTermData } from './term.service'
import { responseWithValue } from '../../helper/response.helper'

const router = express.Router()

router.get('/', async (req, res) => {
    const terms = await getTermData(req)

    responseWithValue(res, terms)
})

router.post('/', uploadFileMiddleware, async (req, res) => {
    const { db, file } = req as IBaseRequest

    const terms = await readTermData(file!)

    await db.terms.insertMany(terms)

    responseWithValue(res, null)
})

router.get('/:id/classes/:classId/assistants', async (req, res) => {
    const assistants = await getAssitantsInfo(req)

    responseWithValue(res, assistants)
})

export default router