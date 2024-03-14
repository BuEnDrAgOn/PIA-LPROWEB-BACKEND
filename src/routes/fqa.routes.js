import { Router } from "express";
import { create, read, update, deleteFQA } from "../controllers/fqa.controller.js"

const router = Router()

router.post('/fqa', create)
router.get('/fqa', read)
router.put('/fqa', update)
router.delete('/fqa', deleteFQA)

export default router