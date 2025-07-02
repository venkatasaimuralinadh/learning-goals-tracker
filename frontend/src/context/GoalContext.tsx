import { createContext, useContext, useEffect, useState } from "react";
import type { Goal } from "../types/GoalModel";
import type { ReactNode } from "react";
import axios from "axios";
import { useUser } from "./AppContext";
import API_BASE_URL from "../config/config";

export interface GoalContextType {
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  deleteGoal: (id: string) => void;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export const useGoals = () => {
  const context = useContext(GoalContext);
  if (!context) throw new Error("useGoals must be used within GoalProvider");
  return context;
};

export const GoalProvider = ({ children }: { children: ReactNode }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const { token } = useUser();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(API_BASE_URL+"/goals/user/getAll", {
          headers: {
            Authorization: token,
          },
        });
        setGoals(response.data);
      } catch (err) {
        console.error("Error fetching goals:", err);
      }
    };

    if (token) {
      fetchGoals();
    }
  }, [token]);

  const addGoal = async (goal: Omit<Goal, "id">) => {
    try {
      const response = await axios.post(
        API_BASE_URL+"/goals/add",
        {
          title: goal.title,
          progress: goal.progress,
          deadline: new Date(goal.deadline).toLocaleDateString("en-US"),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setGoals((prev) => [...prev, response.data.goal]);
    } catch (err) {
      console.error("Error adding goal:", err);
    }
  };

  const deleteGoal = async (id: string) => {
    try {
      await axios.delete(API_BASE_URL+"/goals/delete/${id}", {
        headers: {
          Authorization: token,
        },
      });
      setGoals((prev) => prev.filter((goal) => goal.id !== id));
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  };

  return (
    <GoalContext.Provider value={{ goals, addGoal, deleteGoal }}>
      {children}
    </GoalContext.Provider>
  );
};
