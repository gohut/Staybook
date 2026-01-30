// Notification.jsx
import "./Notification.scss";
import {
  FiBell,
  FiCalendar,
  FiCheckCircle,
  FiAlertTriangle,
  FiTrash2
} from "react-icons/fi";

const StatCard = ({ label, value, icon, type }) => (
  <div className="noti-stat-card">
    <div>
      <p>{label}</p>
      <h3 className={type}>{value}</h3>
    </div>
    {icon}
  </div>
);

const NotificationCard = ({ type, title, desc, time, badge }) => (
  <div className={`notification-card ${type}`}>
    <div className="left">
      {type === "checkin" && <FiCalendar />}
      {type === "success" && <FiCheckCircle />}
      {type === "alert" && <FiAlertTriangle />}
    </div>

    <div className="content">
      <h4>
        {title}
        {badge && <span className="new-badge">New</span>}
      </h4>
      <p>{desc}</p>
      <span className="time">{time}</span>
    </div>

    <div className="actions">
      <FiTrash2 />
      <button>Mark as Read</button>
    </div>
  </div>
);

const Notification = () => {
  return (
    <div className="notification-page">
      <div className="page-head">
        <div>
          <h2>Notifications</h2>
          <p>Stay updated on important events</p>
        </div>
        <button className="mark-btn">Mark All as Read</button>
      </div>

      <div className="stats-grid">
        <StatCard label="Total Notifications" value="4" icon={<FiBell />} />
        <StatCard label="Unread" value="2" icon={<FiBell className="green" />} type="green" />
        <StatCard label="Check-ins" value="2" icon={<FiCalendar className="blue" />} type="blue" />
        <StatCard label="Alerts" value="1" icon={<FiAlertTriangle className="orange" />} type="orange" />
      </div>

      <NotificationCard
        type="checkin"
        title="Upcoming Check-in Today"
        badge
        desc="John Anderson (RES-2024-001) checking in today at 3:00 PM"
        time="5 days ago"
      />

      <NotificationCard
        type="success"
        title="New Reservation"
        badge
        desc="New booking received for Executive Suite - Sarah Mitchell"
        time="5 days ago"
      />

      <NotificationCard
        type="alert"
        title="Low Availability Alert"
        desc="Only 2 Deluxe Ocean View rooms available for next weekend"
        time="6 days ago"
      />

      <NotificationCard
        type="checkin"
        title="Check-in Tomorrow"
        desc="Michael Chen (RES-2024-003) checking in tomorrow"
        time="7 days ago"
      />
    </div>
  );
};

export default Notification;
