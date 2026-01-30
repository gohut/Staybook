// Businesshis.jsx
import React from "react";
import {
  FiMapPin,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiRotateCcw,
  FiClock,
} from "react-icons/fi";
import "./Businesshis.scss";

const bookings = [
  {
    hotel: "Grand Plaza Hotel",
    location: "New York, USA",
    checkin: "Dec 10, 2025",
    checkout: "Dec 15, 2025",
    room: "Executive Suite",
    paid: "$1500.00",
    id: "BK001",
    status: "completed",
    img: "https://images.unsplash.com/photo-1501117716987-c8e1ecb2101d",
  },
  {
    hotel: "Beachside Resort",
    location: "Maldives",
    checkin: "Oct 5, 2025",
    checkout: "Oct 12, 2025",
    room: "Ocean Villa",
    paid: "$3200.00",
    id: "BK002",
    status: "completed",
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
  },
  {
    hotel: "Mountain Lodge",
    location: "Aspen, USA",
    checkin: "Aug 20, 2025",
    checkout: "Aug 25, 2025",
    room: "Deluxe Room",
    paid: "$800.00",
    id: "BK003",
    status: "cancelled",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  },
  {
    hotel: "City Center Hotel",
    location: "London, UK",
    checkin: "Jul 1, 2025",
    checkout: "Jul 5, 2025",
    room: "Standard Room",
    paid: "$600.00",
    id: "BK004",
    status: "completed",
    img: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a",
  },
  {
    hotel: "Desert Oasis Resort",
    location: "Dubai, UAE",
    checkin: "May 15, 2025",
    checkout: "May 20, 2025",
    room: "Presidential Suite",
    paid: "$2500.00",
    id: "BK005",
    status: "noshow",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  },
];

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
  return (
    <div className="bh-card">
      <img src={b.img} alt={b.hotel} />

      <div className="bh-mid">
        <h3>{b.hotel}</h3>
        <p className="loc">
          <FiMapPin /> {b.location}
        </p>

        <div className="bh-dates">
          <div>
            <label>Check-in</label>
            <strong>{b.checkin}</strong>
          </div>
          <div>
            <label>Check-out</label>
            <strong>{b.checkout}</strong>
          </div>
          <div>
            <label>Room Type</label>
            <strong>{b.room}</strong>
          </div>
          <div>
            <label>Total Paid</label>
            <strong>{b.paid}</strong>
          </div>
        </div>

        <div className="bh-foot">
          <span>Booking ID: {b.id}</span>
          {b.status === "completed" && (
            <button className="rebook">
              <FiRotateCcw /> Rebook
            </button>
          )}
        </div>
      </div>

      <StatusBadge status={b.status} />
    </div>
  );
};

const Businesshis = () => {
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

      <p className="count">Showing {bookings.length} of {bookings.length} bookings</p>

      {bookings.map((b) => (
        <BookingCard key={b.id} b={b} />
      ))}
    </div>
  );
};

export default Businesshis;
