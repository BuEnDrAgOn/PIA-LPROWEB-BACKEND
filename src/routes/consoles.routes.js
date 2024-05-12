import { Router } from "express";
import { create, read, update, deleteConsoles } from "../controllers/consoles.controller.js"

const router = Router()

router.post('/', create)
router.get('/', read)
router.patch('/:consoleId', update)
router.delete('/:consoleId', deleteConsoles)

export default router