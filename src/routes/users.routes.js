import { Router } from "express";
import { create, read, update, deleteUser, updateUserScore, readScoresGame } from "../controllers/users.controller.js"

const router = Router()

router.post('/', create)
router.post('/read/', read)
router.put('/', update)
router.delete('/', deleteUser)

router.patch('/user_score/', updateUserScore)
router.get('/user_score/:gameId', readScoresGame)

export default router