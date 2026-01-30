// Mytrips.jsx
import React from "react";
import {
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiChevronRight,
} from "react-icons/fi";
import "./mytrips.scss";

const trips = [
  {
    name: "Sunset Paradise Resort",
    location: "Bali, Indonesia",
    checkin: "Feb 15, 2026",
    checkout: "Feb 20, 2026",
    duration: "5 nights",
    room: "Deluxe Ocean View",
    guests: "2 Guests",
    id: "BK001",
    status: "confirmed",
    img: "https://images.unsplash.com/photo-1501117716987-c8e1ecb2101d",
  },
  {
    name: "Mountain View Lodge",
    location: "Swiss Alps, Switzerland",
    checkin: "Mar 10, 2026",
    checkout: "Mar 15, 2026",
    duration: "5 nights",
    room: "Premium Mountain Suite",
    guests: "4 Guests",
    id: "BK002",
    status: "confirmed",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  },
  {
    name: "Urban Boutique Hotel",
    location: "Tokyo, Japan",
    checkin: "Apr 1, 2026",
    checkout: "Apr 5, 2026",
    duration: "4 nights",
    room: "Executive Suite",
    guests: "2 Guests",
    id: "BK003",
    status: "pending",
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
  },
];

const TripCard = ({ trip }) => {
  const {
    name,
    location,
    checkin,
    checkout,
    duration,
    room,
    guests,
    id,
    status,
    img,
  } = trip;

  return (
    <div className="trip-row">
      <img src={img} alt={name} />

      <div className="trip-mid">
        <h3>{name}</h3>
        <p className="loc">
          <FiMapPin /> {location}
        </p>

        <div className="meta">
          <div>
            <FiCalendar /> <strong>{checkin}</strong>
          </div>
          <div>
            <FiCalendar /> <strong>{checkout}</strong>
          </div>
          <div>
            <strong>{duration}</strong>
          </div>
        </div>

        <p>
          Room: <strong>{room}</strong>
        </p>
        <p>
          <FiUsers /> {guests}
        </p>
        <p className="bid">Booking ID: {id}</p>
      </div>

      <div className="trip-actions">
        <span className={`status ${status}`}>{status}</span>
        <button className="primary">
          View Details <FiChevronRight />
        </button>
        <button className="outline">Modify Dates</button>
        <button className={`danger ${status === "pending" ? "disabled" : ""}`}>
          Cancel Booking
        </button>
      </div>
    </div>
  );
};

const Mytrips = () => {
  return (
    <div className="mt-wrap">
      <h2>My Trips</h2>
      <p className="sub">Manage your upcoming stays</p>

      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
};

export default Mytrips;
