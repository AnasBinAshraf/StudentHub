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
              <span>Task completion</span>
              <strong>30%</strong>
            </div>

            <div>
              <span>Weekly study goal</span>
              <strong>30%</strong>
            </div>

            <div>
              <span>Pomodoro sessions</span>
              <strong>15%</strong>
            </div>

            <div>
              <span>Subject goals</span>
              <strong>15%</strong>
            </div>

            <div>
              <span>Notes activity</span>
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

        <h2>How Pomodoro Works</h2>

        <div className="about-card">

          <p>
            The Pomodoro Timer uses focused study periods followed by
            short breaks to help maintain concentration.
          </p>

          <div className="example-box">

            <div>
              <span>Focus</span>
              <strong>25 minutes</strong>
            </div>

            <div>
              <span>Break</span>
              <strong>5 minutes</strong>
            </div>

            <div>
              <span>Weekly Target</span>
              <strong>5 sessions</strong>
            </div>

          </div>

          <p>
            A completed 25-minute Focus session is counted as one
            completed Pomodoro session and contributes to your
            Productivity Score.
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

          <p>
            If your goal is 10 hours and you study for 6 hours and
            30 minutes during the week, your progress is 65%.
          </p>

        </div>

      </section>

      <section className="about-section">

        <h2>Subject Goals</h2>

        <div className="about-card">

          <p>
            Subject Goals allow you to set individual weekly study
            targets for different subjects.
          </p>

          <div className="example-box">

            <div>
              <span>Mathematics Goal</span>
              <strong>5 hours</strong>
            </div>

            <div>
              <span>Studied</span>
              <strong>4 hours</strong>
            </div>

            <div>
              <span>Progress</span>
              <strong>80%</strong>
            </div>

          </div>

          <p>
            StudentHub calculates the progress of each active subject
            goal and averages the progress to determine the Subject
            Goals contribution to your Productivity Score.
          </p>

        </div>

      </section>

      <section className="about-section">

        <h2>Productivity Score Breakdown</h2>

        <div className="about-card">

          <h3>Task Completion — 30%</h3>
          <p>
            Based on the percentage of your tasks that have been completed.
          </p>

          <h3>Weekly Study Goal — 30%</h3>
          <p>
            Based on your study time compared with your weekly study goal.
            Reaching the full goal gives the complete 30 points.
          </p>

          <h3>Pomodoro — 15%</h3>
          <p>
            Five completed 25-minute Focus sessions in a week provide
            the full 15 points.
          </p>

          <h3>Subject Goals — 15%</h3>
          <p>
            The progress of your active subject goals is averaged and
            contributes up to 15 points.
          </p>

          <h3>Notes Activity — 10%</h3>
          <p>
            Creating five or more notes gives the full 10 points.
          </p>

        </div>

      </section>

      <section className="about-section">

        <h2>Dashboard</h2>

        <div className="about-card">

          <p>
            The Dashboard provides a quick overview of your academic
            activity and Productivity Score.
          </p>

          <div className="example-box">

            <div>
              <span>Tasks</span>
              <strong>Completion</strong>
            </div>

            <div>
              <span>Study</span>
              <strong>Weekly Progress</strong>
            </div>

            <div>
              <span>Productivity</span>
              <strong>Overall Score</strong>
            </div>

          </div>

          <p>
            It combines your tasks, study sessions, Pomodoro sessions,
            subject goals and notes to give you a quick picture of
            your academic productivity.
          </p>

        </div>

      </section>

      <section className="about-section">

        <h2>Analytics</h2>

        <div className="about-card">

          <p>
            Analytics helps you understand your academic activity in
            greater detail.
          </p>

          <p>
            You can review task completion, task priorities, weekly
            study time, subject-wise study time and subject goals.
          </p>

          <p>
            This makes it easier to identify your study patterns and
            understand where your time is being spent.
          </p>

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