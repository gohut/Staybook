// BookingsRevenue.jsx
import React, { useEffect, useMemo, useState } from "react";
import "./bookingrevenue.scss";
import { listHotelBookings } from "../../Api/booking/bookingApi";

const BookingRevenue = ({ searchQuery = "" }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await listHotelBookings();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err?.message || "Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const filteredBookings = useMemo(() => {
    if (!searchQuery.trim()) return bookings;
    const needle = searchQuery.toLowerCase();
    return bookings.filter((b) => {
      const guestNames = Array.isArray(b.guestNames) ? b.guestNames.join(", ") : "";
      return [b.hotelName, b.bookingId, b.id, guestNames]
        .filter(Boolean)
        .some((value) => value.toString().toLowerCase().includes(needle));
    });
  }, [bookings, searchQuery]);

  const stats = useMemo(() => {
    const totalBookings = filteredBookings.length;
    const totalRevenue = filteredBookings.reduce(
      (sum, b) => sum + (Number(b.bookingAmount) || 0),
      0
    );
    const totalCommission = filteredBookings.reduce(
      (sum, b) => sum + (Number(b.commission) || 0),
      0
    );
    const pendingPayouts = filteredBookings.reduce((sum, b) => {
      const status = (b.paymentStatus || "").toUpperCase();
      if (status === "PAID" || status === "SETTLED") {
        return sum;
      }
      return sum + (Number(b.commission) || 0);
    }, 0);

    return {
      totalBookings,
      totalRevenue,
      totalCommission,
      pendingPayouts,
    };
  }, [filteredBookings]);

  const formatDateRange = (checkIn, checkOut) => {
    if (!checkIn && !checkOut) return "-";
    const start = checkIn ? new Date(checkIn).toLocaleDateString() : "-";
    const end = checkOut ? new Date(checkOut).toLocaleDateString() : "-";
    return `${start} - ${end}`;
  };

  return (
    <div className="br-container">
      <h1>Bookings & Commission Revenue</h1>
      <p className="subtitle">Track platform transactions and earnings</p>

      <div className="stats-row">
        <div className="stat-card">
          <span>Total Bookings</span>
          <h2>{stats.totalBookings}</h2>
          <small className="green">Live data from inventory</small>
        </div>
        <div className="stat-card">
          <span>Total Revenue</span>
          <h2>₹{stats.totalRevenue.toFixed(2)}</h2>
          <small>Booking value</small>
        </div>
        <div className="stat-card">
          <span>Commission Earned</span>
          <h2>₹{stats.totalCommission.toFixed(2)}</h2>
          <small className="green">Platform earnings</small>
        </div>
        <div className="stat-card">
          <span>Pending Payouts</span>
          <h2>₹{stats.pendingPayouts.toFixed(2)}</h2>
          <small>Awaiting settlement</small>
        </div>
      </div>

      <div className="table-card">
        {loading ? (
          <p className="muted">Loading bookings...</p>
        ) : error ? (
          <p className="muted">{error}</p>
        ) : filteredBookings.length === 0 ? (
          <p className="muted">No bookings found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Hotel Name</th>
                <th>Guest Name</th>
                <th>Booking Amount</th>
                <th>Commission</th>
                <th>Payment Status</th>
                <th>Booking Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((d) => (
                <tr key={d.id || d.bookingId}>
                  <td>{d.bookingId || d.id}</td>
                  <td>
                    <strong>{d.hotelName}</strong>
                    <div className="muted">
                      {formatDateRange(d.checkInDate, d.checkOutDate)}
                    </div>
                  </td>
                  <td>{(d.guestNames || []).join(", ") || "-"}</td>
                  <td>₹{(Number(d.bookingAmount) || 0).toFixed(2)}</td>
                  <td>₹{(Number(d.commission) || 0).toFixed(2)}</td>
                  <td>
                    <span className={`pill ${(d.paymentStatus || "").toLowerCase()}`}>
                      {d.paymentStatus || "Pending"}
                    </span>
                  </td>
                  <td>
                    <span className={`pill ${(d.bookingStatus || "").toLowerCase()}`}>
                      {d.bookingStatus || "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookingRevenue;
