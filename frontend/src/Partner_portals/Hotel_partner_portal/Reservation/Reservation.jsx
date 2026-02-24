// Reservation.jsx
import { useEffect, useMemo, useState } from "react";
import "./Reservation.scss";
import {
  FiEye,
  FiMail,
  FiPhone,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiX,
} from "react-icons/fi";
import { listHotelBookings, updateHotelBookingStatus } from "../../Api/booking/bookingApi";

const StatCard = ({ label, value, type }) => (
  <div className={`stat-card ${type}`}>
    <p>{label}</p>
    <h3>{value}</h3>
  </div>
);

const formatLabel = (value) => {
  if (!value) return "-";
  return value
    .toString()
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const toClass = (value) =>
  (value || "")
    .toString()
    .toLowerCase()
    .replace(/_/g, "-");

const StatusBadge = ({ status }) => (
  <span className={`status-badge ${toClass(status)}`}>{formatLabel(status)}</span>
);

const PaymentBadge = ({ payment }) => (
  <span className={`payment-badge ${toClass(payment)}`}>{formatLabel(payment)}</span>
);

const Reservation = ({ readOnly = false }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ paymentStatus: "PENDING", bookingStatus: "BOOKED" });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const canEdit = !readOnly;

  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await listHotelBookings();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err?.message || "Failed to load reservations.");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const stats = useMemo(() => {
    const total = bookings.length;
    const confirmed = bookings.filter((b) =>
      ["BOOKED", "CONFIRMED"].includes((b.bookingStatus || "").toUpperCase())
    ).length;
    const completed = bookings.filter(
      (b) => (b.bookingStatus || "").toUpperCase() === "COMPLETED"
    ).length;
    const noShows = bookings.filter(
      (b) => (b.bookingStatus || "").toUpperCase() === "NO_SHOW"
    ).length;

    return { total, confirmed, completed, noShows };
  }, [bookings]);

  const results = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return [];
    return bookings.filter((b) => {
      const id = (b.bookingId || b.id || "").toString().toLowerCase();
      const email = (b.guestEmail || "").toLowerCase();
      return id.includes(query) || email.includes(query);
    });
  }, [bookings, searchTerm]);

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setForm({
      paymentStatus: (booking.paymentStatus || "PENDING").toUpperCase(),
      bookingStatus: (booking.bookingStatus || "BOOKED").toUpperCase(),
    });
    setModalOpen(true);
    setSaveError("");
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBooking(null);
    setSaveError("");
  };

  const handleSave = async () => {
    const bookingKey = selectedBooking?.bookingId || selectedBooking?.id;
    if (!bookingKey) return;
    setSaving(true);
    setSaveError("");
    try {
      const updated = await updateHotelBookingStatus(bookingKey, {
        paymentStatus: form.paymentStatus,
        bookingStatus: form.bookingStatus,
      });
      setBookings((prev) =>
        prev.map((b) => {
          if (updated.bookingId && b.bookingId === updated.bookingId) return updated;
          if (!updated.bookingId && updated.id && b.id === updated.id) return updated;
          return b;
        })
      );
      closeModal();
    } catch (err) {
      setSaveError(err?.message || "Failed to update reservation.");
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (value) => {
    if (!value) return "-";
    try {
      return new Date(value).toLocaleDateString();
    } catch {
      return value;
    }
  };

  return (
    <div className="reservation-page">
      <div className="page-head">
        <h2>Reservations</h2>
        <p>View and manage all bookings</p>
      </div>

      <div className="filter-card">
        <div className="search-box">
          <FiSearch />
          <input
            placeholder="Search by booking ID or guest email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="filter-btn"><FiFilter /> All Statuses</button>
        <button className="filter-btn"><FiCalendar /> Date Range</button>
      </div>

      {searchTerm.trim() && (
        <div className="search-results">
          {results.length === 0 ? (
            <div className="search-empty">No matches found.</div>
          ) : (
            results.slice(0, 6).map((booking) => (
              <button
                key={booking.bookingId || booking.id}
                className="search-result"
                type="button"
                onClick={() => openModal(booking)}
              >
                <div>
                  <strong>{booking.bookingId || booking.id}</strong>
                  <span>{booking.guestEmail || "No email"}</span>
                </div>
                <span>{formatLabel(booking.bookingStatus)}</span>
              </button>
            ))
          )}
        </div>
      )}

      <div className="stats-grid">
        <StatCard label="Total Reservations" value={stats.total} />
        <StatCard label="Confirmed" value={stats.confirmed} type="confirmed" />
        <StatCard label="Completed" value={stats.completed} type="completed" />
        <StatCard label="No-Shows" value={stats.noShows} type="noshow" />
      </div>

      <div className="table-card">
        {loading ? (
          <p className="table-message">Loading reservations...</p>
        ) : error ? (
          <p className="table-message">{error}</p>
        ) : bookings.length === 0 ? (
          <p className="table-message">No reservations found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Reservation ID</th>
                <th>Guest Name</th>
                <th>Room Type</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.bookingId || booking.id}>
                  <td>{booking.bookingId || booking.id}</td>
                  <td>
                    <strong>{booking.guestNames?.[0] || "Guest"}</strong>
                    <span>{booking.guestNames?.length || 0} guests</span>
                  </td>
                  <td>{booking.roomType || "Standard"}</td>
                  <td>{formatDate(booking.checkInDate)}</td>
                  <td>{formatDate(booking.checkOutDate)}</td>
                  <td>${Number(booking.bookingAmount || 0).toFixed(2)}</td>
                  <td><PaymentBadge payment={booking.paymentStatus || "PENDING"} /></td>
                  <td><StatusBadge status={booking.bookingStatus || "BOOKED"} /></td>
                  <td className="actions">
                    <FiEye onClick={() => openModal(booking)} />
                    <FiMail />
                    <FiPhone />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && selectedBooking && (
        <div className="reservation-modal">
          <div className="reservation-modal-content">
            <div className="modal-head">
              <div>
                <h3>Reservation Details</h3>
                <p>{selectedBooking.bookingId}</p>
              </div>
              <button className="close-btn" onClick={closeModal} type="button">
                <FiX />
              </button>
            </div>

            <div className="modal-grid">
              <div>
                <label>Guest</label>
                <div className="modal-value">
                  {(selectedBooking.guestNames || []).join(", ") || "Guest"}
                </div>
              </div>
              <div>
                <label>Email</label>
                <div className="modal-value">{selectedBooking.guestEmail || "-"}</div>
              </div>
              <div>
                <label>Check-in</label>
                <div className="modal-value">{formatDate(selectedBooking.checkInDate)}</div>
              </div>
              <div>
                <label>Check-out</label>
                <div className="modal-value">{formatDate(selectedBooking.checkOutDate)}</div>
              </div>
              <div>
                <label>Payment Status</label>
                <select
                  value={form.paymentStatus}
                  onChange={(e) => setForm((prev) => ({ ...prev, paymentStatus: e.target.value }))}
                  disabled={!canEdit}
                >
                  <option value="PAID">Paid</option>
                  <option value="PENDING">Pending</option>
                </select>
              </div>
              <div>
                <label>Booking Status</label>
                <select
                  value={form.bookingStatus}
                  onChange={(e) => setForm((prev) => ({ ...prev, bookingStatus: e.target.value }))}
                  disabled={!canEdit}
                >
                  <option value="BOOKED">Booked</option>
                  <option value="ARRIVED">Arrived</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="NO_SHOW">No-Show</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>

            {saveError && <p className="modal-error">{saveError}</p>}

            <div className="modal-actions">
              <button className="secondary" onClick={closeModal} type="button">
                Close
              </button>
              {canEdit && (
                <button className="primary" onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservation;
