import { Request, Response } from "express";
import { pool } from "../db";

export const getGroupMembers = async (req: Request, res: Response) => {
  const { group_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT username FROM users WHERE group_id = $1",
      [group_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch group members failed:", err);
    res.status(500).json({ error: "Could not fetch group members" });
  }
};

export const getAllGropuNames = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM groups");
    res.json(result.rows);
  } catch (err) {
  console.error("Error in getAllGoals:", err);
  res.status(500).json({ error: "Failed to fetch goals" });
}
};
