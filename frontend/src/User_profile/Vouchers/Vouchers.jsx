// Vouchers.jsx
import React, { useEffect, useState } from "react";
import {
  FiMapPin,
  FiCalendar,
  FiDownload,
  FiEye,
} from "react-icons/fi";
import "./Vouchers.scss";
import { fetchVouchers } from "../../Api/userProfile/userProfileApi";

const VoucherCard = ({ v }) => {
  const formatDate = (value) =>
    value ? new Date(value).toLocaleDateString() : "-";

  return (
    <div className="vc-card">
      <div className="vc-left">
        <h3>{v.hotelName}</h3>
        <p className="loc">
          <FiMapPin /> {v.location}
        </p>

        <div className="vc-dates">
          <div>
            <FiCalendar />
            <div>
              <label>Check-in</label>
              <strong>{formatDate(v.checkInDate)}</strong>
            </div>
          </div>
          <div>
            <FiCalendar />
            <div>
              <label>Check-out</label>
              <strong>{formatDate(v.checkOutDate)}</strong>
            </div>
          </div>
        </div>

        <p className="gen">Generated on -</p>
      </div>

      <div className="vc-mid">
        <label>Booking ID</label>
        <strong>{v.bookingId}</strong>
      </div>

      <div className="vc-actions">
        <span className={`vc-status ${v.status?.toLowerCase()}`}>
          {v.status?.toLowerCase() === "upcoming" ? "Upcoming" : "Completed"}
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
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;
    const loadVouchers = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchVouchers();
        if (!isActive) return;
        setVouchers(data);
      } catch (err) {
        if (!isActive) return;
        setError(err?.message || "Failed to load vouchers");
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadVouchers();

    return () => {
      isActive = false;
    };
  }, []);

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

      {loading && <p>Loading vouchers...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && vouchers.length === 0 && (
        <p>No vouchers available yet.</p>
      )}

      {vouchers.map((v) => (
        <VoucherCard key={v.bookingId} v={v} />
      ))}
    </div>
  );
};

export default Vouchers;
