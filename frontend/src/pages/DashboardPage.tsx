import GoalForm from "../components/GoalForm";
import GoalList from "../components/GoalList";
import { useUser } from "../context/AppContext";

const Dashboard = () => {
  const { username, group } = useUser();
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-2">Welcome, {username}!</h1>
      <p className="text-gray-600 mb-6">
        You are in group: <span className="font-semibold">{group}</span>
      </p>
      <GoalForm />
      <GoalList />
    </div>
  );
};

export default Dashboard;