import { Router } from "express";
import { create, read, update, deleteGames } from "../controllers/games.controller.js"

const router = Router()

router.post('/', create)
router.get('/', read)
router.put('/', update)
router.delete('/', deleteGames)

export default router