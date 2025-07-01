import { Request, Response } from "express";
import { pool } from "../db";
import { Goal } from "../models/goal";

export const getAllGoals = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM goals ORDER BY deadline ASC");
    res.json(result.rows);
  } catch (err) {
  console.error("Error in getAllGoals:", err);
  res.status(500).json({ error: "Failed to fetch goals" });
}
};

export const getGoalsByUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const username = (req as any).user?.username; 
    if (!username) {
      return res.status(401).json({ error: "Unauthorized: no user found" });
    }

    const result = await pool.query(
      "SELECT * FROM goals WHERE username = $1 ORDER BY deadline ASC",
      [username]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error in getGoalsByUser:", err);
    res.status(500).json({ error: "Failed to fetch user goals" });
  }
};

export const addGoal = async (req: Request, res: Response): Promise<any> => {
  const { title, progress, deadline } = req.body;
  const username = (req as any).user?.username;
  const group_id = (req as any).user?.group_id;

  
  if (!title || !deadline || progress === undefined || !username || !group_id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    
    const result = await pool.query(
      "INSERT INTO goals (id, title, progress, deadline, username, group_id) VALUES (gen_random_uuid(), $1, $2, $3, $4, $5) RETURNING *",
      [title, progress, deadline, username, group_id]
    );

    
    if (result.rowCount && result.rowCount > 0) {
      const addedGoal: Goal = result.rows[0];
      console.log("Goal added successfully:", addedGoal);
      res.status(201).json({ message: "Goal added", goal: addedGoal });
    } else {
      console.log("No rows affected.");
      res.status(500).json({ error: "Failed to add goal" });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error in addGoal:", err); 
      res.status(500).json({ error: "Failed to add goal", details: err.message });
    } else {
      console.error("Unexpected error:", err);
      res.status(500).json({ error: "Failed to add goal", details: "An unexpected error occurred" });
    }
  }
};

export const deleteGoal = async (req: Request, res: Response): Promise<any> => {
  const { goalId } = req.params;
  const username = (req as any).user?.username;

  
  if (!goalId) {
    return res.status(400).json({ error: "Goal ID is required" });
  }

  try {
    
    const result = await pool.query(
      "SELECT * FROM goals WHERE id = $1 AND username = $2",
      [goalId, username]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Goal not found or you do not have permission" });
    }

    
    const deleteResult = await pool.query(
      "DELETE FROM goals WHERE id = $1",
      [goalId]
    );

    if(deleteResult){
      if ( deleteResult.rowCount && deleteResult.rowCount > 0) {
      return res.status(200).json({ message: "Goal deleted successfully" });
    }
    } else {
      return res.status(500).json({ error: "Failed to delete goal" });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error in deleteGoal:", err); 
      res.status(500).json({ error: "Failed to delete goal", details: err.message });
    } else {
      console.error("Unexpected error:", err); 
      res.status(500).json({ error: "Failed to delete goal", details: "An unexpected error occurred" });
    }
  }
};

