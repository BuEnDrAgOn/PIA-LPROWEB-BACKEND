import { Router } from "express";
import { create, read, update, deleteCategory } from "../controllers/categories.controller.js"

const router = Router()

router.post('/categories', create)
router.get('/categories', read)
router.put('/categories', update)
router.delete('/categories', deleteCategory)

export default router