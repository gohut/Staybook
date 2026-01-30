// Reservation.jsx
import "./Reservation.scss";
import { FiEye, FiMail, FiPhone, FiSearch, FiFilter, FiCalendar } from "react-icons/fi";

const StatCard = ({ label, value, type }) => (
  <div className={`stat-card ${type}`}>
    <p>{label}</p>
    <h3>{value}</h3>
  </div>
);

const StatusBadge = ({ status }) => (
  <span className={`status-badge ${status}`}>{status}</span>
);

const PaymentBadge = ({ payment }) => (
  <span className={`payment-badge ${payment}`}>{payment}</span>
);

const ReservationRow = ({
  id, name, guests, room, checkin, checkout, amount, payment, status
}) => (
  <tr>
    <td>{id}</td>
    <td>
      <strong>{name}</strong>
      <span>{guests} guests</span>
    </td>
    <td>{room}</td>
    <td>{checkin}</td>
    <td>{checkout}</td>
    <td>${amount}</td>
    <td><PaymentBadge payment={payment} /></td>
    <td><StatusBadge status={status} /></td>
    <td className="actions">
      <FiEye />
      <FiMail />
      <FiPhone />
    </td>
  </tr>
);

const Reservation = () => {
  return (
    <div className="reservation-page">
      <div className="page-head">
        <h2>Reservations</h2>
        <p>View and manage all bookings</p>
      </div>

      <div className="filter-card">
        <div className="search-box">
          <FiSearch />
          <input placeholder="Search by guest name, reservation ID, or room type..." />
        </div>
        <button className="filter-btn"><FiFilter /> All Statuses</button>
        <button className="filter-btn"><FiCalendar /> Date Range</button>
      </div>

      <div className="stats-grid">
        <StatCard label="Total Reservations" value="8" />
        <StatCard label="Confirmed" value="4" type="confirmed" />
        <StatCard label="Completed" value="2" type="completed" />
        <StatCard label="No-Shows" value="1" type="noshow" />
      </div>

      <div className="table-card">
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
            <ReservationRow id="RES-2024-001" name="John Anderson" guests="2" room="Deluxe Ocean View" checkin="Jan 20" checkout="Jan 23" amount="750" payment="paid" status="confirmed" />
            <ReservationRow id="RES-2024-002" name="Sarah Mitchell" guests="3" room="Executive Suite" checkin="Jan 18" checkout="Jan 21" amount="1350" payment="paid" status="confirmed" />
            <ReservationRow id="RES-2024-003" name="Michael Chen" guests="2" room="Standard Double" checkin="Jan 19" checkout="Jan 22" amount="540" payment="pending" status="confirmed" />
            <ReservationRow id="RES-2024-004" name="Emily Rodriguez" guests="4" room="Family Suite" checkin="Jan 17" checkout="Jan 20" amount="1140" payment="paid" status="confirmed" />
            <ReservationRow id="RES-2024-005" name="David Thompson" guests="2" room="Deluxe Ocean View" checkin="Jan 15" checkout="Jan 17" amount="500" payment="paid" status="completed" />
            <ReservationRow id="RES-2024-006" name="Lisa Patel" guests="2" room="Executive Suite" checkin="Jan 14" checkout="Jan 16" amount="900" payment="paid" status="completed" />
            <ReservationRow id="RES-2024-007" name="Robert Wilson" guests="1" room="Standard Double" checkin="Jan 13" checkout="Jan 14" amount="180" payment="refunded" status="no-show" />
            <ReservationRow id="RES-2024-008" name="Jennifer Lee" guests="5" room="Family Suite" checkin="Jan 12" checkout="Jan 15" amount="1140" payment="refunded" status="cancelled" />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservation;
