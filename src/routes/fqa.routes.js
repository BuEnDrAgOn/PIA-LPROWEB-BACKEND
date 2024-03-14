import { Router } from "express";
import { create, read, update, deleteFQA } from "../controllers/fqa.controller.js"

const router = Router()

router.post('/', create)
router.get('/', read)
router.put('/', update)
router.delete('/', deleteFQA)

export default router