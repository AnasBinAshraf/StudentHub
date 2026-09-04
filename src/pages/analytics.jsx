import "../styles/analytics.css";

function Analytics() {
  const tasks = [
    {
      title: "Machine Learning Assignment",
      priority: "High",
      completed: true,
    },
    {
      title: "Computer Networks Notes",
      priority: "Medium",
      completed: true,
    },
    {
      title: "DAA Problems",
      priority: "High",
      completed: false,
    },
    {
      title: "Database Assignment",
      priority: "Low",
      completed: false,
    },
    {
      title: "AI Lab Work",
      priority: "Medium",
      completed: true,
    },
  ];

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
                  width: `${(highTasks / totalTasks) * 100}%`,
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
                  width: `${(mediumTasks / totalTasks) * 100}%`,
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
                  width: `${(lowTasks / totalTasks) * 100}%`,
                }}
              />
            </div>
          </div>

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