import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoList from "./components/todoList";

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        {/* 1. Halaman Awal: Arahkan otomatis ke Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* 2. Rute Login */}
        <Route path="/login" element={<Login />} />

        {/* 3. Rute Register */}
        <Route path="/register" element={<Register />} />

        {/* 4. Rute Dashboard (TodoList) */}
        <Route path="/dashboard" element={<TodoList />} />

        {/* 5. Pelindung: Jika user ngetik asal di URL, arahkan ke Login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
