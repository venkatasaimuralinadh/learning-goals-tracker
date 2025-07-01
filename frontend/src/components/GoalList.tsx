import { useGoals } from "../context/GoalContext";
import GoalCard from "./GoalCard";

const GoalList = () => {
  const { goals } = useGoals();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
};

export default GoalList;