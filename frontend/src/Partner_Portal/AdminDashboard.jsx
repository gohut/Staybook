import React from "react";
import "./layout.css";

const StatCard = ({ value, label, trend }) => (
  <div className="card">
    <h2>{value}</h2>
    <p>{label}</p>
    <span className="trend">{trend}</span>
  </div>
);

const AdminDashboard = () => {
  return (
    <div className="page-content">
      <div className="stats">
        <StatCard value="1,247" label="Total Hotels Onboarded" trend="+12.5%" />
        <StatCard value="23" label="Pending Verifications" trend="-8.2%" />
        <StatCard value="8,934" label="Total Bookings (Month)" trend="+24.1%" />
        <StatCard value="$124,567" label="Commission Revenue" trend="+18.9%" />
        <StatCard value="47" label="Active Coupons" trend="+3" />
      </div>

      <div className="quick-actions">
        <div className="action">Verify Pending Hotels</div>
        <div className="action">Create New Coupon</div>
        <div className="action">View Revenue Reports</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
    