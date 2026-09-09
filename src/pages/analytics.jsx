import { useEffect, useState } from "react";
import "../styles/analytics.css";

function Analytics() {
  const [tasks, setTasks] = useState([]);
  const [subjectGoals, setSubjectGoals] = useState([]);
  const [studySessions, setStudySessions] = useState([]);
  useEffect(() => {
    getTasks();
    getStudySessions();
    getSubjectGoals();
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

    } 
    catch (error) {
      console.log(error);
      alert("Failed to load tasks");
    }
  }

  async function getStudySessions() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/study", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setStudySessions(data);
    } 
    catch (error) {
      console.log(error);
      alert("Failed to load study sessions");
    }
  }

  async function getSubjectGoals() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/subject-goals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setSubjectGoals(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load subject goals");
    }
  }

  async function saveSubjectGoal(subject, goalMinutes) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/subject-goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject,
          goalMinutes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setSubjectGoals((prev) => {
        const existingGoal = prev.find(
          (goal) => goal.subject === subject
        );

        if (existingGoal) {
          return prev.map((goal) =>
            goal.subject === subject ? data : goal
          );
        }

        return [...prev, data];
      });

    } catch (error) {
      console.log(error);
      alert("Failed to save subject goal");
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

  const highTasks = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const mediumTasks = tasks.filter(
    (task) => task.priority === "Medium"
  ).length;

  const lowTasks = tasks.filter(
    (task) => task.priority === "Low"
  ).length;

  const today = new Date();
  const dayOfWeek = today.getDay();

  const monday = new Date(today);
  monday.setDate(
    today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
  );
  monday.setHours(0, 0, 0, 0);

  const weeklyStudy = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  };

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  studySessions.forEach((session) => {
    const sessionDate = new Date(session.date);

    if (sessionDate >= monday && sessionDate <= today) {
      const dayName = dayNames[sessionDate.getDay()];
      weeklyStudy[dayName] += session.duration;
    }
  });

  const subjectStudy = {};

  studySessions.forEach((session) => {
    const subject = session.subject || "General";

    if (!subjectStudy[subject]) {
      subjectStudy[subject] = 0;
    }

    subjectStudy[subject] += session.duration;
  });


  return (
    <div className="analytics-page">

      <header className="analytics-header">
        <div>
          <p className="analytics-greeting">
            See how you're doing 📊
          </p>

          <h1>Analytics</h1>

          <p className="analytics-subtitle">
            Track your tasks and productivity.
          </p>
        </div>
      </header>


      <section className="analytics-stats">

        <div className="analytics-card">
          <span>Total Tasks</span>
          <strong>{totalTasks}</strong>
        </div>

        <div className="analytics-card">
          <span>Completed</span>
          <strong>{completedTasks}</strong>
        </div>

        <div className="analytics-card">
          <span>Pending</span>
          <strong>{pendingTasks}</strong>
        </div>

        <div className="analytics-card">
          <span>Completion Rate</span>
          <strong>{completionRate}%</strong>
        </div>

      </section>


      <section className="analytics-section">

        <h2>Tasks by Priority</h2>

        <div className="priority-bars">

          <div className="priority-row">
            <div>
              <span>High</span>
              <strong>{highTasks}</strong>
            </div>

            <div className="bar">
              <div
                className="bar-fill high-bar"
                style={{
                  width: totalTasks === 0 ? "0%" : `${(highTasks / totalTasks) * 100}%`,
                }}
              />
            </div>
          </div>


          <div className="priority-row">
            <div>
              <span>Medium</span>
              <strong>{mediumTasks}</strong>
            </div>

            <div className="bar">
              <div
                className="bar-fill medium-bar"
                style={{
                 width: totalTasks === 0 ? "0%" : `${(mediumTasks / totalTasks) * 100}%`,
                }}
              />
            </div>
          </div>


          <div className="priority-row">
            <div>
              <span>Low</span>
              <strong>{lowTasks}</strong>
            </div>

            <div className="bar">
              <div
                className="bar-fill low-bar"
                style={{
                  width: totalTasks === 0 ? "0%" : `${(lowTasks / totalTasks) * 100}%`,
                }}
              />
            </div>
          </div>

        </div>

      </section>

      <section className="analytics-section">

        <h2>Study Time This Week</h2>

        <div className="study-week">

          {Object.entries(weeklyStudy).map(([day, minutes]) => {

            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;

            return (
              <div className="study-day" key={day}>

                <div className="study-day-info">
                  <span>{day}</span>

                  <strong>
                    {hours > 0 ? `${hours}h ` : ""}
                    {remainingMinutes > 0 ? `${remainingMinutes}m` : "0m"}
                  </strong>
                </div>

                <div className="study-bar">
                  <div
                    className="study-bar-fill"
                    style={{
                      width:
                        minutes === 0
                          ? "0%"
                          : `${Math.min((minutes / 180) * 100, 100)}%`,
                    }}
                  />
                </div>

              </div>
            );
          })}

        </div>

      </section>

      <section className="analytics-section">
        <h2>Study Time by Subject</h2>

        <div className="subject-study">
          {Object.entries(subjectStudy).length === 0 ? (
            <p>No study sessions recorded yet.</p>
          ) : (
            Object.entries(subjectStudy).sort((a, b) => b[1] - a[1])
              .map(([subject, minutes]) => {
                const goalData = subjectGoals.find(
                  (goal) => goal.subject === subject
                );

              const goalMinutes = goalData ? goalData.goalMinutes : 0;
              const progress =
              goalMinutes === 0
                ? 0
                : Math.min((minutes / goalMinutes) * 100, 100);
              const hours = Math.floor(minutes / 60);
              const remainingMinutes = minutes % 60;

              return (
                <div className="subject-row" key={subject}>
                  <div className="subject-info">
                    <span>{subject}</span>
                    <strong>
                      {hours > 0 ? `${hours}h ` : ""}
                      {remainingMinutes > 0 ? `${remainingMinutes}m` : "0m"}
                    </strong>
                  </div>

                  <div className="subject-bar">
                    <div
                      className="subject-bar-fill"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <div className="subject-progress">
                    <span>
                      {Math.floor(minutes / 60)}h {minutes % 60}m studied
                    </span>

                    <span>
                      Goal: {Math.floor(goalMinutes / 60)}h {goalMinutes % 60}m
                    </span>
                  </div>

                  <div className="subject-goal">
                    <input
                      type="number"
                      min="0"
                      placeholder="Goal in minutes"
                      defaultValue={goalMinutes}
                      id={`goal-${subject}`}
                    />

                    <button
                      onClick={() => {
                        const value = document.getElementById(`goal-${subject}`).value;

                        saveSubjectGoal(subject, Number(value));
                      }}
                    >
                      Set Goal
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>


      <section className="analytics-section">
        <h2>Productivity Insights</h2>

        <div className="insight">
          <h3>Completion Rate</h3>
          <p>
            You have completed {completionRate}% of your tasks.
            Keep working at the same pace to finish the remaining ones.
          </p>
        </div>

        <div className="insight">
          <h3>Priority Load</h3>
          <p>
            {highTasks} out of {totalTasks} tasks are high priority.
            Try finishing these before moving on to lower-priority work.
          </p>
        </div>

        <div className="insight">
          <h3>Current Focus</h3>
          <p>
            Your workload currently contains mostly{" "}
            {highTasks >= mediumTasks && highTasks >= lowTasks
              ? "high-priority"
              : mediumTasks >= lowTasks
              ? "medium-priority"
              : "low-priority"}{" "}
            tasks.
          </p>
        </div>
      </section>

    </div>
  );
}

export default Analytics;