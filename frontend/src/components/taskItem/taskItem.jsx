import React from "react";

const TaskItem = React.memo(({ task, onDelete }) => {
  return (
    <div className="group flex items-center justify-between p-4 mb-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center gap-4">
        {/* Indikator Status dengan efek Glow */}
        <div className="relative">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="absolute inset-0 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-20"></div>
        </div>

        {/* Teks Tugas */}
        <div className="flex flex-col">
          <span className="text-gray-800 font-semibold tracking-wide group-hover:text-blue-600 transition-colors">
            {task.title || task.name || "Tugas tanpa judul"}
          </span>
          <span className="text-xs text-gray-400">Dibuat baru saja</span>
        </div>
      </div>

      {/* Tombol Hapus dengan icon 'X' sederhana */}
      <button
        onClick={() => onDelete(task._id)}
        className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-red-500 bg-red-50 rounded-xl opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all duration-200 shadow-inner">
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
  );
});

TaskItem.displayName = "TaskItem";

export default TaskItem;
