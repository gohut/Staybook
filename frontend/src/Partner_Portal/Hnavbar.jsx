import React from "react";
import "./layout.css";

const Hnavbar = ({ title }) => {
  return (
    <header className="h-navbar">
      <h1>{title}</h1>

      <div className="h-right">
        <input
          type="text"
          placeholder="Search hotels, bookings, coupons..."
        />
        <div className="profile">Admin User</div>
      </div>
    </header>
  );
};

export default Hnavbar;
