import { useEffect, useState } from "react";
import "../styles/dashboard.css";

import StatCard from "../components/statcard";
import TaskItem from "../components/taskitem";
import ProgressCard from "../components/progresscard";
import DeadlineItem from "../components/deadlineitem";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [studyTime, setStudyTime] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState(0);

  useEffect(() => {
    getTasks();
    getStudyData();
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

  async function getStudyData() {
    try {
      const token = localStorage.getItem("token");

      const studyResponse = await fetch(
        "http://localhost:5000/study",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const studyData = await studyResponse.json();

      const goalResponse = await fetch(
        "http://localhost:5000/study-goal",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const goalData = await goalResponse.json();

      const today = new Date();

      const day = today.getDay();

      const monday = new Date(today);
      monday.setDate(
        today.getDate() - (day === 0 ? 6 : day - 1)
      );
      monday.setHours(0, 0, 0, 0);

      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      sunday.setHours(23, 59, 59, 999);

      const weeklySessions = studyData.filter((session) => {
        const sessionDate = new Date(session.date);

        return (
          sessionDate >= monday &&
          sessionDate <= sunday
        );
      });

      const total = weeklySessions.reduce(
        (sum, session) => sum + session.duration,
        0
      );

      setStudyTime(total);
      setWeeklyGoal((goalData?.weeklyGoal || 0)*60);

    } catch (error) {
      console.log(error);
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

  const taskScore =
    totalTasks === 0
      ? 0
      : (completedTasks / totalTasks) * 40;

  const studyScore =
    weeklyGoal === 0
      ? 0
      : Math.min((studyTime / weeklyGoal) * 40, 40);

  const notesScore = totalNotes > 0 ? 10 : 0;

  const goalScore = weeklyGoal > 0 ? 10 : 0;

  const productivity =
    taskScore +
    studyScore +
    notesScore +
    goalScore;

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
          value={`${Math.round(productivity)}%`}
          subtitle="Overall performance"
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


        <ProgressCard
          studyTime={studyTime}
          weeklyGoal={weeklyGoal}
        />

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