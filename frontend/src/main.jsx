import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; 
import TodoList from "./components/todoList"; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Kita langsung merender TodoList sebagai halaman utama */}
    <TodoList />
  </StrictMode>,
);
