import { Router } from "express";
import { create, read, update, deleteUser } from "../controllers/users.controller.js"

const router = Router()

router.post('/users', create)
router.get('/users', read)
router.put('/users', update)
router.delete('/users', deleteUser)

export default router