import "../styles/about.css";

function About() {
  return (
    <div className="about-page">

      <div className="about-header">
        <h1>About StudentHub</h1>
        <p>
          Everything you need to know about how StudentHub works.
        </p>
      </div>

      <section className="about-card about-intro">
        <h2>What is StudentHub?</h2>
        <p>
          StudentHub is a student productivity platform designed to help
          you organize your academic work, track your study time and
          understand your progress.
        </p>

        <div className="about-flow">
          <span>Plan</span>
          <span>→</span>
          <span>Study</span>
          <span>→</span>
          <span>Track</span>
          <span>→</span>
          <span>Improve</span>
        </div>
      </section>

      <section className="about-section">
        <h2>Features</h2>

        <div className="feature-grid">

          <div className="about-card">
            <h3>📋 Tasks</h3>
            <p>
              Create and manage academic tasks, priorities and deadlines.
            </p>
          </div>

          <div className="about-card">
            <h3>📅 Calendar</h3>
            <p>
              Keep track of upcoming deadlines and important academic dates.
            </p>
          </div>

          <div className="about-card">
            <h3>📝 Notes</h3>
            <p>
              Store important study notes in one organized place.
            </p>
          </div>

          <div className="about-card">
            <h3>⏱ Study Time</h3>
            <p>
              Record study sessions and monitor your weekly study goal.
            </p>
          </div>

          <div className="about-card">
            <h3>🍅 Pomodoro</h3>
            <p>
              Use focused study sessions and short breaks to stay productive.
            </p>
          </div>

          <div className="about-card">
            <h3>📊 Analytics</h3>
            <p>
              Understand your study habits and productivity through data.
            </p>
          </div>

        </div>
      </section>

      <section className="about-section">

        <h2>How Productivity is Calculated</h2>

        <div className="about-card productivity-card">

          <p>
            StudentHub combines different areas of your academic activity
            instead of measuring productivity only through completed tasks.
          </p>

          <div className="productivity-list">
            <div>
              <span>Tasks completed</span>
              <strong>40%</strong>
            </div>

            <div>
              <span>Weekly study progress</span>
              <strong>40%</strong>
            </div>

            <div>
              <span>Notes activity</span>
              <strong>10%</strong>
            </div>

            <div>
              <span>Weekly goal</span>
              <strong>10%</strong>
            </div>
          </div>

          <p className="about-note">
            Together, these contribute to your overall Productivity Score.
          </p>

        </div>

      </section>

      <section className="about-section">

        <h2>How Study Time Works</h2>

        <div className="about-card">

          <div className="study-flow">
            <div>
              <strong>1</strong>
              <span>Start Session</span>
            </div>

            <div>→</div>

            <div>
              <strong>2</strong>
              <span>Study</span>
            </div>

            <div>→</div>

            <div>
              <strong>3</strong>
              <span>Finish Session</span>
            </div>

            <div>→</div>

            <div>
              <strong>4</strong>
              <span>Save Progress</span>
            </div>
          </div>

          <p>
            When a study session is finished, StudentHub records the
            subject, duration and date. The session is then included in
            your weekly study progress.
          </p>

        </div>

      </section>

      <section className="about-section">

        <h2>Weekly Study Progress</h2>

        <div className="about-card">

          <p>
            Your weekly study progress is calculated from Monday to Sunday.
          </p>

          <div className="example-box">
            <div>
              <span>Weekly Goal</span>
              <strong>10 hours</strong>
            </div>

            <div>
              <span>Studied</span>
              <strong>6h 30m</strong>
            </div>

            <div>
              <span>Progress</span>
              <strong>65%</strong>
            </div>
          </div>

        </div>

      </section>

      <section className="about-section">

        <h2>Technology</h2>

        <div className="tech-grid">

          <div className="about-card">
            <h3>Frontend</h3>
            <p>React · Vite · JavaScript · CSS</p>
          </div>

          <div className="about-card">
            <h3>Backend</h3>
            <p>Node.js · Express.js</p>
          </div>

          <div className="about-card">
            <h3>Database</h3>
            <p>MongoDB · Mongoose</p>
          </div>

          <div className="about-card">
            <h3>Authentication</h3>
            <p>JWT · bcrypt</p>
          </div>

        </div>

      </section>

      <section className="about-card about-footer">

        <h2>StudentHub</h2>

        <p>
          Built to make student productivity simpler, more organized
          and easier to understand.
        </p>

      </section>

    </div>
  );
}

export default About;