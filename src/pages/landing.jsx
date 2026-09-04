import { Link } from "react-router-dom";
import "../styles/landing.css";

function Landing() {
  return (
    <div className="landing-page">

      <nav className="navbar">
        <div className="logo">StudentHub</div>

        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register" className="nav-register">
            Register
          </Link>
        </div>
      </nav>

      <main>
        <section className="hero">
          <p className="eyebrow">Built for students</p>

          <h1>
            Manage your college life
            <br />
            in one place.
          </h1>

          <p className="hero-text">
            Organize your tasks, notes, deadlines and productivity
            without having everything scattered around.
          </p>

          <div className="hero-actions">
            <Link to="/register" className="primary-button">
              Get Started
            </Link>

            <Link to="/login" className="secondary-button">
              Login
            </Link>
          </div>
        </section>

        <section className="features">
          <div className="feature-card">
            <h2>Tasks</h2>
            <p>
              Add assignments, set priorities and keep track of
              what needs to be done.
            </p>
          </div>

          <div className="feature-card">
            <h2>Notes</h2>
            <p>
              Keep your important study notes and ideas organized
              in one place.
            </p>
          </div>

          <div className="feature-card">
            <h2>Calendar</h2>
            <p>
              Keep track of upcoming deadlines and important dates.
            </p>
          </div>

          <div className="feature-card">
            <h2>Analytics</h2>
            <p>
              See your completed tasks and get a simple view of
              your productivity.
            </p>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p>StudentHub — Built for students.</p>
      </footer>

    </div>
  );
}

export default Landing;