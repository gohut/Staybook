// AdminDashboard.jsx
import React from "react";
import "./AdminDashboard.css";

const StatCard = ({ icon, value, label, trend, positive }) => (
  <div className="stat-card">
    <div className={`stat-icon ${icon}`} />
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
    <div className={`stat-trend ${positive ? "up" : "down"}`}>
      {trend} vs last month
    </div>
  </div>
);

const ProgressRow = ({ label, value, percent, color }) => (
  <div className="progress-row">
    <div className="progress-head">
      <span>{label}</span>
      <span className="progress-value">{value}</span>
    </div>
    <div className="progress-bar">
      <div
        className={`progress-fill ${color}`}
        style={{ width: percent }}
      />
    </div>
  </div>
);

export default function AdminDashboard() {
  return (
    <div className="dashboard">
      
      <div>
        <h1 className="title">Admin Dashboard</h1>
        <p className="subtitle">
          Monitor overall platform health and performance
        </p>
      </div>

      <div className="stats">
        <StatCard value="1,247" label="Total Hotels Onboarded" trend="+12.5%" positive icon="blue" />
        <StatCard value="23" label="Pending Verifications" trend="-8.2%" icon="orange" />
        <StatCard value="8,934" label="Total Bookings (Month)" trend="+24.1%" positive icon="green" />
        <StatCard value="$124,567" label="Commission Revenue" trend="+18.9%" positive icon="emerald" />
        <StatCard value="47" label="Active Coupons" trend="+3" positive icon="purple" />
      </div>

      <div className="card">
        <h3>Quick Actions</h3>
        <div className="quick-actions">
          <div className="quick blue">Verify Pending Hotels</div>
          <div className="quick purple">Create New Coupon</div>
          <div className="quick green">View Revenue Reports</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Daily Booking Trend</h3>
          {[
            ["Jan 10", 245],
            ["Jan 11", 289],
            ["Jan 12", 312],
            ["Jan 13", 278],
            ["Jan 14", 334],
            ["Jan 15", 398],
            ["Jan 16", 421],
            ["Jan 17", 387],
          ].map(([d, v]) => (
            <ProgressRow
              key={d}
              label={d}
              value={`${v} bookings`}
              percent={`${(v / 421) * 100}%`}
              color="blue"
            />
          ))}
        </div>

        <div className="card">
          <h3>Booking Status Distribution</h3>
          <ProgressRow label="Confirmed" value="5,234 (59%)" percent="59%" color="green" />
          <ProgressRow label="Pending" value="892 (10%)" percent="10%" color="orange" />
          <ProgressRow label="Completed" value="2,108 (23%)" percent="23%" color="blue" />
          <ProgressRow label="Cancelled" value="700 (8%)" percent="8%" color="red" />
          <div className="total">
            <span>Total Bookings</span>
            <strong>8,934</strong>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Commission Revenue by Hotel</h3>
        {[
          ["Grand Plaza", "$24,500"],
          ["Ocean View Resort", "$31,200"],
          ["City Center Hotel", "$18,900"],
          ["Mountain Lodge", "$22,100"],
          ["Beachside Inn", "$27,800"],
        ].map(([h, v]) => (
          <ProgressRow key={h} label={h} value={v} percent="85%" color="green" />
        ))}
        <div className="total green">
          <span>Total Commission Revenue</span>
          <strong>$124,500</strong>
        </div>
      </div>
    </div>
  );
}
