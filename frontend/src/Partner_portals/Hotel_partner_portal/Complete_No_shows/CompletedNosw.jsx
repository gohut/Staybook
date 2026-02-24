// CompletedNosw.jsx
import "./CompletedNosw.scss";
import { FiCheckCircle, FiXCircle, FiTrendingDown, FiDollarSign, FiClock } from "react-icons/fi";

const StatCard = ({ label, value, type }) => (
  <div className={`cn-card ${type}`}>
    <div>
      <p>{label}</p>
      <h3>{value}</h3>
    </div>
    {type === "completed" && <FiCheckCircle />}
    {type === "noshow" && <FiXCircle />}
    {type === "rate" && <FiTrendingDown />}
    {type === "revenue" && <FiDollarSign />}
  </div>
);

const StatusBadge = () => <span className="status completed">Completed</span>;

const CompletedRow = ({ id, name, email, room, cin, cout, revenue, time }) => (
  <tr>
    <td>{id}</td>
    <td>
      <strong>{name}</strong>
      <span>{email}</span>
    </td>
    <td>{room}</td>
    <td>{cin}</td>
    <td>{cout}</td>
    <td className="green">${revenue}</td>
    <td><StatusBadge /></td>
    <td className="time">
      <FiClock /> {time}
    </td>
  </tr>
);

const CompletedNosw = () => {
  return (
    <div className="completed-page">
      <div className="page-head">
        <h2>Completed & No-Shows</h2>
        <p>Track stay outcomes and manage records</p>
      </div>

      <div className="stats-grid">
        <StatCard label="Completed Stays" value="2" type="completed" />
        <StatCard label="No-Shows" value="1" type="noshow" />
        <StatCard label="No-Show Rate" value="12.5%" type="rate" />
        <StatCard label="Revenue Lost" value="$180" type="revenue" />
      </div>

      <div className="tabs">
        <button className="tab active">Completed Stays (2)</button>
        <button className="tab">No-Shows (1)</button>
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
              <th>Revenue</th>
              <th>Status</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            <CompletedRow
              id="RES-2024-005"
              name="David Thompson"
              email="d.thompson@email.com"
              room="Deluxe Ocean View"
              cin="15/01/2026"
              cout="17/01/2026"
              revenue="500"
              time="17/01/2026 11:00 AM"
            />
            <CompletedRow
              id="RES-2024-006"
              name="Lisa Patel"
              email="lisa.patel@email.com"
              room="Executive Suite"
              cin="14/01/2026"
              cout="16/01/2026"
              revenue="900"
              time="16/01/2026 11:00 AM"
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedNosw;
