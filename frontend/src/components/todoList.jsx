import React, { useState, useEffect, useCallback } from "react";
import taskService from "../services/taskService";
import TaskItem from "./taskItem/taskItem";
import Swal from "sweetalert2"; // Pastikan Swal terinstall untuk feedback

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null); // State baru untuk menyimpan ID yang sedang diedit

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

  // Fungsi untuk masuk ke mode Edit (Dipanggil dari TaskItem)
  const handleEditMode = (task) => {
    setEditingId(task._id);
    setInput(task.title); // Masukkan teks tugas ke input field
    // Scroll ke atas agar user sadar input sedang aktif (opsional)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      if (editingId) {
        // JIKA DALAM MODE EDIT
        await taskService.updateTask(editingId, { title: input });
        setEditingId(null);
        Swal.fire({
          icon: "success",
          title: "Tugas diperbarui",
          timer: 1000,
          showConfirmButton: false,
        });
      } else {
        // JIKA DALAM MODE TAMBAH
        await taskService.addTask(input);
      }

      setInput("");
      await loadTasks();
    } catch (error) {
      console.error("Error saving task:", error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal menyimpan perubahan",
      });
    }
  };

  // Fungsi batalkan edit
  const cancelEdit = () => {
    setEditingId(null);
    setInput("");
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
      {/* Header & Progress Bar (Tetap sama) */}
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
        <div className="flex items-center bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100">
          <p className="text-sm font-black text-blue-700">
            {progressPercentage}% Selesai
          </p>
        </div>
      </div>

      <div className="mb-8">
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner border border-slate-200/50">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      {/* 3. Input Section - Dinamis (Tambah / Edit) */}
      <form onSubmit={handleSubmit} className="relative mb-10 group">
        {editingId && (
          <div className="absolute -top-6 left-4 flex gap-2 items-center">
            <span className="text-[10px] font-bold text-amber-600 uppercase bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              Mode Edit Aktif
            </span>
            <button
              onClick={cancelEdit}
              className="text-[10px] font-bold text-slate-400 hover:text-red-500 underline">
              Batal
            </button>
          </div>
        )}

        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-10 group-focus-within:opacity-25 transition duration-500"></div>
        <div
          className={`relative flex items-center border rounded-[1.5rem] overflow-hidden transition-all shadow-sm ${editingId ? "bg-amber-50/50 border-amber-200" : "bg-slate-50 border-slate-200 focus-within:bg-white focus-within:border-blue-400"}`}>
          <div
            className={`pl-6 ${editingId ? "text-amber-500" : "text-slate-400"}`}>
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
            placeholder={
              editingId
                ? "Ubah tugas ini..."
                : "Tulis rencana hebatmu hari ini..."
            }
          />
          <button
            type="submit"
            className={`mr-3 px-6 py-3 rounded-xl transition-all active:scale-95 font-bold text-sm shadow-lg ${editingId ? "bg-amber-500 hover:bg-amber-600 shadow-amber-200 text-white" : "bg-slate-900 hover:bg-blue-600 shadow-slate-200 text-white"}`}>
            {editingId ? "Simpan" : "Tambah"}
          </button>
        </div>
      </form>

      {/* 4. Task List Container */}
      <div className="space-y-6">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-2">
          Daftar Tugas
        </h3>
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task._id}
                className="transform transition-all hover:-translate-y-1">
                {/* Kirim handleEditMode ke TaskItem */}
                <TaskItem
                  task={task}
                  onDelete={handleDelete}
                  onEdit={handleEditMode}
                />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-bold">Belum ada tugas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
