import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/AppContext";
import axios from "axios";

const Login = () => {
  const { setUsername, setToken, setGroup } = useUser();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (name.trim() && password.trim()) {
      try {
        setError(null);

        const response = await axios.post("http://localhost:5000/api/login", {
          username: name.trim(),
          password: password.trim(),
        });

        if (response.status === 200) {
          const { token, group_name } = response.data;
          setUsername(name.trim());
          setToken(token);
          setGroup(group_name);
          localStorage.setItem("group", group_name);
          navigate("/dashboard");
        } else if (response.status === 202) {
          localStorage.setItem("temp_username", name.trim());
          localStorage.setItem("temp_password", password.trim());
          navigate("/groups");
        } else {
          setError("Unexpected server response");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError(error.response.data.message || "Login failed. Please try again.");
          } else {
            setError("Network error. Please check your connection.");
          }
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      }
    } else {
      setError("Please fill in both fields.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login to your account</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full border rounded px-3 py-2 mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full border rounded px-3 py-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
