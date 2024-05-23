import { Router } from "express";
import { bestGame, userActivity, userCount } from "../controllers/report.controller.js";

const router = Router()

router.get('/user_score', userCount)
router.get('/user_activity', userActivity)
router.get('/bestgame', bestGame)

export default router