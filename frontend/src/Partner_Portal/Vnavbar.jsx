import React from "react";
import "./layout.css";

const Vnavbar = () => {
  return (
    <aside className="v-navbar">
      <h2 className="logo">StayBook</h2>
      <p className="subtitle">Admin Operations</p>

      <nav>
        <a className="active">Admin Dashboard</a>
        <a>Hotel Registrations</a>
        <a>Bookings & Revenue</a>
        <a>Coupons & Offers</a>
        <a>Reports</a>
        <a>Settings</a>
      </nav>
    </aside>
  );
};

export default Vnavbar;
