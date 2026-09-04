function DeadlineItem({ title, date, days }) {
  return (
    <div className="deadline-item">

      <div>
        <strong>{title}</strong>
        <span>{date}</span>
      </div>

      <span className="deadline-badge">
        {days}
      </span>

    </div>
  );
}

export default DeadlineItem;