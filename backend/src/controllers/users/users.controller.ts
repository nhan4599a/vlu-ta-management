import express from "express";
import { getUsersByRole } from "./users.service";
import { responseWithValue } from "../../helper/response.helper";
import { createTypedRequest } from "../../helper/type.helper";

const router = express.Router()

type UpdateUserStatusRequest = {
    active: boolean
}

router.get('/', async (req, res) => {
    const users = await getUsersByRole(req)

    responseWithValue(res, users)
})

router.patch('/:userId', async (req, res) => {
    const { db, body, params } = createTypedRequest<UpdateUserStatusRequest, {}>(req)

    await db.users.findByIdAndUpdate(params.userId, {
        $set: {
            active: body.active
        }
    })

    responseWithValue(res, undefined)
})

export default router