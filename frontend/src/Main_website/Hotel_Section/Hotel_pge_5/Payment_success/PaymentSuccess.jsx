// PaymentSuccess.jsx
import React from "react";
import "./PaymentSuccess.scss";
import {
  FaCheckCircle,
  FaHotel,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaDownload,
  FaEnvelope,
} from "react-icons/fa";

export default function PaymentSuccess() {
  return (
    <div className="success-wrapper">
      <div className="success-card">
        <FaCheckCircle className="success-icon" />

        <h2>Payment Successful!</h2>
        <p className="subtitle">
          Your booking has been confirmed. We've sent a confirmation email with
          all the details.
        </p>

        <div className="confirmation-box">
          <span>Confirmation Number</span>
          <strong>RZPRIXUTDXGB8</strong>
        </div>

        <h3>Booking Details</h3>

        <div className="booking-box">
          <div className="booking-title">
            <FaHotel />
            <div>
              <span>Hotel Booking</span>
              <strong>Grand Plaza Hotel & Spa</strong>
            </div>
          </div>

          <div className="booking-row">
            <FaMapMarkerAlt /> Bali, Indonesia
          </div>
          <div className="booking-row">
            <FaCalendarAlt /> Feb 15, 2026 - Feb 20, 2026
          </div>
          <div className="booking-row">
            <FaUser /> 2 Guests · 1 Room
          </div>
        </div>

        <h3>Payment Summary</h3>

        <div className="summary-box">
          <div className="summary-row">
            <span>Payment Method</span>
            <span>Razorpay</span>
          </div>
          <div className="summary-row">
            <span>Transaction ID</span>
            <span>RZPRIXUTDXGB8</span>
          </div>

          <hr />

          <div className="summary-row">
            <span>1 Room</span>
            <span>₹850.00</span>
          </div>
          <div className="summary-row">
            <span>Taxes & Fees</span>
            <span>₹127.50</span>
          </div>
          <div className="summary-row">
            <span>Service Fee</span>
            <span>₹25.00</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Total Paid</span>
            <span>₹1002.50</span>
          </div>
        </div>

        <div className="next-box">
          <h4>What's Next?</h4>
          <ul>
            <li>Check your email for the booking confirmation and e-tickets</li>
            <li>You can download your booking voucher using the button below</li>
            <li>Save your confirmation number for future reference</li>
            <li>
              Present this confirmation at check-in along with a valid ID
            </li>
          </ul>
        </div>

        <div className="actions">
          <button className="primary-btn">
            <FaDownload /> Download Voucher
          </button>
          <button className="secondary-btn">
            <FaEnvelope /> Email Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
