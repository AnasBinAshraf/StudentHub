import { useState } from "react";
import "../styles/calendar.css";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState(new Date());

  const tasks = [
    {
      title: "Machine Learning Assignment",
      date: "2026-09-08",
      priority: "High",
    },
    {
      title: "Database Assignment",
      date: "2026-09-11",
      priority: "Medium",
    },
    {
      title: "DAA Internal Test",
      date: "2026-09-15",
      priority: "High",
    },
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  function previousMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
  }

  function nextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
  }

  function goToToday() {
    const today = new Date();

    setCurrentDate(today);
    setSelectedDate(today);
  }

  function getDateTasks(day) {
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    return tasks.filter((task) => task.date === date);
  }

  function isSelected(day) {
    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  }

  return (
    <div className="calendar-page">

      <header className="calendar-header">
        <div>
          <p className="calendar-greeting">Plan ahead 📅</p>
          <h1>Calendar</h1>
          <p className="calendar-subtitle">
            Keep track of your deadlines and important tasks.
          </p>
        </div>

        <button className="today-button" onClick={goToToday}>
          Today
        </button>
      </header>


      <section className="calendar-card">

        <div className="calendar-top">

          <button onClick={previousMonth}>
            ←
          </button>

          <h2>
            {monthName} {year}
          </h2>

          <button onClick={nextMonth}>
            →
          </button>

        </div>


        <div className="weekdays">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>


        <div className="calendar-grid">

          {Array.from({ length: firstDay }).map((_, index) => (
            <div
              className="calendar-day empty"
              key={`empty-${index}`}
            />
          ))}


          {Array.from({ length: daysInMonth }).map((_, index) => {

            const day = index + 1;
            const dateTasks = getDateTasks(day);

            return (
              <button
                className={`calendar-day ${
                  isSelected(day) ? "selected" : ""
                }`}
                key={day}
                onClick={() =>
                  setSelectedDate(new Date(year, month, day))
                }
              >

                <span className="day-number">
                  {day}
                </span>

                {dateTasks.map((task) => (
                  <span
                    className={`calendar-task ${task.priority.toLowerCase()}`}
                    key={task.title}
                  >
                    {task.title}
                  </span>
                ))}

              </button>
            );
          })}

        </div>

      </section>


      <section className="selected-date-card">

        <h2>
          {selectedDate.toLocaleDateString("default", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </h2>

        {(() => {
          const selectedTasks = tasks.filter((task) => {
            const taskDate = new Date(`${task.date}T00:00:00`);

            return (
              taskDate.getFullYear() === selectedDate.getFullYear() &&
              taskDate.getMonth() === selectedDate.getMonth() &&
              taskDate.getDate() === selectedDate.getDate()
            );
          });

          if (selectedTasks.length === 0) {
            return <p>No tasks scheduled for this day.</p>;
          }

          return selectedTasks.map((task) => (
            <div className="selected-task" key={task.title}>

              <div>
                <strong>{task.title}</strong>
                <span>{task.priority} Priority</span>
              </div>

            </div>
          ));
        })}

      </section>

    </div>
  );
}

export default Calendar;