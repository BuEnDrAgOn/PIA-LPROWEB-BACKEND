import { Router } from "express";
import { create, index, update, deleteFQA } from "../controllers/fqa.controller.js"

const router = Router()

router.post('/', create)
router.get('/', index)
router.patch('/:faqId', update)
router.delete('/:faqId', deleteFQA)

export default router