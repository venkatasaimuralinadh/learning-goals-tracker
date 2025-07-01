import { Router } from "express";
import { getAllGoals, addGoal, getGoalsByUser, deleteGoal } from "../controllers/goalsController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/getAll", authenticateToken, getAllGoals);
router.get("/user/getAll", authenticateToken, getGoalsByUser);
router.post("/add", authenticateToken, addGoal);
router.delete("/delete/:goalId", authenticateToken, deleteGoal);



export default router;
