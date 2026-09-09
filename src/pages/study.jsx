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
    const savedStartTime = localStorage.getItem("studyStartTime");
    const savedSeconds = localStorage.getItem("studySeconds");
    const savedSubject = localStorage.getItem("studySubject");

    if (savedStartTime) {
        setSeconds(
        Number(savedSeconds || 0) +
            Math.floor((Date.now() - Number(savedStartTime)) / 1000)
        );

        setRunning(true);
    }

    if (savedSubject) {
        setSubject(savedSubject);
    }
    }, []);

    useEffect(() => {
    let timer;

    if (running) {
        timer = setInterval(() => {
        const startTime = localStorage.getItem("studyStartTime");
        const savedSeconds = Number(
            localStorage.getItem("studySeconds") || 0
        );

        if (startTime) {
            const elapsed = Math.floor(
            (Date.now() - Number(startTime)) / 1000
            );

            setSeconds(savedSeconds + elapsed);
        }
        }, 1000);
    }

    return () => clearInterval(timer);
    }, [running]);

  useEffect(() => {
  const savedRunning = localStorage.getItem("pomodoroRunning");
  const savedMode = localStorage.getItem("pomodoroMode");
  const savedSeconds = localStorage.getItem("pomodoroSeconds");
  const savedStartTime = localStorage.getItem("pomodoroStartTime");

  if (savedMode) {
    setPomodoroMode(savedMode);
  }

  if (savedSeconds) {
    setPomodoroSeconds(Number(savedSeconds));
  }

  if (savedRunning === "true" && savedStartTime) {
    const elapsed = Math.floor(
      (Date.now() - Number(savedStartTime)) / 1000
    );

    const startingSeconds = Number(savedSeconds || 0);
    const remaining = startingSeconds - elapsed;

    if (remaining > 0) {
      setPomodoroSeconds(remaining);
      setPomodoroRunning(true);
    } else {
      if (savedMode === "Focus") {
        setPomodoroMode("Break");
        setPomodoroSeconds(5 * 60);
      } else {
        setPomodoroMode("Focus");
        setPomodoroSeconds(25 * 60);
      }

      localStorage.setItem(
        "pomodoroSeconds",
        savedMode === "Focus" ? 5 * 60 : 25 * 60
      );

      localStorage.setItem(
        "pomodoroMode",
        savedMode === "Focus" ? "Break" : "Focus"
      );

      localStorage.setItem("pomodoroStartTime", Date.now());

      setPomodoroRunning(true);
    }
  }
}, []);

    useEffect(() => {
    let timer;

    if (pomodoroRunning) {
        timer = setInterval(() => {
        const startTime = localStorage.getItem("pomodoroStartTime");
        const savedSeconds = Number(
            localStorage.getItem("pomodoroSeconds") || 0
        );

        if (startTime) {
            const elapsed = Math.floor(
            (Date.now() - Number(startTime)) / 1000
            );

            const remaining = savedSeconds - elapsed;

            if (remaining <= 0) {
            if (pomodoroMode === "Focus") {
                savePomodoroCompletion();
                setPomodoroMode("Break");
                setPomodoroSeconds(5 * 60);

                localStorage.setItem("pomodoroMode", "Break");
                localStorage.setItem("pomodoroSeconds", 5 * 60);
                localStorage.setItem("pomodoroStartTime", Date.now());
            } else {
                setPomodoroMode("Focus");
                setPomodoroSeconds(25 * 60);

                localStorage.setItem("pomodoroMode", "Focus");
                localStorage.setItem("pomodoroSeconds", 25 * 60);
                localStorage.setItem("pomodoroStartTime", Date.now());
            }
            } else {
            setPomodoroSeconds(remaining);
            }
        }
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

  async function savePomodoroCompletion() {
    try {
        const today = new Date();

        const date =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0");

        await fetch("http://localhost:5000/pomodoro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            duration: 25,
            date
        })
        });
    } catch (error) {
        console.log(error);
    }
    }

  function togglePomodoro() {
    if (pomodoroRunning) {
        const startTime = localStorage.getItem("pomodoroStartTime");
        const savedSeconds = Number(
        localStorage.getItem("pomodoroSeconds") || pomodoroSeconds
        );

        let currentSeconds = savedSeconds;

        if (startTime) {
        const elapsed = Math.floor(
            (Date.now() - Number(startTime)) / 1000
        );

        currentSeconds = Math.max(savedSeconds - elapsed, 0);
        }

        setPomodoroSeconds(currentSeconds);
        setPomodoroRunning(false);

        localStorage.setItem("pomodoroSeconds", currentSeconds);
        localStorage.setItem("pomodoroRunning", "false");
        localStorage.removeItem("pomodoroStartTime");

        return;
    }

    localStorage.setItem("pomodoroMode", pomodoroMode);
    localStorage.setItem("pomodoroSeconds", pomodoroSeconds);
    localStorage.setItem("pomodoroStartTime", Date.now());
    localStorage.setItem("pomodoroRunning", "true");

    setPomodoroRunning(true);
    }

    function togglePomodoroMode() {
    const newMode = pomodoroMode === "Focus" ? "Break" : "Focus";

    const newSeconds = newMode === "Focus" ? 25 * 60 : 5 * 60;

    setPomodoroMode(newMode);
    setPomodoroSeconds(newSeconds);
    setPomodoroRunning(true);

    localStorage.setItem("pomodoroMode", newMode);
    localStorage.setItem("pomodoroSeconds", newSeconds);
    localStorage.setItem("pomodoroStartTime", Date.now());
    localStorage.setItem("pomodoroRunning", "true");
    }

  function resetPomodoro() {
    setPomodoroRunning(false);

    const resetSeconds =
        pomodoroMode === "Focus" ? 25 * 60 : 5 * 60;

    setPomodoroSeconds(resetSeconds);

    localStorage.setItem("pomodoroRunning", "false");
    localStorage.setItem("pomodoroSeconds", resetSeconds);
    localStorage.removeItem("pomodoroStartTime");
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

  function toggleTimer() {
    if (running) {
        const startTime = localStorage.getItem("studyStartTime");
        const savedSeconds = Number(
        localStorage.getItem("studySeconds") || 0
        );

        let currentSeconds = seconds;

        if (startTime) {
        currentSeconds =
            savedSeconds +
            Math.floor((Date.now() - Number(startTime)) / 1000);
        }

        setSeconds(currentSeconds);
        setRunning(false);

        localStorage.setItem("studySeconds", currentSeconds);
        localStorage.removeItem("studyStartTime");

        return;
    }

    localStorage.setItem("studyStartTime", Date.now());
    localStorage.setItem("studySeconds", seconds);
    localStorage.setItem("studySubject", subject);

    setRunning(true);
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

        localStorage.removeItem("studyStartTime");
        localStorage.removeItem("studySeconds");
        localStorage.removeItem("studySubject");

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
            onChange={(e) => {
                setSubject(e.target.value);
                localStorage.setItem("studySubject", e.target.value);
            }}
          />

          <div className="study-timer">
            {formatTime(seconds)}
          </div>

          <div className="timer-buttons">
            <button
              className="start-button"
              onClick={toggleTimer}
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
                    onClick={togglePomodoro}
                >
                    {pomodoroRunning ? "Pause" : "Start"}
                </button>

                <button
                className="finish-button"
                onClick={togglePomodoroMode}
                >
                {pomodoroMode === "Focus" ? "Break" : "Focus"}
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