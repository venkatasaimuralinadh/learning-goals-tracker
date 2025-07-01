import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface UserContextType {
  username: string | null;
  setUsername: (name: string | null) => void;
  group: string | null;
  setGroup: (group: string | null) => void;
  token: string | null;
  setToken: (token: string | null) => void; 
  isLoggedIn: boolean;
  logout: () => void;
  loading: boolean; 
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsernameState] = useState<string | null>(null);
  const [group, setGroupState] = useState<string | null>(null); 
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedGroup = localStorage.getItem("group");

    if (storedToken) {
      setTokenState(storedToken);
    }

    if (storedUsername) {
      setUsernameState(storedUsername);
    }

    if (storedGroup) {
      setGroupState(storedGroup);
    }

    
    setLoading(false);
  }, []);

 
  const isLoggedIn = !!username && !!token;

  const setToken = (token: string | null) => {
    
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    setTokenState(token);
  };

  const setUsername = (name: string | null) => {
    
    if (name) {
      localStorage.setItem("username", name);
    } else {
      localStorage.removeItem("username");
    }
    setUsernameState(name);
  };

  const setGroup = (group: string | null) => {
    
    if (group) {
      localStorage.setItem("group", group);
    } else {
      localStorage.removeItem("group");
    }
    setGroupState(group);
  };

  const logout = () => {
    setUsername(null);
    setGroup(null);
    setToken(null);
  };

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        group,
        setGroup,
        token,
        setToken,
        isLoggedIn,
        logout,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
