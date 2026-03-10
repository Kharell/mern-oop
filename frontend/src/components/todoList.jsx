import React, { useState, useEffect, useCallback } from "react";
import taskService from "../services/taskService";
import TaskItem from "./taskItem/taskItem";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const loadTasks = useCallback(async () => {
    try {
      const response = await taskService.fetchTasks();
      setTasks(response.data || []);
    } catch (error) {
      console.error("Gagal memuat tugas", error.message);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    try {
      await taskService.addTask(input);
      setInput("");
      await loadTasks();
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  const handleDelete = useCallback(
    async (id) => {
      try {
        await taskService.removeTask(id);
        await loadTasks();
      } catch (error) {
        console.error("Error deleting task:", error.message);
      }
    },
    [loadTasks],
  );

  const completedTasks = tasks.filter((t) => t.completed).length;
  const progressPercentage =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return (
    <div className="w-full animate-in fade-in duration-700">
      {/* 1. Header Section Inside Todo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Tugas Harian 👋
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Kamu memiliki{" "}
            <span className="text-blue-600 font-bold">
              {tasks.length - completedTasks}
            </span>{" "}
            tugas tersisa.
          </p>
        </div>

        {/* Progress Circle/Badge Style */}
        <div className="flex items-center bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100">
          <div className="mr-3">
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
              Productivity
            </p>
            <p className="text-sm font-black text-blue-700">
              {progressPercentage}% Selesai
            </p>
          </div>
          <div className="w-10 h-10 rounded-full border-4 border-blue-200 border-t-blue-600 flex items-center justify-center text-[10px] font-bold text-blue-600 bg-white">
            {progressPercentage}%
          </div>
        </div>
      </div>

      {/* 2. Progress Bar - Slim & Modern */}
      <div className="mb-8">
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner border border-slate-200/50">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      {/* 3. Input Section - Glassmorphism Style */}
      <form onSubmit={handleAdd} className="relative mb-10 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-10 group-focus-within:opacity-25 transition duration-500"></div>
        <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-[1.5rem] overflow-hidden focus-within:border-blue-400 focus-within:bg-white transition-all shadow-sm">
          <div className="pl-6 text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="flex-1 px-4 py-5 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-semibold"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tulis rencana hebatmu hari ini..."
          />
          <button
            type="submit"
            className="mr-3 px-6 py-3 bg-slate-900 hover:bg-blue-600 text-white rounded-xl transition-all active:scale-95 font-bold text-sm shadow-lg shadow-slate-200">
            Tambah
          </button>
        </div>
      </form>

      {/* 4. Task List Container */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
            Daftar Tugas
          </h3>
          <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-md font-bold">
            {tasks.length} Total
          </span>
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task._id}
                className="transform transition-all hover:-translate-y-1">
                <TaskItem task={task} onDelete={handleDelete} />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-3xl mb-4 border border-slate-100">
                ✨
              </div>
              <p className="text-slate-400 font-bold">Belum ada tugas.</p>
              <p className="text-slate-300 text-xs mt-1">
                Mulai hari dengan menambah tugas baru!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tambahkan CSS Internal untuk Scrollbar */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `,
        }}
      />
    </div>
  );
};

export default TodoList;
