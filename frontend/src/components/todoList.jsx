import React, { useState, useEffect, useCallback } from "react";
import taskService from "../services/taskService";
import TaskItem from "./taskItem/taskItem";
import Swal from "sweetalert2";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await taskService.fetchTasks();
      setTasks(response.data || []);
    } catch (error) {
      console.error("Gagal memuat tugas", error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleEditMode = (task) => {
    setEditingId(task._id);
    setInput(task.title);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      if (editingId) {
        await taskService.updateTask(editingId, { title: input });
        setEditingId(null);
        Swal.fire({
          icon: "success",
          title: "Berhasil diperbarui",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
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
        title: "Koneksi Terputus",
        text: "Gagal menghubungi server.",
        confirmButtonColor: "#3b82f6",
      });
    }
  };

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
        title: "Hapus tugas?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#94a3b8",
        confirmButtonText: "Ya, Hapus!",
        customClass: { popup: "rounded-[2rem]" },
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
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6 lg:p-0 mb-20">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-12 gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight italic">
            My Focus <span className="text-blue-600">.</span>
          </h2>
          <div className="text-slate-500 text-xs md:text-sm font-semibold flex items-center justify-center sm:justify-start gap-2">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            {tasks.length - completedTasks} tugas tersisa
          </div>
        </div>

        <div className="relative group flex justify-center sm:block">
          <div className="relative flex items-center bg-white px-4 md:px-5 py-2 md:py-3 rounded-2xl border border-slate-100 shadow-sm">
            <div className="mr-3 md:mr-4 text-right">
              <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Progress
              </p>
              <p className="text-base md:text-lg font-black text-blue-600">
                {progressPercentage}%
              </p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[3px] border-slate-100 border-t-blue-600 flex items-center justify-center bg-slate-50 text-[9px] md:text-[10px] font-black text-blue-600">
              GO
            </div>
          </div>
        </div>
      </header>

      {/* Form Input - FIXED FOR MOBILE */}
      <section className="relative mb-10 md:mb-14">
        <form onSubmit={handleSubmit} className="relative z-10 group">
          {editingId && (
            <div className="absolute -top-8 left-2 flex items-center gap-3">
              <span className="text-[9px] font-black text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-200">
                REVISI
              </span>
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setInput("");
                }}
                className="text-[10px] font-bold text-slate-400 underline">
                Batal
              </button>
            </div>
          )}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[1.6rem] md:rounded-[2.2rem] blur opacity-10 transition duration-500"></div>
          <div
            className={`relative flex items-center border p-1 rounded-[1.5rem] md:rounded-[2rem] bg-white transition-all ${editingId ? "border-amber-300 shadow-xl" : "border-slate-200 focus-within:border-blue-500 shadow-lg"}`}>
            <input
              type="text"
              className="flex-1 min-w-0 px-4 md:px-7 py-3 md:py-4 bg-transparent outline-none text-slate-700 font-bold text-sm md:text-lg"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={editingId ? "Revisi..." : "Tugas baru..."}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className={`flex-shrink-0 px-5 md:px-9 py-3 md:py-4 rounded-[1.1rem] md:rounded-[1.4rem] font-black text-[10px] md:text-xs uppercase tracking-widest text-white shadow-lg transition-all active:scale-95 ${editingId ? "bg-amber-500" : "bg-slate-900 hover:bg-blue-600"}`}>
              {editingId ? "Update" : "Tambah"}
            </button>
          </div>
        </form>
      </section>

      {/* Task List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2 text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">
          <span>Timeline / {tasks.length}</span>
          <div className="h-px flex-1 mx-4 md:mx-6 bg-slate-100"></div>
        </div>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1 md:pr-2 custom-scrollbar pb-10">
          {isLoading ? (
            <div className="text-center py-20 animate-pulse text-slate-400 italic">
              Menghubungkan...
            </div>
          ) : tasks.length > 0 ? (
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
            <div className="py-16 text-center bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
              <div className="text-3xl mb-4">🎯</div>
              <p className="text-slate-500 font-black">Semua tugas selesai!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TodoList;
