import express from 'express'
import { IBaseRequest } from '../../types/integration.types'
import { uploadFileMiddleware } from '../../helper/common.helper'
import { readTermData } from './term.service'

const router = express.Router()

router.get('/', async (req, res) => {
    const baseRequest = req as IBaseRequest

    const terms = await baseRequest.db.terms.where().exec()

    res.json(terms)
})

router.post('/', uploadFileMiddleware, async (req, res) => {
    const importTermRequest = req as IBaseRequest

    const terms = await readTermData(req.file!)

    await importTermRequest.db.terms.insertMany(terms)

    res.send({})
})

export default router