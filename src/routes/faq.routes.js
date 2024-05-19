import { Router } from "express";
import { create, index, show, update, deleteFQA } from "../controllers/fqa.controller.js"

const router = Router()

router.post('/', create)
router.get('/', index)
router.get('/:id', show)
router.put('/', update)
router.delete('/', deleteFQA)

export default router