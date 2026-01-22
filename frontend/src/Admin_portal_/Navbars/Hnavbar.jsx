import React from "react";
import { FiSearch, FiBell } from "react-icons/fi";
import { MdPerson } from "react-icons/md";
import "./Hnavbar.css";

const Hnavbar = () => {
  return (
    <header className="h-navbar">
      {/* Search */}
      <div className="h-search">
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
        </div>
      </div>
    </header>
  );
};

export default Hnavbar;
