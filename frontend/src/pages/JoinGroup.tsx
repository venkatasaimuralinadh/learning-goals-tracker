import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/AppContext";
import API_BASE_URL from "../config/config";

const JoinGroup = () => {
  const { setToken, setGroup, setUsername } = useUser();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);

  const navigate = useNavigate();

  const [name, setName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("temp_username");
    const storedPassword = localStorage.getItem("temp_password");

    if (storedName && storedPassword) {
      setName(storedName);
      setPassword(storedPassword);
    } else {
      setError("Missing credentials. Please login again.");
      navigate("/login");
    }

  
    const fetchGroups = async () => {
      try {
        const response = await axios.get(API_BASE_URL + "/groups/getAll");
        setGroups(response.data);
      } catch (err) {
        setError("Failed to fetch groups");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [navigate]);

  const handleJoin = async (group_name: string) => {
    if (!name || !password) {
      return setError("Missing credentials. Please login again.");
    }

    setJoining(true);
    setError(null);

    try {
      const response = await axios.post(API_BASE_URL + "/register", {
        username: name,
        password,
        group_name,
      });

      const { token, group_name: gName } = response.data;
      setUsername(name);
      setToken(token);
      setGroup(gName);

      localStorage.removeItem("temp_username");
      localStorage.removeItem("temp_password");
      localStorage.setItem("group", gName);

      navigate("/dashboard");
    } catch (err) {
      setError("Failed to join group");
    } finally {
      setJoining(false);
    }
  };

  if (loading) return <p className="text-center p-4">Loading groups...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Choose a Group to Join</h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <ul className="space-y-3">
          {groups.map((group: any) => (
            <li
              key={group.id}
              className="flex justify-between items-center border rounded px-4 py-2"
            >
              <span>{group.name}</span>
              <button
                onClick={() => handleJoin(group.name)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                disabled={joining}
              >
                Join
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JoinGroup;
