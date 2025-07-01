import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/DashboardPage";
import JoinGroup from "./pages/JoinGroup";
import Navbar from "./components/Navbar";
import { useUser } from "./context/AppContext";
import { GoalProvider } from './context/GoalContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const { token, loading } = useUser();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-dashed border-t-transparent rounded-full animate-spin
          border-t-blue-500 border-r-yellow-500 border-b-pink-500 border-l-green-500">
        </div>
      </div>
    );
  }

  const hasTempUser = localStorage.getItem("temp_username") && localStorage.getItem("temp_password");
  console.log(hasTempUser);

  return (
    <GoalProvider>
      {token && <Navbar />}
      <Routes>
        <Route path="/" element={token ? (
              <Navigate to="/dashboard" />
            ) : <Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/groups"
          element={
            token ? (
              <Navigate to="/dashboard" />
            ) : hasTempUser ? (
              <JoinGroup />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </GoalProvider>
  );
};

export default App;
