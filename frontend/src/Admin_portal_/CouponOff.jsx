// CouponOff.jsx
import React from "react";
import { FiTag, FiPlus } from "react-icons/fi";
import "./CouponOff.css";

const CouponOff = ({ onCreate }) => {
  return (
    <div className="co-container">
      <div className="co-head">
        <div>
          <h1>Coupons & Offers Management</h1>
          <p>Create and manage promotional offers</p>
        </div>
        <button className="create-btn" onClick={onCreate}>
          <FiPlus /> Create Coupon
        </button>
      </div>

      <div className="stats-row">
        <div className="stat-card"><h2>47</h2><span>Total Coupons</span></div>
        <div className="stat-card green"><h2>32</h2><span>Active Coupons</span></div>
        <div className="stat-card"><h2>1,235</h2><span>Total Usage</span></div>
        <div className="stat-card"><h2>$34,567</h2><span>Total Discount Given</span></div>
      </div>

      <div className="coupon-grid">
        <div className="coupon-card">
          <FiTag className="icon" />
          <h3>Welcome Offer</h3>
          <span className="code">WELCOME50</span>
          <span className="pill active">Active</span>
          <div className="meta">
            <p>Discount: $50</p>
            <p>Min Booking: $200</p>
            <p>Usage: 234 / 1000</p>
            <p>Valid Until: Dec 31</p>
          </div>
        </div>

        <div className="coupon-card">
          <FiTag className="icon" />
          <h3>20% Off Deal</h3>
          <span className="code">SAVE20</span>
          <span className="pill active">Active</span>
          <div className="meta">
            <p>Discount: 20%</p>
            <p>Min Booking: $300</p>
            <p>Usage: 567 / 2000</p>
            <p>Valid Until: Jun 30</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponOff;
