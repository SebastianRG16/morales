import { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: !!localStorage.getItem("token"),
    token: localStorage.getItem("token"),
    refreshToken: localStorage.getItem("refresh"),
    idUser: localStorage.getItem("idUser"),
    is_superuser: false,
  });

  const login = (data) => {
    localStorage.setItem("token", data.access);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("idUser", data.id);
    setAuth({
      isAuthenticated: true,
      token: data.access,
      refreshToken: data.refresh,
      idUser: data.id,
      is_superuser: data.is_superuser,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("idUser");
    setAuth({
      isAuthenticated: false,
      token: null,
      refreshToken: null,
      idUser: null,
      is_superuser: false,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
