import { Router } from "express";
import { create, read, update, deleteGames } from "../controllers/games.controller.js"

const router = Router()

router.post('/games', create)
router.get('/games', read)
router.put('/games', update)
router.delete('/games', deleteCategory)

export default router