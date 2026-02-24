import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiSearch, FiBell, FiChevronDown, FiCheck } from "react-icons/fi";
import { MdPerson } from "react-icons/md";
import "./Hnavbar.scss";
import { markAdminNotificationRead } from "../../Api/admin/adminApi";

const Hnavbar = ({
  searchQuery = "",
  onSearchChange = () => {},
  user,
  notifications,
  notificationsLoading,
  unreadCount,
  onRefreshNotifications,
  onOpenMessages,
  onLogout,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const displayNotifications = useMemo(() => {
    return Array.isArray(notifications) ? notifications.slice(0, 5) : [];
  }, [notifications]);

  useEffect(() => {
    const handler = (event) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target) &&
        showNotifications
      ) {
        setShowNotifications(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        showProfile
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showNotifications, showProfile]);

  const handleMarkRead = async (id) => {
    try {
      await markAdminNotificationRead(id);
      if (onRefreshNotifications) {
        onRefreshNotifications();
      }
    } catch (err) {
      // swallow errors for toolbar experience
    }
  };

  return (
    <header className="h-navbar">
      <div className="hrl-search">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search hotels, partners, messages..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button className="clear" onClick={() => onSearchChange("")}>
            Clear
          </button>
        )}
      </div>

      <div className="h-actions">
        <div
          className="notification"
          ref={notifRef}
          onClick={() => {
            setShowNotifications((prev) => !prev);
            if (onRefreshNotifications) {
              onRefreshNotifications();
            }
          }}
        >
          <FiBell size={20} />
          {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          {showNotifications && (
            <div className="notif-panel">
              <div className="notif-head">
                <span>Notifications</span>
                <button onClick={onOpenMessages}>View all</button>
              </div>
              {notificationsLoading ? (
                <p className="muted">Loading...</p>
              ) : displayNotifications.length === 0 ? (
                <p className="muted">No new notifications</p>
              ) : (
                <div className="notif-list">
                  {displayNotifications.map((n) => (
                    <div className={`notif-item ${n.isRead ? "read" : "unread"}`} key={n.id}>
                      <div>
                        <strong>{n.title || "Notification"}</strong>
                        <p>{n.message || "No message"}</p>
                      </div>
                      {!n.isRead && (
                        <button
                          className="mark"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkRead(n.id);
                          }}
                        >
                          <FiCheck />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div
          className="profile"
          ref={profileRef}
          onClick={() => setShowProfile((prev) => !prev)}
        >
          <div className="profile-text">
            <span className="name">{user?.name || "Admin"}</span>
            <span className="role">{user?.role || "Admin"}</span>
          </div>

          <div className="avatar">
            <MdPerson size={20} />
          </div>
          <FiChevronDown className="chevron" />

          {showProfile && (
            <div className="profile-panel">
              <div>
                <strong>{user?.name || "Admin"}</strong>
                <p>{user?.email || "admin@staybook.com"}</p>
              </div>
              <button onClick={onLogout}>Log Out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Hnavbar;
