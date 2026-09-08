import { useEffect, useState } from "react";
import "../styles/study.css";

function Study() {
  const [subject, setSubject] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  const [goal, setGoal] = useState(null);
  const [studyTime, setStudyTime] = useState(0);
  const [sessions, setSessions] = useState([]);

  const [goalInput, setGoalInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingSubject, setEditingSubject] = useState("");

  const [pomodoroSeconds, setPomodoroSeconds] = useState(25 * 60);
  const [pomodoroRunning, setPomodoroRunning] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState("Focus");

  const token = localStorage.getItem("token");

  useEffect(() => {
    let timer;

    if (running) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [running]);

  useEffect(() => {
    let timer;

    if (pomodoroRunning) {
      timer = setInterval(() => {
        setPomodoroSeconds((prev) => {
          if (prev <= 1) {
            setPomodoroRunning(false);

            if (pomodoroMode === "Focus") {
              setPomodoroMode("Break");
              return 5 * 60;
            } else {
              setPomodoroMode("Focus");
              return 25 * 60;
            }
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [pomodoroRunning, pomodoroMode]);

  useEffect(() => {
    getGoal();
    getStudyTime();
  }, []);

  async function getGoal() {
    try {
      const response = await fetch("http://localhost:5000/study-goal", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

    setGoal(data);

    if (data) {
    setGoalInput(data.weeklyGoal);
    }
    } catch (error) {
      console.log(error);
    }
  }

  async function saveGoal() {
    if (!goalInput || Number(goalInput) <= 0) {
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/study-goal", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            weeklyGoal: Number(goalInput)
        })
        });

        const data = await response.json();

        if (!response.ok) {
        return;
        }

        setGoal(data);
        setGoalInput(data.weeklyGoal);
    } catch (error) {
        console.log(error);
    }
    }

  async function getStudyTime() {
    try {
        const response = await fetch("http://localhost:5000/study", {
        headers: {
            Authorization: `Bearer ${token}`
        }
        });

        const data = await response.json();

        setSessions(data);

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

        const weeklySessions = data.filter((session) => {
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
    } catch (error) {
        console.log(error);
    }
    }
  async function editSubject(id) {
    try {
      const response = await fetch(
        `http://localhost:5000/study/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            subject: editingSubject
          })
        }
      );

      if (!response.ok) {
        return;
      }

      setEditingId(null);
      setEditingSubject("");

      getStudyTime();
    } catch (error) {
      console.log(error);
    }
  }

  function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return (
      String(hours).padStart(2, "0") +
      ":" +
      String(minutes).padStart(2, "0") +
      ":" +
      String(secs).padStart(2, "0")
    );
  }

  function formatPomodoroTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    return (
      String(minutes).padStart(2, "0") +
      ":" +
      String(secs).padStart(2, "0")
    );
  }

  function resetPomodoro() {
    setPomodoroRunning(false);

    if (pomodoroMode === "Focus") {
      setPomodoroSeconds(25 * 60);
    } else {
      setPomodoroSeconds(5 * 60);
    }
  }

  async function deleteSession(id) {
    try {
        const response = await fetch(
        `http://localhost:5000/study/${id}`,
        {
            method: "DELETE",
            headers: {
            Authorization: `Bearer ${token}`
            }
        }
        );

        if (!response.ok) {
        return;
        }

        getStudyTime();
    } catch (error) {
        console.log(error);
    }
    }

  async function finishSession() {
    if (seconds < 60) {
      setRunning(false);
      return;
    }

    try {
      const today = new Date();

      const date =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0");

      await fetch("http://localhost:5000/study", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          subject: subject || "General",
          duration: Math.floor(seconds / 60),
          date
        })
      });

      setSeconds(0);
      setRunning(false);
      setSubject("");

      getStudyTime();
    } catch (error) {
      console.log(error);
    }
  }

  const goalMinutes = goal?.weeklyGoal
    ? goal.weeklyGoal * 60
    : 0;

  const progress =
    goalMinutes > 0
      ? Math.min((studyTime / goalMinutes) * 100, 100)
      : 0;

  return (
    <div className="study-page">

      <div className="study-header">
        <h1>Study Time</h1>
        <p>Focus, study and keep track of your progress.</p>
      </div>

      <div className="study-grid">

        {/* Study Timer */}

        <div className="study-card timer-card">
          <h2>Study Session</h2>

          <input
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <div className="study-timer">
            {formatTime(seconds)}
          </div>

          <div className="timer-buttons">
            <button
              className="start-button"
              onClick={() => setRunning(!running)}
            >
              {running ? "Pause" : "Start"}
            </button>

            <button
              className="finish-button"
              onClick={finishSession}
            >
              Finish
            </button>
          </div>
        </div>

        {/* Pomodoro */}

        <div className="study-card pomodoro-card">
          <div className="pomodoro-header">
            <div>
              <h2>Pomodoro</h2>
              <p>Stay focused with timed sessions.</p>
            </div>

            <span className="pomodoro-badge">
              {pomodoroMode}
            </span>
          </div>

          <div className="pomodoro-timer">
            {formatPomodoroTime(pomodoroSeconds)}
          </div>

          <div className="pomodoro-label">
            {pomodoroMode === "Focus"
              ? "Focus Session"
              : "Take a Short Break"}
          </div>

          <div className="pomodoro-buttons">
            <button
              className="start-button"
              onClick={() =>
                setPomodoroRunning(!pomodoroRunning)
              }
            >
              {pomodoroRunning ? "Pause" : "Start"}
            </button>

            <button
              className="finish-button"
              onClick={resetPomodoro}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Weekly Progress */}

        <div className="study-card progress-card">
          <h2>Weekly Study Progress</h2>

          <div className="study-progress">
            <div
              className="study-progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="study-progress-text">
            <strong>
              {Math.floor(studyTime / 60)}h {studyTime % 60}m
            </strong>

            <span>
              / {goal?.weeklyGoal || 0}h
            </span>
          </div>

          <p>
            {goalMinutes === 0
              ? "Set a weekly study goal to get started."
              : `${Math.round(progress)}% of your weekly goal completed.`}
          </p>
        </div>

        {/* Weekly Goal */}

        <div className="study-card goal-card">
          <h2>Weekly Study Goal</h2>

          <p>
            Set how many hours you want to study this week.
          </p>

          <div className="goal-input">
            <input
              type="number"
              min="1"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
            />

            <span>hours</span>

            <button onClick={saveGoal}>
              Save Goal
            </button>
          </div>

          {goal?.weeklyGoal && (
            <p className="current-goal">
              Current goal:{" "}
              <strong>{goal.weeklyGoal} hours</strong>
            </p>
          )}
        </div>

      </div>

      {/* Recent Sessions */}

      <div className="sessions-section">

        <div className="sessions-header">
          <div>
            <h2>Recent Study Sessions</h2>
            <p>Your study history</p>
          </div>
        </div>

        {sessions.length === 0 ? (
          <div className="no-sessions">
            <p>No study sessions yet.</p>
          </div>
        ) : (
          <div className="session-list">

            {sessions.slice().reverse().map((session) => (
              <div className="session-item" key={session._id}>

                <div className="session-dot"></div>

                <div className="session-info">

                  {editingId === session._id ? (
                    <div className="edit-session">

                      <input
                        type="text"
                        value={editingSubject}
                        onChange={(e) =>
                          setEditingSubject(e.target.value)
                        }
                        autoFocus
                      />

                      <button
                        onClick={() =>
                          editSubject(session._id)
                        }
                      >
                        Save
                      </button>

                      <button
                        className="cancel-edit"
                        onClick={() => {
                          setEditingId(null);
                          setEditingSubject("");
                        }}
                      >
                        Cancel
                      </button>

                    </div>
                  ) : (
                    <>
                      <strong>{session.subject}</strong>
                      <span>{session.date}</span>
                    </>
                  )}

                </div>

                <div className="session-duration">

                  <strong>
                    {session.duration >= 60
                      ? `${Math.floor(session.duration / 60)}h ${
                          session.duration % 60
                        }m`
                      : `${session.duration}m`}
                  </strong>

                  {editingId !== session._id && (
                    <div className="session-actions">
                        <button
                        className="edit-session-button"
                        onClick={() => {
                            setEditingId(session._id);
                            setEditingSubject(session.subject);
                        }}
                        >
                        ✏️
                        </button>

                        <button
                        className="delete-session-button"
                        onClick={() => deleteSession(session._id)}
                        >
                        🗑️
                        </button>
                    </div>
                    )}

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Study;