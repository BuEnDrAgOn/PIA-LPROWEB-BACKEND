import { Router } from "express";
import { create, read, readAll, update, deleteGames } from "../controllers/games.controller.js"

const router = Router()

router.post('/', create)
router.get('/', readAll)
router.get('/:consoleName/:categoryName', read)
router.put('/', update)
router.delete('/', deleteGames)

export default router