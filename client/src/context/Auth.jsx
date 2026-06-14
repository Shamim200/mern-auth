import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          setLoading(false);
          return;
        }

        // const response = await fetch(`/api/v1/users/dashboard`, {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        const response = await fetch("/api/v1/users/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem("accessToken");
          setUser(null);
          setLoading(false);
          return;
        }

        setUser(response.data.data);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const userLogout = async () => {
    // await axios.post("/api/v1/users/logout");
    // localStorage.removeItem("accessToken");
    // setUser(null);
    try {
      await fetch("/api/v1/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.removeItem("accessToken");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, userLogout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => useContext(AuthContext);
