// BookingSummary.jsx
import React from "react";
import "./BookingSummary.scss";
import { FaHotel, FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";

export default function BookingSummary() {
  return (
    <div className="booking-summary">
      <h3>Booking Summary</h3>

      <div className="summary-item">
        <FaHotel />
        <div>
          <span>Hotel Booking</span>
          <strong>Grand Plaza Hotel & Spa</strong>
        </div>
      </div>

      <div className="summary-item"><FaMapMarkerAlt /> Bali, Indonesia</div>
      <div className="summary-item"><FaCalendarAlt /> 2026-02-15 → 2026-02-20</div>
      <div className="summary-item"><FaUser /> 2 Guests · 1 Room</div>

      <hr />

      <div className="price-row"><span>1 Room</span><span>₹850.00</span></div>
      <div className="price-row"><span>Taxes & Fees</span><span>₹127.50</span></div>
      <div className="price-row"><span>Service Fee</span><span>₹25.00</span></div>

      <hr />

      <div className="total">
        <span>Total Amount</span>
        <strong>₹1002.50</strong>
      </div>
    </div>
  );
}
