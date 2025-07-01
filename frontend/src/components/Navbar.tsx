import { useUser } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { username, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">🎯 Goal Tracker</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium">👤 {username}</span>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
