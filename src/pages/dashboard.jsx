import { useEffect, useState } from "react";
import "../styles/dashboard.css";

import StatCard from "../components/statcard";
import TaskItem from "../components/taskitem";
import ProgressCard from "../components/progresscard";
import DeadlineItem from "../components/deadlineitem";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setTasks(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load tasks");
    }
  }

  useEffect(() => {
    getNotes();
  }, []);

  async function getNotes() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setNotes(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load notes");
    }
  }

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  function getDaysRemaining(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const difference = due - today;

    return Math.ceil(difference / (1000 * 60 * 60 * 24));
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  }

  const totalNotes = notes.length;

  const today = new Date();

  const todayDate =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");

  const todayTasks = tasks.filter(
    (task) => task.dueDate === todayDate
  );

  return (
    <div className="dashboard-page">

      <header className="dashboard-header">

        <div>
          <p className="dashboard-greeting">
            Good morning 👋
          </p>

          <h1>
            Welcome back to StudentHub
          </h1>

          <p className="dashboard-subtitle">
            Here's what's happening with your studies today.
          </p>
        </div>

      </header>


      {/* Statistics */}

      <section className="stats-grid">

        <StatCard
          title="Today's Tasks"
          value={totalTasks}
          subtitle={`${completedTasks} completed`}
        />

        <StatCard
          title="Upcoming"
          value={pendingTasks}
          subtitle="Pending tasks"
        />

        <StatCard
          title="Notes"
          value={totalNotes}
          subtitle="Total notes"
        />

        <StatCard
          title="Productivity"
          value={`${completionRate}%`}
          subtitle="Task completion"
        />

      </section>


      {/* Tasks and Progress */}

      <section className="dashboard-grid">

        <div className="dashboard-card tasks-card">

          <div className="card-header">

            <div>
              <h2>Today's Tasks</h2>

              <p>
                Stay on top of your priorities.
              </p>
            </div>

            <a href="/tasks">
              View all
            </a>

          </div>


          {todayTasks.length === 0 ? (
            <p>No tasks due today. You're all caught up! 🎉</p>
          ) : (
            todayTasks.slice(0, 3).map((task) => (
              <TaskItem
                key={task._id}
                title={task.title}
                details={`Due today · ${task.priority} priority`}
              />
            ))
          )}

        </div>


        <ProgressCard percentage={78} />

      </section>


      {/* Upcoming Deadlines */}

      <section className="dashboard-card deadlines-card">

        <div className="card-header">

          <div>
            <h2>Upcoming Deadlines</h2>

            <p>
              Don't miss your important submissions.
            </p>
          </div>

          <a href="/calendar">
            View calendar
          </a>

        </div>


        <div className="deadline-list">

          {tasks
            .filter((task) => !task.completed && task.dueDate)
            .slice(0, 3)
            .map((task) => (
              <DeadlineItem
                key={task._id}
                title={task.title}
                date={formatDate(task.dueDate)}
                days={`${getDaysRemaining(task.dueDate)}${
                  getDaysRemaining(task.dueDate) === 1 ? "day" : "days"
                }`}
              />
            ))}

        </div>

      </section>

    </div>
  );
}

export default Dashboard;