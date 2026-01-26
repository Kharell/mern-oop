// ini adalah presentational component untuk menampilkan item tugas

const TaskItem = ({ task, onDelete }) => {
  return (
    <li
      style={{
        marginTop: "10px",
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #ccc",
        paddingBottom: "5px",
      }}>
      <span>{task.title}</span>
      <button
        onClick={() => onDelete(task.id)}
        style={{
          color: "white",
          background: "red",
          border: "none",
          cursor: "pointer",
        }}>
        Hapus
      </button>
    </li>
  );
};


export default TaskItem;