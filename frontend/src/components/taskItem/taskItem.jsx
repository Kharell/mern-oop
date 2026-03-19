import React from "react";

const TaskItem = React.memo(({ task, onDelete, onEdit }) => {
  return (
    <div className="group flex items-center justify-between p-5 mb-3 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center gap-5">
        {/* Indikator Status dengan efek Glow & Warna Dinamis */}
        <div className="relative shrink-0">
          <div
            className={`w-3 h-3 rounded-full ${task.completed ? "bg-emerald-500" : "bg-blue-500"}`}></div>
          <div
            className={`absolute inset-0 w-3 h-3 rounded-full animate-ping opacity-25 ${task.completed ? "bg-emerald-400" : "bg-blue-400"}`}></div>
        </div>

        {/* Teks Tugas */}
        <div className="flex flex-col overflow-hidden">
          <span
            className={`font-bold tracking-tight transition-colors truncate ${
              task.completed
                ? "text-slate-400 line-through"
                : "text-slate-800 group-hover:text-blue-600"
            }`}>
            {task.title || "Tugas tanpa judul"}
          </span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
            {task.completed ? "Selesai ✨" : "Sedang Berjalan"}
          </span>
        </div>
      </div>

      {/* Action Buttons Area */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
        {/* Tombol EDIT - Warna Amber/Orange */}
        <button
          onClick={() => onEdit(task)}
          className="flex items-center justify-center w-10 h-10 text-amber-500 bg-amber-50 hover:bg-amber-500 hover:text-white rounded-xl transition-all duration-200 shadow-sm border border-amber-100"
          title="Edit Tugas">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
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
          Edit
        </button>

        {/* Tombol HAPUS - Warna Merah */}
        <button
          onClick={() => onDelete(task._id)}
          className="flex items-center gap-2 px-4 h-10 text-xs font-black uppercase tracking-widest text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-200 shadow-sm border border-red-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Hapus
        </button>
      </div>
    </div>
  );
});

TaskItem.displayName = "TaskItem";

export default TaskItem;
