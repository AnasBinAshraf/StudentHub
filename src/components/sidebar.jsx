import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
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
  );
}

export default Sidebar;