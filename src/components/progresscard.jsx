function ProgressCard({ studyTime, weeklyGoal }) {
  const percentage =
    weeklyGoal === 0
      ? 0
      : (studyTime / weeklyGoal) * 100;

  const displayPercentage = Math.min(percentage, 100);

  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes}m`;
    }

    if (remainingMinutes === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${remainingMinutes}m`;
  }

  return (
    <div className="dashboard-card progress-card">

      <div className="card-header">
        <div>
          <h2>Weekly Progress</h2>
          <p>Your study time this week.</p>
        </div>
      </div>

      <div
        className="progress-circle"
        style={{
          "--progress": `${displayPercentage}%`
        }}
      >
        <strong>{percentage.toFixed(1)}%</strong>
        <span>Study Time</span>
      </div>

      <p className="progress-message">
        {formatTime(studyTime)} / {formatTime(weeklyGoal)}
      </p>

    </div>
  );
}

export default ProgressCard;