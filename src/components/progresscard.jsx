function ProgressCard({ percentage }) {
  return (
    <div className="dashboard-card progress-card">

      <div className="card-header">
        <div>
          <h2>Weekly Progress</h2>
          <p>Your productivity this week.</p>
        </div>
      </div>

      <div className="progress-circle">
        <strong>{percentage}%</strong>
        <span>Completed</span>
      </div>

      <p className="progress-message">
        Great work! Keep the momentum going.
      </p>

    </div>
  );
}

export default ProgressCard;