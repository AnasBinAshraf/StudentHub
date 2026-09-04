import { useState } from "react";
import "../styles/tasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete Machine Learning assignment",
      description: "Finish the pending questions and submit the assignment.",
      priority: "High",
      dueDate: "September 8",
      completed: false,
    },
    {
      id: 2,
      title: "Review Computer Networks notes",
      description: "Revise Unit 2 before the next class.",
      priority: "Medium",
      dueDate: "September 9",
      completed: false,
    },
    {
      id: 3,
      title: "Practice DAA problems",
      description: "Solve 5 problems on dynamic programming.",
      priority: "Low",
      dueDate: "September 10",
      completed: true,
    },
  ]);
  const [showModal, setShowModal] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
  });
   
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Completed" && task.completed) ||
      (filter === "Pending" && !task.completed) ||
      task.priority === filter;

    return matchesSearch && matchesFilter;
  });

  function addTask() {
  if (!newTask.title.trim()) {
    return;
  }

  const task = {
    id: Date.now(),
    title: newTask.title,
    description: newTask.description,
    dueDate: newTask.dueDate,
    priority: newTask.priority,
    completed: false,
  };

  setTasks([...tasks, task]);

  setNewTask({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
  });

  setShowModal(false);
}
function openEditModal(task) {
  setEditingTask({
    ...task,
  });

  setShowEditModal(true);
}
function updateTask() {
  if (!editingTask.title.trim()) {
    return;
  }

  setTasks(
    tasks.map((task) =>
      task.id === editingTask.id
        ? editingTask
        : task
    )
  );

  setShowEditModal(false);
  setEditingTask(null);
}
  return (
    <div className="tasks-page">

      <header className="tasks-header">
        <div>
          <p className="tasks-greeting">Stay organized 📚</p>

          <h1>My Tasks</h1>

          <p className="tasks-subtitle">
            Manage your assignments, deadlines and daily priorities.
          </p>
        </div>

        <button
            className="add-task-button"
            onClick={() => setShowModal(true)}
        >
            + Add Task
        </button>
      </header>


      <section className="tasks-toolbar">

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="task-filters">

          <button
            className={filter === "All" ? "active" : ""}
            onClick={() => setFilter("All")}
          >
            All
          </button>

          <button
            className={filter === "Pending" ? "active" : ""}
            onClick={() => setFilter("Pending")}
          >
            Pending
          </button>

          <button
            className={filter === "Completed" ? "active" : ""}
            onClick={() => setFilter("Completed")}
          >
            Completed
          </button>

          <button
            className={filter === "High" ? "active" : ""}
            onClick={() => setFilter("High")}
          >
            High
          </button>

        </div>

      </section>


      <section className="tasks-list">

        {filteredTasks.length === 0 ? (
          <div className="empty-tasks">
            <h2>No tasks found</h2>
            <p>Try changing your search or filter.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              className={`task-card ${
                task.completed ? "completed" : ""
              }`}
              key={task.id}
            >

              <div className="task-check">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
              </div>


              <div className="task-content">

                <h3>{task.title}</h3>

                <p>{task.description}</p>

                <div className="task-meta">

                  <span className={`priority ${task.priority.toLowerCase()}`}>
                    {task.priority} Priority
                  </span>

                  <span className="task-date">
                    📅 {task.dueDate}
                  </span>

                </div>

              </div>

                <div className="task-actions">

                    <button
                        className="edit-task"
                        onClick={() => openEditModal(task)}
                    >
                        ✏️
                    </button>

                    <button
                        className="delete-task"
                        onClick={() => deleteTask(task.id)}
                    >
                        🗑️
                    </button>

                </div>

            </div>
          ))
        )}

      </section>
    {showModal && (
  <div className="modal-overlay">

    <div className="task-modal">

      <div className="modal-header">
        <div>
          <h2>Add New Task</h2>
          <p>Create a task and keep your studies organized.</p>
        </div>

        <button
          className="close-modal"
          onClick={() => setShowModal(false)}
        >
          ✕
        </button>
      </div>


      <div className="form-group">
        <label>Task Title</label>

        <input
          type="text"
          placeholder="e.g. Complete DBMS assignment"
          value={newTask.title}
          onChange={(e) =>
            setNewTask({
              ...newTask,
              title: e.target.value,
            })
          }
        />
      </div>


      <div className="form-group">
        <label>Description</label>

        <textarea
          placeholder="Add some details about this task..."
          value={newTask.description}
          onChange={(e) =>
            setNewTask({
              ...newTask,
              description: e.target.value,
            })
          }
        />
      </div>


      <div className="form-row">

        <div className="form-group">
          <label>Due Date</label>

          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                dueDate: e.target.value,
              })
            }
          />
        </div>


        <div className="form-group">
          <label>Priority</label>

          <select
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                priority: e.target.value,
              })
            }
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

      </div>


      <div className="modal-actions">

        <button
          className="cancel-button"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>

        <button
          className="create-task-button"
          onClick={addTask}
        >
          Add Task
        </button>

      </div>

    </div>

  </div>
)}
{showEditModal && editingTask && (
  <div className="modal-overlay">

    <div className="task-modal">

      <div className="modal-header">

        <div>
          <h2>Edit Task</h2>

          <p>
            Update the details of your task.
          </p>
        </div>

        <button
          className="close-modal"
          onClick={() => {
            setShowEditModal(false);
            setEditingTask(null);
          }}
        >
          ✕
        </button>

      </div>


      <div className="form-group">

        <label>Task Title</label>

        <input
          type="text"
          value={editingTask.title}
          onChange={(e) =>
            setEditingTask({
              ...editingTask,
              title: e.target.value,
            })
          }
        />

      </div>


      <div className="form-group">

        <label>Description</label>

        <textarea
          value={editingTask.description}
          onChange={(e) =>
            setEditingTask({
              ...editingTask,
              description: e.target.value,
            })
          }
        />

      </div>


      <div className="form-row">

        <div className="form-group">

          <label>Due Date</label>

          <input
            type="date"
            value={editingTask.dueDate}
            onChange={(e) =>
              setEditingTask({
                ...editingTask,
                dueDate: e.target.value,
              })
            }
          />

        </div>


        <div className="form-group">

          <label>Priority</label>

          <select
            value={editingTask.priority}
            onChange={(e) =>
              setEditingTask({
                ...editingTask,
                priority: e.target.value,
              })
            }
          >

            <option value="Low">
              Low
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="High">
              High
            </option>

          </select>

        </div>

      </div>


      <div className="modal-actions">

        <button
          className="cancel-button"
          onClick={() => {
            setShowEditModal(false);
            setEditingTask(null);
          }}
        >
          Cancel
        </button>

        <button
          className="create-task-button"
          onClick={updateTask}
        >
          Save Changes
        </button>

      </div>

    </div>

  </div>
)}
    </div>
  );
}

export default Tasks;