import express from "express";
import { getUsersByRole } from "./users.service";
import { responseWithValue } from "../../helper/response.helper";

const router = express.Router()

router.get('/', async (req, res) => {
    const users = await getUsersByRole(req)

    responseWithValue(res, users)
})

export default router