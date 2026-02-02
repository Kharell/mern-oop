import React, { useState, useEffect, useCallback } from "react";
import taskService from "../services/taskService";
import TaskItem from "./taskItem/taskItem";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // 1. Fungsi load data yang stabil (useCallback mencegah infinite loop)
  const loadTasks = useCallback(async () => {
    try {
      const response = await taskService.fetchTasks();
      setTasks(response.data || []);
    } catch (error) {
      console.error(
        "Gagal memuat tugas / periksa server BE anda dan pastikan sudah jalan",
        error.message,
      );
    }
  }, []);

  // 2. Sinkronisasi data saat komponen dimuat pertama kali
  useEffect(() => {
    const init = async () => {
      await loadTasks();
    };
    init();
  }, [loadTasks]);

  // 3. Handler Tambah Tugas
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    try {
      await taskService.addTask(input);
      setInput("");
      await loadTasks(); // Refresh list
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  // 4. Handler Hapus Tugas yang stabil untuk dikirim ke child component
  const handleDelete = useCallback(
    async (id) => {
      try {
        await taskService.removeTask(id);
        await loadTasks(); // Refresh list
      } catch (error) {
        console.error("Error deleting task:", error.message);
      }
    },
    [loadTasks],
  );

  // 5. Logika Progress Bar (Menghitung persentase tugas selesai)
  const completedTasks = tasks.filter((t) => t.completed).length;
  const progressPercentage =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 font-sans text-slate-900">
      <div className="max-w-md mx-auto">
        {/* Header Section */}
        <header className="mb-8 flex justify-between items-end px-2">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Halo! 👋
            </h1>
            <p className="text-slate-500 font-medium">
              Kamu punya {tasks.length - completedTasks} tugas hari ini.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              OOP Project
            </span>
          </div>
        </header>

        {/* Progress Section */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-slate-700">
              Progress Kerja
            </span>
            <span className="text-sm font-black text-blue-600">
              {progressPercentage}%
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>

        {/* Input Section (Floating Action Style) */}
        <div className="bg-white p-2 rounded-2rem shadow-xl shadow-blue-100/50 border border-slate-50 mb-8">
          <form onSubmit={handleAdd} className="flex items-center">
            <input
              className="flex-1 px-6 py-4 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tambah tugas baru..."
            />
            <button
              type="submit"
              className="m-1.5 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-all active:scale-90 shadow-lg shadow-blue-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </form>
        </div>

        {/* Task List Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2 mb-2">
            <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">
              Daftar Kerja
            </h2>
          </div>

          <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-2 custom-scrollbar">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskItem key={task._id} task={task} onDelete={handleDelete} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 bg-white rounded-[2.5rem] border border-slate-50 shadow-sm">
                <span className="text-4xl mb-4">✨</span>
                <p className="text-slate-400 font-medium text-sm">
                  Semua beres! Waktunya istirahat.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
