// AdminDashboard.jsx
import React from "react";
import "./AdminDashboard.scss";

import {
  FaHotel,
  FaClock,
  FaCalendarAlt,
  FaDollarSign,
  FaTag,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";


const StatCard = ({ Icon, iconClass, value, label, trend, positive }) => {
  return (
    <div className="adm-stat-card">
      <div className={`stat-icon ${iconClass}`}>
        <Icon />
      </div>

      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>

      <div className={`stat-trend ${positive ? "up" : "down"}`}>
        {trend} vs last month
      </div>
    </div>
  );
};



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


<StatCard
  value="1,247"
  label="Total Hotels Onboarded"
  trend="+12.5%"
  positive={true}
  Icon={FaHotel}
  iconClass="blue"
/>

<StatCard
  value="892"
  label="Pending Approvals"
  trend="-4.2%"
  positive={false}
  Icon={FaClock}
  iconClass="orange"
/>

<StatCard
  value="2,108"
  label="Completed Bookings"
  trend="+8.1%"
  positive={true}
  Icon={FaCalendarAlt}
  iconClass="green"
/>

<StatCard
  value="₹5.6L"
  label="Monthly Revenue"
  trend="+15.9%"
  positive={true}
  Icon={FaDollarSign}
  iconClass="green"
/>

<StatCard
  value="120"
  label="Active Offers"
  trend="-2.3%"
  positive={false}
  Icon={FaTag}
  iconClass="red"
/>
      </div>

      <div className="adm-qa-card">
        <h3>Quick Actions</h3>
        <div className="quick-actions">
          <div className="quick blue"> <FaClock />
Verify Pending Hotels</div>
          <div className="quick purple"> <FaTag />
Create New Coupon</div>
          <div className="quick green"><FaDollarSign />
 View Revenue Reports</div>
        </div>
      </div>

      <div className="admn-dbt-grid-2">
        <div className="addbtgr-card">
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

        <div className="admn-bsd-card">
          <h3>Booking Status Distribution</h3>
          {/* <StatCard value="1,247" label="Total Hotels Onboarded" trend="+12.5%" positive={true} Icon={FaClock} iconClass="blue"/>
          <StatCard value="1,247" label="Total Hotels Onboarded" trend="+12.5%" positive={true} Icon={FaClock} iconClass="blue"/>
          <StatCard value="1,247" label="Total Hotels Onboarded" trend="+12.5%" positive={true} Icon={FaClock} iconClass="blue"/>
          <StatCard value="1,247" label="Total Hotels Onboarded" trend="+12.5%" positive={true} Icon={FaClock} iconClass="blue"/> */}
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

      <div className="admn-bsd-card">
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
