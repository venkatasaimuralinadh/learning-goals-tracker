import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { pool } from "../db";
import bcrypt from "bcrypt";
dotenv.config();

export const registerUser = async (req: Request, res: Response): Promise<any> => {
  const { username, password, group_name } = req.body;


  if (!username || !password || !group_name) {
    return res.status(400).json({ error: "All fields (username, password, group_name) are required" });
  }

  try {
  
    const groupResult = await pool.query(
      "SELECT id FROM groups WHERE name = $1",
      [group_name]
    );

  
    if (groupResult.rows.length === 0) {
      return res.status(404).json({ error: "Group not found" });
    }

   
    const group_id = groupResult.rows[0].id;

    
    const hashedPassword = await bcrypt.hash(password, 12);

   
    await pool.query(
      "INSERT INTO users (username, password, group_id) VALUES ($1, $2, $3)",
      [username, hashedPassword, group_id]
    );

    
    const token = jwt.sign({ username, group_id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    
    res.status(201).json({ message: "User registered", token, group_name });
  } 
  catch (err: unknown) {
  if (err instanceof Error) {
    console.error("Register error:", err); 
    res.status(500).json({ error: "Failed to Register", details: err.message });
  } else {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Failed to Register", details: "An unexpected error occurred" });
  }
}
};


export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;

  try {
    const userResult = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(202).json({ error: "User not found" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const groupResult = await pool.query("SELECT name FROM groups WHERE id = $1", [user.group_id]);
    const group = groupResult.rows[0];

    if (!group) {
      return res.status(202).json({ error: "Group not found" });
    }

    const token = jwt.sign({ username: user.username, group_id: user.group_id }, process.env.JWT_SECRET!, { expiresIn: "2d" });
    res.json({ token, group_name: group.name });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};

