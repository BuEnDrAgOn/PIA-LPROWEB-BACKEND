import { Router } from "express";
import { create, read, readAll, update, deleteGames, readGameList } from "../controllers/games.controller.js"

const router = Router()

router.post('/', create)
router.get('/', readAll)
router.get('/game/:gameName', read)
router.get('/:consoleName/:categoryName', readGameList)
router.put('/', update)
router.delete('/', deleteGames)

export default router