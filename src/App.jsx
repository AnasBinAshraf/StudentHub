import './App.css'

function App() {
  return (
    <main>
      <header className="navbar">
        <a className="logo" href="/">
          StudentHub
        </a>

        <nav>
          <a href="#features">Features</a>
          <a className="login-link" href="#login">
            Log in
          </a>
          <a className="primary-button" href="#register">
            Get started
          </a>
        </nav>
      </header>

      <section className="hero">
        <p className="eyebrow">STUDENT PRODUCTIVITY, SIMPLIFIED</p>

        <h1>
          Stay organized.
          <br />
          Make progress.
        </h1>

        <p className="hero-text">
          StudentHub helps you manage tasks, keep notes, and track your academic
          progress in one place.
        </p>

        <div className="hero-actions">
          <a className="primary-button" href="#register">
            Create your account
          </a>
          <a className="secondary-button" href="#features">
            Explore features
          </a>
        </div>
      </section>

      <section id="features" className="features">
        <article>
          <h2>Tasks</h2>
          <p>Create tasks, set priorities and deadlines, and track completion.</p>
        </article>

        <article>
          <h2>Notes</h2>
          <p>Keep study notes organized and easy to find when you need them.</p>
        </article>

        <article>
          <h2>Dashboard</h2>
          <p>See your progress, pending tasks, and overdue work at a glance.</p>
        </article>
      </section>
    </main>
  )
}

export default App