import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { api } from "../utils/Main";

export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  setIsAuthenticated: () => null,
  setUser: () => null,
  logout: () => null,
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    if (session) {
      const decoded = jwtDecode(session.refresh_token);
      const expiry = dayjs(decoded.exp * 1000);
      const isValid = dayjs().isBefore(expiry);

      if (isValid) {
        api
          .get(`/users/${session.user.id}`)
          .then((res) => {
            setUser(res.data.user);
            setIsAuthenticated(true);
          })
          .catch(() => {
            logout();
          });
      } else {
        logout();
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("session");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, setUser, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
