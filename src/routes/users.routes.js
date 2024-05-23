import { Router } from "express";
import { create, read, update, deleteUser, updateUserScore, userGameScore, createUserQuestion, readUsersQuestions, deleteUserQuestion,  } from "../controllers/users.controller.js"

const router = Router()

router.post('/', create)
router.post('/read/', read)
router.patch('/', update)
router.delete('/', deleteUser)

router.patch('/user_score/', updateUserScore)
router.get('/user_score/', userGameScore)

router.post('/user_question/', createUserQuestion)
router.get('/user_question/', readUsersQuestions)
router.delete('/user_question/:question_id', deleteUserQuestion)

export default router