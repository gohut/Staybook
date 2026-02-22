// Mytrips.jsx
import React, { useEffect, useState } from "react";
import {
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiChevronRight,
} from "react-icons/fi";
import "./mytrips.scss";
import { fetchTrips } from "../../Api/userProfile/userProfileApi";

const TripCard = ({ trip }) => {
  const {
    hotelName,
    location,
    checkInDate,
    checkOutDate,
    nights,
    roomType,
    guestsCount,
    bookingId,
    status,
    imageUrl,
  } = trip;

  const statusLabel = status ? status.toLowerCase() : "pending";

  const formatDate = (value) =>
    value ? new Date(value).toLocaleDateString() : "-";

  return (
    <div className="trip-row">
      <img src={imageUrl || ""} alt={hotelName} />

      <div className="trip-mid">
        <h3>{hotelName}</h3>
        <p className="loc">
          <FiMapPin /> {location}
        </p>

        <div className="meta">
          <div>
            <FiCalendar />{" "}
            <strong>{formatDate(checkInDate)}</strong>
          </div>
          <div>
            <FiCalendar />{" "}
            <strong>{formatDate(checkOutDate)}</strong>
          </div>
          <div>
            <strong>{nights} nights</strong>
          </div>
        </div>

        <p>
          Room: <strong>{roomType}</strong>
        </p>
        <p>
          <FiUsers /> {guestsCount} Guests
        </p>
        <p className="bid">Booking ID: {bookingId}</p>
      </div>

      <div className="trip-actions">
        <span className={`status ${statusLabel}`}>{statusLabel}</span>
        <button className="primary">
          View Details <FiChevronRight />
        </button>
        <button className="outline">Modify Dates</button>
        <button className={`danger ${statusLabel === "pending" ? "disabled" : ""}`}>
          Cancel Booking
        </button>
      </div>
    </div>
  );
};

const Mytrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;
    const loadTrips = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchTrips({ page: 0, size: 10 });
        if (!isActive) return;
        setTrips(data);
      } catch (err) {
        if (!isActive) return;
        setError(err?.message || "Failed to load trips");
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadTrips();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="mt-wrap">
      <h2>My Trips</h2>
      <p className="sub">Manage your upcoming stays</p>

      {loading && <p>Loading your trips...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && trips.length === 0 && (
        <p>No trips found yet.</p>
      )}

      {trips.map((trip) => (
        <TripCard key={trip.bookingId} trip={trip} />
      ))}
    </div>
  );
};

export default Mytrips;
