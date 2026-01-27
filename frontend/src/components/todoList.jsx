// fe/src/components/TodoList.jsx
import React, { useState, useEffect, useCallback } from "react";
import taskService from "../services/taskService";
import TaskItem from "./taskItem/taskItem";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // 1. Gunakan useCallback agar fungsi tidak dibuat ulang setiap render
  const loadTasks = useCallback(async () => {
    try {
      const response = await taskService.fetchTasks();
      // Menggunakan response.data dan memberikan default array [] jika null
      setTasks(response.data || []);
    } catch (error) {
      // Menggunakan variabel 'error' agar tidak ada warning unused variable
      console.error("Error loading tasks:", error.message);
    }
  }, []);

  // 2. Sekarang loadTasks aman dimasukkan ke dalam dependency array
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await taskService.addTask(input);
      setInput("");
      loadTasks();
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          OOP Task <span className="text-blue-600">Manager</span>
        </h1>

        {/* Form Input */}
        <form onSubmit={handleAdd} className="flex gap-2 mb-8">
          <input
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ada rencana apa hari ini?"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95">
            Tambah
          </button>
        </form>

        {/* List Tugas */}
        <div className="space-y-1">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onDelete={(id) => taskService.removeTask(id).then(loadTasks)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10 italic">
              Belum ada tugas. Santai dulu! ☕
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
