import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) return null;

        const response = await axios.get(`/api/v1/users/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.data);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const userLogout = async () => {
    await axios.post("/api/v1/users/logout");
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, userLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => useContext(AuthContext);
