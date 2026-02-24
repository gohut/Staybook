import React, { useEffect, useMemo, useState } from "react";
import {
  FiBell,
  FiInbox,
  FiSend,
  FiCheckCircle,
  FiMail,
  FiUser,
  FiTag,
} from "react-icons/fi";
import "./Messages.scss";
import {
  fetchAdminNotifications,
  markAdminNotificationRead,
  sendAdminMessage,
} from "../../Api/admin/adminApi";

const MESSAGE_TYPES = [
  { value: "INFO", label: "Info" },
  { value: "SYSTEM", label: "System" },
  { value: "ALERT", label: "Alert" },
  { value: "BOOKING", label: "Booking" },
];

const RECIPIENT_TYPES = [
  { value: "PARTNER", label: "Partner" },
  { value: "TRAVELER", label: "Traveler" },
];

const Messages = ({ searchQuery = "", onNotificationsUpdated }) => {
  const [tab, setTab] = useState("notifications");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [sendSuccess, setSendSuccess] = useState("");
  const [form, setForm] = useState({
    recipientType: "PARTNER",
    messageType: "INFO",
    to: "",
    subject: "",
    content: "",
  });

  const loadNotifications = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAdminNotifications({ page: 0, size: 50 });
      const list = Array.isArray(data?.content) ? data.content : [];
      setNotifications(list);
    } catch (err) {
      setError(err?.message || "Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const filteredNotifications = useMemo(() => {
    if (!searchQuery.trim()) return notifications;
    const needle = searchQuery.toLowerCase();
    return notifications.filter((n) =>
      [n.title, n.message, n.from, n.fromRole]
        .filter(Boolean)
        .some((val) => val.toLowerCase().includes(needle))
    );
  }, [notifications, searchQuery]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  const handleMarkRead = async (id) => {
    try {
      await markAdminNotificationRead(id);
      setNotifications((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isRead: true } : item
        )
      );
      if (onNotificationsUpdated) {
        onNotificationsUpdated();
      }
    } catch (err) {
      setError(err?.message || "Failed to update notification.");
    }
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setSendError("");
    setSendSuccess("");

    if (!form.to.trim()) {
      setSendError("Recipient email is required.");
      return;
    }
    if (!form.subject.trim()) {
      setSendError("Subject is required.");
      return;
    }
    if (!form.content.trim()) {
      setSendError("Message content is required.");
      return;
    }

    setSending(true);
    try {
      await sendAdminMessage({
        recipientType: form.recipientType,
        email: form.to.trim(),
        subject: form.subject.trim(),
        content: form.content.trim(),
        type: form.messageType,
      });
      setSendSuccess("Message delivered to the user notification inbox.");
      setForm((prev) => ({
        ...prev,
        to: "",
        subject: "",
        content: "",
      }));
    } catch (err) {
      setSendError(err?.message || "Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    return date.toLocaleString();
  };

  return (
    <div className="msg-container">
      <div className="msg-head">
        <div>
          <h1>Messages</h1>
          <p>Manage admin notifications and send updates to partners or travelers</p>
        </div>
        <div className="msg-stats">
          <div className="msg-pill">
            <FiBell /> {notifications.length} total
          </div>
          <div className="msg-pill alert">
            <FiInbox /> {unreadCount} unread
          </div>
        </div>
      </div>

      <div className="msg-tabs">
        <button
          className={tab === "notifications" ? "active" : ""}
          onClick={() => setTab("notifications")}
        >
          <FiInbox /> Notifications
        </button>
        <button
          className={tab === "compose" ? "active" : ""}
          onClick={() => setTab("compose")}
        >
          <FiSend /> Send Message
        </button>
      </div>

      {tab === "notifications" && (
        <div className="msg-card">
          {loading ? (
            <p className="muted">Loading notifications...</p>
          ) : error ? (
            <p className="muted error">{error}</p>
          ) : filteredNotifications.length === 0 ? (
            <p className="muted">No notifications found.</p>
          ) : (
            <div className="msg-list">
              {filteredNotifications.map((n) => (
                <div
                  key={n.id}
                  className={`msg-item ${n.isRead ? "read" : "unread"}`}
                >
                  <div className="msg-icon">
                    <FiMail />
                  </div>
                  <div className="msg-body">
                    <div className="msg-title">
                      <h4>{n.title || "New Request"}</h4>
                      <span className={`tag ${n.type?.toLowerCase() || "info"}`}>
                        <FiTag /> {n.type || "INFO"}
                      </span>
                    </div>
                    <p>{n.message || "No message provided."}</p>
                    <div className="msg-meta">
                      <span>
                        <FiUser /> {n.from || "System"}
                      </span>
                      {n.fromRole && <span className="role">{n.fromRole}</span>}
                      <span className="date">{formatDate(n.createdAt)}</span>
                    </div>
                  </div>
                  {!n.isRead && (
                    <button
                      className="mark-read"
                      onClick={() => handleMarkRead(n.id)}
                    >
                      <FiCheckCircle /> Mark Read
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "compose" && (
        <div className="msg-card">
          <form className="msg-form" onSubmit={handleSend}>
            <div className="msg-form-row">
              <div>
                <label>Message Type</label>
                <select
                  value={form.messageType}
                  onChange={(e) => handleChange("messageType", e.target.value)}
                >
                  {MESSAGE_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Recipient</label>
                <select
                  value={form.recipientType}
                  onChange={(e) => handleChange("recipientType", e.target.value)}
                >
                  {RECIPIENT_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="msg-form-row">
              <div>
                <label>To (Email)</label>
                <input
                  type="email"
                  value={form.to}
                  onChange={(e) => handleChange("to", e.target.value)}
                  placeholder="partner@staybook.com"
                />
              </div>
              <div>
                <label>Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  placeholder="Commission update for your listing"
                />
              </div>
            </div>

            <div className="msg-form-row full">
              <div>
                <label>Content</label>
                <textarea
                  rows="6"
                  value={form.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  placeholder="Write the message you want to send..."
                />
              </div>
            </div>

            {sendError && <p className="muted error">{sendError}</p>}
            {sendSuccess && <p className="muted success">{sendSuccess}</p>}

            <div className="msg-actions">
              <button type="submit" className="primary" disabled={sending}>
                {sending ? "Sending..." : "Send Message"}
              </button>
              <p className="hint">
                Messages are delivered as notifications to the user account.
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Messages;
