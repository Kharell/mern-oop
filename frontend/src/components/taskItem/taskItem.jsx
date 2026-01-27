// ini adalah presentational component untuk menampilkan item tugas

const TaskItem = ({ task, onDelete }) => {
  return (
    <div className=" flex items-center justify-between p-4 mb-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex itmes-center gap-3">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <span className="text-gray-700 font-medium"></span>
      </div>
      <button
        onClick={() => onDelete(task._id)}
        className="px3 py-1 text-sm font-semibold text-red-500 bg-red-50 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
        Hapus
      </button>
    </div>
  );
};

export default TaskItem;
