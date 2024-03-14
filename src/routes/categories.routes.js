import { Router } from "express";
import { create, read, update, deleteCategory } from "../controllers/categories.controller.js"

const router = Router()

router.post('/', create);
router.get('/', read);
router.put('/', update);
router.delete('/', deleteCategory);

export default router