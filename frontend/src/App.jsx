import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import authService from "./services/AuthService";

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        {/* 1. Halaman Awal: arahkan sesuai status login */}
        <Route
          path="/"
          element={
            <Navigate
              to={authService.isAuthenticated() ? "/dashboard" : "/login"}
            />
          }
        />

        {/* 2. Rute Login */}
        <Route path="/login" element={<Login />} />

        {/* 3. Rute Register */}
        <Route path="/register" element={<Register />} />

        {/* 4. Rute yang dilindungi: hanya untuk user yang sudah login */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* 5. Pelindung: jika user mengetik URL asal, arahkan ke Login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;