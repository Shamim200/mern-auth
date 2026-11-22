import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const UseAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("use auth must be use in auth provider");
  }
  return authContext;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [token, setToken] = useState();
  // const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // handel show password
  const handelShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const token = localStorage.getItem("accessToken");
  //       if (!token) {
  //         setLoading(false);
  //         return;
  //       }
  //       const response = await axios.get("/api/v1/users/dashboard", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (response.status === 401) {
  //         localStorage.removeItem("accessToken");
  //         setUser(null);
  //         setLoading(false);
  //         return;
  //       }
  //       setUser(response.data.data);
  //     } catch {
  //       setUser(null);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/v1/users/dashboard");
        setUser(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const userLogout = async () => {
    try {
      await axios.post("/api/v1/users/logout");
      // localStorage.removeItem("accessToken");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userLogout,
        // loading,
        showPassword,
        handelShowPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
