import { useState } from "react";
import { useGoals } from "../context/GoalContext";
import { v4 as uuidv4 } from "uuid";

const GoalForm = () => {
  const { addGoal } = useGoals();
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !deadline) return;
    addGoal({ id: uuidv4(), title, deadline, progress });
    setTitle("");
    setDeadline("");
    setProgress(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold">Add New Goal</h2>
      <input
        type="text"
        placeholder="Goal title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="range"
        min={0}
        max={100}
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        className="w-full"
      />
      <div className="text-sm text-gray-600">Progress: {progress}%</div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Goal
      </button>
    </form>
  );
};

export default GoalForm;