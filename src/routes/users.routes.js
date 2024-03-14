import { Router } from "express";
import { create, read, update, deleteUser } from "../controllers/users.controller.js"

const router = Router()

router.post('/', create)
router.get('/', read)
router.put('/', update)
router.delete('/', deleteUser)

export default router