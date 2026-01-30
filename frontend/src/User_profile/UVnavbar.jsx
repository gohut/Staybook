// UVnavbar.jsx (MODIFIED)
import React from "react";
import {
  FiUser,
  FiCalendar,
  FiClock,
  FiFileText,
  FiSettings,
} from "react-icons/fi";
import "./Vnavbar.scss";

const UVnavbar = ({ active, setActive }) => {
  return (
    <aside className="u-vnav">
      <div className="u-logo">StayBook</div>

      <nav>
        <button
          className={active === "profile" ? "active" : ""}
          onClick={() => setActive("profile")}
        >
          <FiUser /> Profile Overview
        </button>

        <button
          className={active === "trips" ? "active" : ""}
          onClick={() => setActive("trips")}
        >
          <FiCalendar /> My Trips
        </button>

        <button
          className={active === "history" ? "active" : ""}
          onClick={() => setActive("history")}
        >
          <FiClock /> Booking History
        </button>

        <button
          className={active === "vouchers" ? "active" : ""}
          onClick={() => setActive("vouchers")}
        >
          <FiFileText /> Vouchers
        </button>

        <button
          className={active === "settings" ? "active" : ""}
          onClick={() => setActive("settings")}
        >
          <FiSettings /> Account Settings
        </button>
      </nav>
    </aside>
  );
};

export default UVnavbar;
