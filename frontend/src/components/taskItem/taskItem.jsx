import React from "react";

const TaskItem = React.memo(({ task, onDelete, onEdit, onToggle }) => {
  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 mb-3 bg-white border border-slate-100 rounded-[1.5rem] md:rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 gap-4">
      {/* Status & Judul */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <button
          onClick={onToggle}
          className="relative shrink-0 focus:outline-none">
          <div
            className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 transition-all flex items-center justify-center ${task.completed ? "bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-100" : "bg-white border-slate-200"}`}>
            {task.completed && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 md:h-4 md:w-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          {!task.completed && (
            <div className="absolute inset-0 w-full h-full rounded-full animate-ping opacity-20 bg-blue-400"></div>
          )}
        </button>

        <div className="flex flex-col overflow-hidden">
          <span
            className={`font-bold truncate text-sm md:text-base ${task.completed ? "text-slate-400 line-through" : "text-slate-800 group-hover:text-blue-600"}`}>
            {task.title || "Tugas tanpa judul"}
          </span>
          <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
            {task.completed ? "Selesai ✨" : "In Progress"}
          </span>
        </div>
      </div>

      {/* Actions - Auto-hidden on desktop, Full width on mobile */}
      <div className="flex items-center gap-2 w-full sm:w-auto sm:opacity-0 sm:group-hover:opacity-100 transition-all sm:translate-x-4 sm:group-hover:translate-x-0">
        <button
          onClick={() => onEdit(task)}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 h-9 md:h-10 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 hover:bg-amber-500 hover:text-white rounded-xl border border-amber-100 transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <span>Edit</span>
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 h-9 md:h-10 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl border border-red-100 transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <span>Hapus</span>
        </button>
      </div>
    </div>
  );
});

TaskItem.displayName = "TaskItem";
export default TaskItem;
