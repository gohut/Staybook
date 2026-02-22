import React from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiBell } from "react-icons/fi";
import { MdPerson } from "react-icons/md";
import "./Hnavbar.scss";

const Hnavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <header className="h-navbar">
      {/* Search */}
      <div className="hrl-search">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search hotels, bookings, coupons..."
        />
      </div>

      {/* Right actions */}
      <div className="h-actions">
        <div className="notification">
          <FiBell size={20} />
          <span className="badge">3</span>
        </div>

        <div className="profile">
          <div className="profile-text">
            <span className="name">Admin User</span>
            <span className="role">Super Admin</span>
          </div>

          <div className="avatar">
            <MdPerson size={20} />
          </div>
          <button onClick={handleLogout}>log-out</button>
        </div>
      </div>
    </header>
  );
};

export default Hnavbar;
