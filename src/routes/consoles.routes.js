import { Router } from "express";
import { create, read, update, deleteFQA } from "../controllers/consoles.controller.js"

const router = Router()

router.post('/consoles', create)
router.get('/consoles', read)
router.put('/consoles', update)
router.delete('/consoles', deleteConsole)

export default router