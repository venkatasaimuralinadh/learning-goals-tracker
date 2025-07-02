import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/DashboardPage";
import JoinGroup from "./pages/JoinGroup";
import Navbar from "./components/Navbar";
import { useUser } from "./context/AppContext";
import { GoalProvider } from './context/GoalContext';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect, useState } from 'react';

const App = () => {
  const { token, loading } = useUser();
  const [hasTempUser, setHasTempUser] = useState<boolean>(false);

  useEffect(() => {
    const tempUsername = localStorage.getItem("temp_username");
    const tempPassword = localStorage.getItem("temp_password");

    if (tempUsername && tempPassword) {
      setHasTempUser(true);
    } else {
      setHasTempUser(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-dashed border-t-transparent rounded-full animate-spin
          border-t-blue-500 border-r-yellow-500 border-b-pink-500 border-l-green-500">
        </div>
      </div>
    );
  }

  return (
    <GoalProvider>
      {token && <Navbar />}
      <Routes>
        {/* Main route: Redirect to dashboard if logged in */}
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <Login />}
        />

        {/* Protected Dashboard route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Join Group route */}
        <Route
          path="/groups"
          element={
            token ? (
              <Navigate to="/dashboard" />
            ) : (
              <JoinGroup />
            )
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </GoalProvider>
  );
};

export default App;
