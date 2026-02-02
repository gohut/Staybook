// Availabilitypr.jsx
import "./Availabilitypr.scss";
import { FiChevronLeft, FiChevronRight, FiDollarSign, FiLock } from "react-icons/fi";

const Legend = ({ label, type }) => (
  <div className="legend-item">
    <span className={`legend-dot ${type}`} />
    {label}
  </div>
);

const DayCard = ({ day, price, status, available, active }) => (
  <div className={`day-card ${status} ${active ? "active" : ""}`}>
    <span className="day">{day}</span>
    {price && <h4>${price}</h4>}
    {status === "closed" ? (
      <span className="closed">Closed</span>
    ) : (
      available && <span className="avail">{available} available</span>
    )}
  </div>
);

const Availabilitypr = () => {
  return (
    <div className="pr-availability-page">
      <div className="page-head">
        <h2>Availability & Pricing</h2>
        <p>Manage room inventory and pricing</p>
      </div>

      <section className="pra-card pra-filter-bar">
        <div className="pra-filter-left">
          <div className="pra-select-box">
            Deluxe Ocean View (15 rooms)
          </div>

          <button className="pra-icon-btn"><FiChevronLeft /></button>
          <h3>January 2026</h3>
          <button className="pra-icon-btn"><FiChevronRight /></button>
        </div>

        <div className="filter-right">
          <button className="outline-btn">
            <FiDollarSign /> Bulk Price Update
          </button>
          <button className="outline-btn">
            <FiLock /> Bulk Close Rooms
          </button>
        </div>
      </section>

      <div className="legend">
        <Legend label="Available" type="available" />
        <Legend label="Low Availability" type="low" />
        <Legend label="Fully Booked" type="full" />
        <Legend label="Closed" type="closed" />
      </div>

      <section className="calendar">
        <div className="weekdays">
          <span>Sun</span><span>Mon</span><span>Tue</span>
          <span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>

        <div className="days">
          <DayCard day="1" price="250" status="available" available="10" />
          <DayCard day="2" price="270" status="low" available="2" />
          <DayCard day="3" price="260" status="available" available="14" />
          <DayCard day="4" price="280" status="available" available="13" />
          <DayCard day="5" price="260" status="available" available="12" />
          <DayCard day="6" price="270" status="closed" />
          <DayCard day="7" price="250" status="available" available="15" />
          <DayCard day="8" price="260" status="available" available="3" />
          <DayCard day="9" price="280" status="full" available="0" />
          <DayCard day="10" price="250" status="available" available="15" />
          <DayCard day="11" price="250" status="full" available="0" />
          <DayCard day="12" price="270" status="available" available="9" />
          <DayCard day="13" price="280" status="closed" />
          <DayCard day="14" price="280" status="low" available="1" />
          <DayCard day="15" price="250" status="available" available="14" />
          <DayCard day="16" price="290" status="available" available="3" />
          <DayCard day="17" price="250" status="low" available="2" />
          <DayCard day="18" price="290" status="available" available="6" />
          <DayCard day="19" price="250" status="available" available="14" />
          <DayCard day="20" price="250" status="closed" />
          <DayCard day="21" price="270" status="available" available="15" />
          <DayCard day="22" price="260" status="available" available="12" active />
          <DayCard day="23" price="290" status="available" available="14" />
          <DayCard day="24" price="280" status="available" available="12" />
          <DayCard day="25" price="280" status="available" available="15" />
          <DayCard day="26" price="290" status="available" available="4" />
          <DayCard day="27" price="270" status="available" available="10" />
          <DayCard day="28" price="280" status="available" available="6" />
          <DayCard day="29" price="290" status="available" available="5" />
          <DayCard day="30" price="260" status="available" available="5" />
          <DayCard day="31" price="260" status="closed" />
        </div>
      </section>
    </div>
  );
};

export default Availabilitypr;
