// Businesshis.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  FiMapPin,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiRotateCcw,
  FiClock,
} from "react-icons/fi";
import "./Businesshis.scss";
import { fetchTrips } from "../../Api/userProfile/userProfileApi";

const StatusBadge = ({ status }) => {
  if (status === "completed")
    return (
      <span className="bh-status completed">
        <FiCheckCircle /> Completed
      </span>
    );
  if (status === "cancelled")
    return (
      <span className="bh-status cancelled">
        <FiXCircle /> Cancelled
      </span>
    );
  return (
    <span className="bh-status noshow">
      <FiClock /> No-show
    </span>
  );
};

const BookingCard = ({ b }) => {
  const formatDate = (value) =>
    value ? new Date(value).toLocaleDateString() : "-";

  return (
    <div className="bh-card">
      <img src={b.imageUrl || ""} alt={b.hotelName} />

      <div className="bh-mid">
        <h3>{b.hotelName}</h3>
        <p className="loc">
          <FiMapPin /> {b.location}
        </p>

        <div className="bh-dates">
          <div>
            <label>Check-in</label>
            <strong>{formatDate(b.checkInDate)}</strong>
          </div>
          <div>
            <label>Check-out</label>
            <strong>{formatDate(b.checkOutDate)}</strong>
          </div>
          <div>
            <label>Room Type</label>
            <strong>{b.roomType}</strong>
          </div>
          <div>
            <label>Total Paid</label>
            <strong>-</strong>
          </div>
        </div>

        <div className="bh-foot">
          <span>Booking ID: {b.bookingId}</span>
          {b.status?.toLowerCase() === "completed" && (
            <button className="rebook">
              <FiRotateCcw /> Rebook
            </button>
          )}
        </div>
      </div>

      <StatusBadge status={b.status?.toLowerCase()} />
    </div>
  );
};

const Businesshis = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const historyBookings = useMemo(() => {
    return bookings.filter((booking) =>
      ["COMPLETED", "CANCELLED", "NOT_SHOWN"].includes(booking.status)
    );
  }, [bookings]);

  useEffect(() => {
    let isActive = true;
    const loadBookings = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchTrips({ page: 0, size: 50 });
        if (!isActive) return;
        setBookings(data);
      } catch (err) {
        if (!isActive) return;
        setError(err?.message || "Failed to load booking history");
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadBookings();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="bh-wrap">
      <h2>Booking History</h2>
      <p className="sub">
        View your past bookings and cancelled reservations
      </p>

      <div className="bh-filters">
        <input placeholder="Search by hotel or booking ID..." />
        <select>
          <option>All Status</option>
        </select>
        <select>
          <option>All Time</option>
        </select>
      </div>

      {loading && <p>Loading booking history...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <p className="count">
          Showing {historyBookings.length} of {historyBookings.length} bookings
        </p>
      )}

      {!loading && !error && historyBookings.length === 0 && (
        <p>No booking history yet.</p>
      )}

      {historyBookings.map((b) => (
        <BookingCard key={b.bookingId} b={b} />
      ))}
    </div>
  );
};

export default Businesshis;
