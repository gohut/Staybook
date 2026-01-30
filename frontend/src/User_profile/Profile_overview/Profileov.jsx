// Profileov.jsx
import React from "react";
import {
  FiCalendar,
  FiMapPin,
  FiAward,
  FiClock,
} from "react-icons/fi";
import "./Profileov.scss";

const Profileov = () => {
  return (
    <div className="profile-wrap">
      <div className="profile-card">
        <div className="avatar">JD</div>
        <div>
          <h2>John Doe</h2>
          <p>john.doe@email.com</p>
          <p>+1 (555) 123-4567</p>
          <span className="badge">
            <FiAward /> Gold Traveler
          </span>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat">
          <FiCalendar className="blue" />
          <h3>2</h3>
          <span>Upcoming Trips</span>
        </div>
        <div className="stat">
          <FiMapPin className="purple" />
          <h3>8</h3>
          <span>Past Trips</span>
        </div>
        <div className="stat">
          <FiAward className="green" />
          <h3>12</h3>
          <span>Total Bookings</span>
        </div>
        <div className="stat">
          <FiClock className="orange" />
          <h3>45</h3>
          <span>Days Traveled</span>
        </div>
      </div>

      <div className="trip-card">
        <h3>Next Trip</h3>

        <div className="trip-box">
          <div className="trip-info">
            <h4>Sunset Paradise Resort</h4>
            <p>
              <FiMapPin /> Bali, Indonesia
            </p>

            <div className="dates">
              <div>
                <label>Check-in</label>
                <strong>Feb 15, 2026</strong>
              </div>
              <div>
                <label>Check-out</label>
                <strong>Feb 20, 2026</strong>
              </div>
            </div>

            <p>Room Type: Deluxe Ocean View</p>
            <p>Booking ID: BK001</p>
          </div>

          <div className="trip-actions">
            <span className="status">Confirmed</span>
            <button className="primary">View Details</button>
            <button className="outline">Modify</button>
          </div>
        </div>

        <div className="countdown">
          Your next adventure starts in
          <strong>29 days</strong>
        </div>
      </div>
    </div>
  );
};

export default Profileov;
