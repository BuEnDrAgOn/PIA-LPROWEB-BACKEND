import { Router } from "express";
import { create, createGameInfo, read, readAll, updateGame, deleteGames, readGameList, createOrUpdateGameInfo } from "../controllers/games.controller.js"

const router = Router()

router.post('/', create)
router.post('/info/:gameID', createGameInfo)
router.get('/', readAll)
router.get('/game/:gameName', read)
router.get('/:consoleName/:categoryName', readGameList)
router.patch('/:gameId', updateGame)
router.patch('/info/:gameId', createOrUpdateGameInfo)
router.delete('/:gameId', deleteGames)

export default router