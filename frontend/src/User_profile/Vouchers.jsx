// Vouchers.jsx
import React from "react";
import {
  FiMapPin,
  FiCalendar,
  FiDownload,
  FiEye,
} from "react-icons/fi";
import "./Vouchers.css";

const vouchers = [
  {
    hotel: "Sunset Paradise Resort",
    location: "Bali, Indonesia",
    checkin: "Feb 15, 2026",
    checkout: "Feb 20, 2026",
    id: "BK001",
    generated: "January 10, 2026",
    status: "upcoming",
  },
  {
    hotel: "Mountain View Lodge",
    location: "Swiss Alps, Switzerland",
    checkin: "Mar 10, 2026",
    checkout: "Mar 15, 2026",
    id: "BK002",
    generated: "January 12, 2026",
    status: "upcoming",
  },
  {
    hotel: "Grand Plaza Hotel",
    location: "New York, USA",
    checkin: "Dec 10, 2025",
    checkout: "Dec 15, 2025",
    id: "BK003",
    generated: "November 28, 2025",
    status: "completed",
  },
];

const VoucherCard = ({ v }) => {
  return (
    <div className="vc-card">
      <div className="vc-left">
        <h3>{v.hotel}</h3>
        <p className="loc">
          <FiMapPin /> {v.location}
        </p>

        <div className="vc-dates">
          <div>
            <FiCalendar />
            <div>
              <label>Check-in</label>
              <strong>{v.checkin}</strong>
            </div>
          </div>
          <div>
            <FiCalendar />
            <div>
              <label>Check-out</label>
              <strong>{v.checkout}</strong>
            </div>
          </div>
        </div>

        <p className="gen">Generated on {v.generated}</p>
      </div>

      <div className="vc-mid">
        <label>Booking ID</label>
        <strong>{v.id}</strong>
      </div>

      <div className="vc-actions">
        <span className={`vc-status ${v.status}`}>
          {v.status === "upcoming" ? "Upcoming" : "Completed"}
        </span>

        <button className="outline">
          <FiEye /> Preview
        </button>
        <button className="primary">
          <FiDownload /> Voucher
        </button>
        <button className="invoice">
          <FiDownload /> Invoice
        </button>
      </div>
    </div>
  );
};

const Vouchers = () => {
  return (
    <div className="vc-wrap">
      <div className="vc-head">
        <div>
          <h2>Vouchers & Documents</h2>
          <p>Access your booking confirmations and invoices</p>
        </div>
        <button className="primary">
          <FiDownload /> Download All
        </button>
      </div>

      {vouchers.map((v) => (
        <VoucherCard key={v.id} v={v} />
      ))}
    </div>
  );
};

export default Vouchers;
