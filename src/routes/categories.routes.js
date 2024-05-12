import { Router } from "express";
import { create, readAll, update, deleteCategory } from "../controllers/categories.controller.js"

const router = Router()

router.post('/', create);
router.get('/', readAll);
router.patch('/:categoryId', update);
router.delete('/:categoryId', deleteCategory);

export default router