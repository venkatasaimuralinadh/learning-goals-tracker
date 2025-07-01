import { Router } from "express";
import { getAllGropuNames, getGroupMembers } from "../controllers/groupController";

const router = Router();

router.get("/:group_id/members", getGroupMembers);
router.get("/getAll", getAllGropuNames);

export default router;
