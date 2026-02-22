import React, { useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";
import "./notifications.scss";
import {
  fetchNotifications,
  markNotificationRead,
} from "../../Api/userProfile/userProfileApi";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;
    const loadNotifications = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchNotifications({ page: 0, size: 20 });
        if (!isActive) return;
        setNotifications(data);
      } catch (err) {
        if (!isActive) return;
        setError(err?.message || "Failed to load notifications");
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadNotifications();

    return () => {
      isActive = false;
    };
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((note) =>
          note.id === id ? { ...note, isRead: true } : note
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="nt-wrap">
      <div className="nt-head">
        <h2>Notifications</h2>
        <p>Stay updated with your latest alerts and messages</p>
      </div>

      <div className="nt-content">
        {loading && <p>Loading notifications...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && notifications.length === 0 && (
          <div className="nt-empty">
            <FiBell />
            <p>No new notifications at the moment.</p>
          </div>
        )}

        {!loading &&
          !error &&
          notifications.map((note) => (
            <div
              key={note.id}
              className={`nt-item ${note.isRead ? "read" : "unread"}`}
            >
              <div className="nt-item-head">
                <h4>{note.title}</h4>
                <span>{note.type}</span>
              </div>
              <p>{note.message}</p>
              <div className="nt-item-foot">
                <span>
                  {note.from} •{" "}
                  {note.createdAt
                    ? new Date(note.createdAt).toLocaleString()
                    : ""}
                </span>
                {!note.isRead && (
                  <button
                    className="primary"
                    onClick={() => handleMarkRead(note.id)}
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Notifications;
