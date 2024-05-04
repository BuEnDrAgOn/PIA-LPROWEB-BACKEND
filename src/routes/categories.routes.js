import { Router } from "express";
import { create, readAll, update, deleteCategory, read } from "../controllers/categories.controller.js"

const router = Router()

router.post('/', create);
router.get('/', readAll);
router.get('/:category', read)
router.put('/', update);
router.delete('/', deleteCategory);

export default router