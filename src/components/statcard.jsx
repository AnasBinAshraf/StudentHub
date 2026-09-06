function StatCard({ title, value, subtitle }) {

  let icon = "📋";

  if (title === "Upcoming") {
    icon = "⏰";
  }

  if (title === "Notes") {
    icon = "📝";
  }

  if (title === "Productivity") {
    icon = "📈";
  }

  return (
    <div className="stat-card">

      <div className="stat-top">
        <span>{title}</span>
        <div className="stat-icon">
          {icon}
        </div>
      </div>

      <strong>{value}</strong>

      <small>{subtitle}</small>

    </div>
  );
}

export default StatCard;