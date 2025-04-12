import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/auth/me", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.warn("User not logged in. No token found.");
        setUser(null); // No error, just set user to null
      } else {
        console.error("Unexpected error fetching user:", error);
      }
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch user data when app loads
  }, []);

  const login = async (email, password) => {
    try {
      await axios.post(
        "http://localhost:8000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      await fetchUser(); // Fetch user again after login
      navigate("/todos");
    } catch (error) {
      console.error(error.response?.data?.error || "Login failed");
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:8000/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
