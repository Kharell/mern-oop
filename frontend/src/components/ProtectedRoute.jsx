import { Navigate, Outlet } from "react-router-dom";
import authService from "../services/AuthService";

// Komponen pelindung: hanya bisa diakses kalau user sudah login
const ProtectedRoute = () => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;