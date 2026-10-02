import { useState, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import authService from "../services/AuthService";

// Provider yang membungkus aplikasi dan menyediakan state login global
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    authService.isAuthenticated(),
  );

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password);
    setUser(data.user);
    setIsAuthenticated(true);
    return data;
  }, []);

  const register = useCallback(async (name, email, password) => {
    return await authService.register(name, email, password);
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;