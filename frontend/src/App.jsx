import { Routes, Route } from "react-router-dom";
import TodoList from "./components/todoList";

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<TodoList />} />
      </Routes>
    </div>
  );
};

export default App;
