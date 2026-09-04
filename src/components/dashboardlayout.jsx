import { NavLink, Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">

      <aside className="sidebar">

        <div className="sidebar-logo">
          <h2>StudentHub</h2>
        </div>

        <nav className="sidebar-nav">

          <NavLink to="/dashboard">
            Dashboard
          </NavLink>

          <NavLink to="/tasks">
            Tasks
          </NavLink>

          <NavLink to="/calendar">
            Calendar
          </NavLink>

          <NavLink to="/notes">
            Notes
          </NavLink>

          <NavLink to="/analytics">
            Analytics
          </NavLink>

        </nav>

        <div className="sidebar-bottom">
          <button>Logout</button>
        </div>

      </aside>

      <main className="dashboard-content">
        <Outlet />
      </main>

    </div>
  );
}

export default DashboardLayout;