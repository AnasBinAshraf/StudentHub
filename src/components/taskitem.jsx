function TaskItem({ title, details }) {
  return (
    <div className="task-item">

      <div>
        <h3>{title}</h3>
        <p>{details}</p>
      </div>

      <input type="checkbox" />

    </div>
  );
}

export default TaskItem;