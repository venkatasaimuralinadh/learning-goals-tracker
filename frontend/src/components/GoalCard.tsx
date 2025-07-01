import type { Goal } from "../types/GoalModel";
import { useGoals } from "../context/GoalContext";
import { formatDistanceToNowStrict, isPast } from "date-fns";

interface Props {
  goal: Goal;
}

const GoalCard = ({ goal }: Props) => {
  const { deleteGoal } = useGoals();

  const handleDelete = () => {
    if (confirm(`Delete goal "${goal.title}"?`)) {
      deleteGoal(goal.id);
    }
  };

  const daysLeft = isPast(new Date(goal.deadline))
    ? "✅ Deadline passed"
    : `⏳ ${formatDistanceToNowStrict(new Date(goal.deadline))} left`;

  return (
    <div className="bg-white shadow rounded-2xl p-4 mb-4 relative">
      <h3 className="text-lg font-bold mb-2">{goal.title}</h3>
      <div className="mb-2">
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="h-2 bg-blue-600 rounded-full"
            style={{ width: `${goal.progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">{goal.progress}% complete</p>
      </div>
      <p className="text-sm text-gray-500">{daysLeft}</p>

      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        title="Delete goal"
      >
        🗑
      </button>
    </div>
  );
};

export default GoalCard;
