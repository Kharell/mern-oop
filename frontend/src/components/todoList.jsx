import React, { useState, useEffect, useCallback } from "react";
import taskService from "../services/taskService";
import TaskItem from "./taskItem/taskItem";
import Swal from "sweetalert2";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);

  const loadTasks = useCallback(async () => {
    try {
      const response = await taskService.fetchTasks();
      // Pastikan mengambil data sesuai struktur response BaseController
      setTasks(response.data || []);
    } catch (error) {
      console.error("Gagal memuat tugas", error.message);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Masuk ke Mode Edit
  const handleEditMode = (task) => {
    setEditingId(task._id);
    setInput(task.title); // Isi input dengan judul tugas yang lama
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Kirim data (Tambah atau Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      if (editingId) {
        // API Update: Mengirim field 'title' sesuai Backend taskController
        await taskService.updateTask(editingId, { title: input });
        setEditingId(null);
        Swal.fire({
          icon: "success",
          title: "Tugas diperbarui",
          timer: 1000,
          showConfirmButton: false,
        });
      } else {
        await taskService.addTask(input);
      }

      setInput("");
      await loadTasks();
    } catch (error) {
      console.error("Gagal menyimpan:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Pastikan koneksi BE menyala",
      });
    }
  };

  // Fitur Cepat: Klik status untuk menyelesaikan tugas
  const handleToggleComplete = async (task) => {
    try {
      await taskService.updateTask(task._id, { completed: !task.completed });
      await loadTasks();
    } catch (error) {
      console.error("Gagal update status:", error);
    }
  };

  const handleDelete = useCallback(
    async (id) => {
      const result = await Swal.fire({
        title: "Hapus Tugas?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Ya, Hapus!",
      });

      if (result.isConfirmed) {
        try {
          await taskService.removeTask(id);
          await loadTasks();
        } catch (error) {
          console.error("Error deleting task:", error.message);
        }
      }
    },
    [loadTasks],
  );

  const completedTasks = tasks.filter((t) => t.completed).length;
  const progressPercentage =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return (
    <div className="w-full animate-in fade-in duration-700">
      {/* 1. Header & Progress */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Tugas Harian 👋
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Tersisa{" "}
            <span className="text-blue-600 font-bold">
              {tasks.length - completedTasks}
            </span>{" "}
            tugas lagi.
          </p>
        </div>
        <div className="flex items-center bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100 shadow-sm">
          <div className="w-8 h-8 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin-slow mr-3"></div>
          <p className="text-sm font-black text-blue-700">
            {progressPercentage}% Selesai
          </p>
        </div>
      </div>

      {/* 2. Input Form (Dinamis: Tambah/Edit) */}
      <form onSubmit={handleSubmit} className="relative mb-10 group">
        {editingId && (
          <div className="absolute -top-7 left-4 flex items-center gap-2">
            <span className="text-[10px] font-black text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200 animate-bounce">
              MODE EDIT AKTIF
            </span>
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setInput("");
              }}
              className="text-[10px] font-bold text-slate-400 hover:text-red-500 underline uppercase">
              Batal
            </button>
          </div>
        )}

        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-10 group-focus-within:opacity-30 transition duration-500"></div>
        <div
          className={`relative flex items-center border rounded-[1.5rem] overflow-hidden transition-all duration-300 ${editingId ? "bg-amber-50/50 border-amber-300" : "bg-slate-50 border-slate-200 focus-within:bg-white focus-within:border-blue-400"}`}>
          <input
            type="text"
            className="flex-1 px-8 py-5 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-bold"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              editingId ? "Revisi tugasmu..." : "Apa rencana hebatmu hari ini?"
            }
          />
          <button
            type="submit"
            className={`mr-3 px-8 py-3 rounded-xl transition-all active:scale-95 font-black text-xs uppercase tracking-widest shadow-lg ${editingId ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-slate-900 hover:bg-blue-600 text-white"}`}>
            {editingId ? "Update" : "Simpan"}
          </button>
        </div>
      </form>

      {/* 3. Task List */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-2">
          Daftar Pekerjaan
        </h3>
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onDelete={handleDelete}
                onEdit={handleEditMode}
                onToggle={() => handleToggleComplete(task)}
              />
            ))
          ) : (
            <div className="py-20 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
              <span className="text-4xl block mb-2">🚀</span>
              <p className="text-slate-400 font-bold">
                List masih kosong, ayo produktif!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
