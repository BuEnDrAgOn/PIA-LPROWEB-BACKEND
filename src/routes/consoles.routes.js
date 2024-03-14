import { Router } from "express";
import { create, read, update, deleteConsoles } from "../controllers/consoles.controller.js"

const router = Router()

router.post('/', create)
router.get('/', read)
router.put('/', update)
router.delete('/', deleteConsoles)

export default router