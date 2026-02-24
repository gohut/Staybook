import { useState } from "react";
import { FiBell, FiMail, FiMessageCircle } from "react-icons/fi";
import PPCard from "../Common/PPCard";
import PPBadge from "../Common/PPBadge";
import "./PackageNotifications.scss";

const PackageNotifications = ({ notifications, onToggleRead }) => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  return (
    <div className="pp-page pp-notifications">
      <PPCard title="Notification Preferences" subtitle="Channels">
        <div className="pp-inline">
          <label className="pp-inline">
            <input
              type="checkbox"
              checked={emailEnabled}
              onChange={(event) => setEmailEnabled(event.target.checked)}
            />
            <FiMail /> Email alerts
          </label>
          <label className="pp-inline">
            <input
              type="checkbox"
              checked={smsEnabled}
              onChange={(event) => setSmsEnabled(event.target.checked)}
            />
            <FiMessageCircle /> SMS alerts
          </label>
        </div>
      </PPCard>

      <PPCard title="Notification History" subtitle="Latest updates">
        <div className="pp-stack">
          {notifications.map((note) => (
            <div key={note.id} className={`pp-note ${note.read ? "read" : ""}`}>
              <div>
                <h4>
                  <FiBell /> {note.title}
                </h4>
                <p>{note.detail}</p>
                <span className="pp-muted">{note.time}</span>
              </div>
              <div className="pp-inline">
                <PPBadge tone={note.read ? "default" : "info"}>
                  {note.read ? "Read" : "New"}
                </PPBadge>
                <button
                  type="button"
                  className="pp-btn pp-btn-ghost"
                  onClick={() => onToggleRead(note.id)}
                >
                  Mark {note.read ? "Unread" : "Read"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </PPCard>
    </div>
  );
};

export default PackageNotifications;
