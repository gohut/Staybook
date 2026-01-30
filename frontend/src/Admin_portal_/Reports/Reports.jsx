// Reports.jsx
import React from "react";
import { FiDownload, FiCalendar } from "react-icons/fi";
import "./Reports.scss";

const trends = [
  ["Jul", 234, "+12%", "$45,600"],
  ["Aug", 289, "+23%", "$52,300"],
  ["Sep", 312, "+8%", "$58,900"],
  ["Oct", 278, "-11%", "$51,200"],
  ["Nov", 334, "+20%", "$62,800"],
  ["Dec", 398, "+19%", "$74,500"],
  ["Jan", 421, "+6%", "$83,200"],
];

const sources = [
  ["Direct", 3456, "39%", "blue"],
  ["Organic Search", 2234, "25%", "green"],
  ["Paid Ads", 1567, "18%", "orange"],
  ["Referral", 890, "10%", "purple"],
  ["Social Media", 1243, "14%", "pink"],
];

const Reports = () => {
  return (
    <div className="rp-container">
      <div className="rp-head">
        <div>
          <h1>Reports & Analytics</h1>
          <p>Deep insights for decision-making</p>
        </div>
        <div className="rp-actions">
          <button><FiDownload /> Export PDF</button>
          <button className="outline"><FiDownload /> Export CSV</button>
        </div>
      </div>

      <div className="rp-filters">
        <select><option>Booking Trends</option></select>
        <button className="date"><FiCalendar /> Last 30 Days</button>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <span>Total Bookings</span>
          <h2>8,934</h2>
          <small className="up">+24.1%</small>
        </div>
        <div className="stat-card">
          <span>Total Revenue</span>
          <h2>$534,200</h2>
          <small className="up">+18.7%</small>
        </div>
        <div className="stat-card">
          <span>Commission Earned</span>
          <h2>$80,130</h2>
          <small className="up">+21.3%</small>
        </div>
        <div className="stat-card">
          <span>Avg. Booking Value</span>
          <h2>$598</h2>
          <small className="down">-3.2%</small>
        </div>
      </div>

      <div className="card">
        <h3>Booking Trends Over Time</h3>
        {trends.map(([m, v, p, amt]) => (
          <div className="trend-row" key={m}>
            <span>{m} — {v} bookings</span>
            <div className="bar">
              <div className="fill" style={{ width: `${v / 4.5}%` }} />
            </div>
            <span className={p.includes("-") ? "down" : "up"}>{p}</span>
            <strong>{amt}</strong>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Booking Sources Distribution</h3>
        {sources.map(([n, v, p, c]) => (
          <div className="source-row" key={n}>
            <span>{n}</span>
            <div className="bar">
              <div className={`fill ${c}`} style={{ width: p }} />
            </div>
            <strong>{v} ({p})</strong>
          </div>
        ))}
        <div className="total">
          <span>Total Bookings from All Sources</span>
          <strong>9,390</strong>
        </div>
      </div>
    </div>
  );
};

export default Reports;
