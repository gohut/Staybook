// CouponCr.jsx
import React from "react";
import { FiX } from "react-icons/fi";
import "./CouponCr.scss";

const CouponCr = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-head">
          <h2>Create New Coupon</h2>
          <FiX onClick={onClose} />
        </div>

        <div className="form-grid">
          <input placeholder="Coupon Name" />
          <input placeholder="Coupon Code" />
          <select><option>Percentage</option><option>Flat</option></select>
          <input placeholder="Discount Value" />
          <input placeholder="Minimum Booking Value" />
          <input placeholder="Maximum Discount Cap" />
          <input placeholder="Valid From" />
          <input placeholder="Valid To" />
          <input placeholder="Usage Limit" />
          <select><option>All Hotels</option></select>
        </div>

        <div className="actions">
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button className="create">Create Coupon</button>
        </div>
      </div>
    </div>
  );
};

export default CouponCr;
