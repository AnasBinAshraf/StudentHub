import "../styles/dashboard.css";

import StatCard from "../components/statcard";
import TaskItem from "../components/taskitem";
import ProgressCard from "../components/progresscard";
import DeadlineItem from "../components/deadlineitem";

function Dashboard() {
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

        <button className="add-task-button">
          + Add Task
        </button>

      </header>


      {/* Statistics */}

      <section className="stats-grid">

        <StatCard
          title="Today's Tasks"
          value="8"
          subtitle="3 completed"
        />

        <StatCard
          title="Upcoming"
          value="5"
          subtitle="Due this week"
        />

        <StatCard
          title="Notes"
          value="24"
          subtitle="Total notes"
        />

        <StatCard
          title="Productivity"
          value="78%"
          subtitle="↑ 12% this week"
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


          <TaskItem
            title="Complete Machine Learning assignment"
            details="Due today · High priority"
          />

          <TaskItem
            title="Review Computer Networks notes"
            details="Due today · Medium priority"
          />

          <TaskItem
            title="Practice DAA problems"
            details="Due tomorrow · Low priority"
          />

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

          <DeadlineItem
            title="AI/ML Project Report"
            date="September 8"
            days="4 days"
          />

          <DeadlineItem
            title="Database Assignment"
            date="September 11"
            days="7 days"
          />

          <DeadlineItem
            title="DAA Internal Test"
            date="September 15"
            days="11 days"
          />

        </div>

      </section>

    </div>
  );
}

export default Dashboard;