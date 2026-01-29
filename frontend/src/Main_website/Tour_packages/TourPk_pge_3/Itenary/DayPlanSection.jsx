// DayPlanSection.jsx
import "./DayPlanSection.css";
import {
  FaPlane,
  FaCar,
  FaHotel,
  FaUtensils,
  FaLightbulb,
  FaChevronDown,
} from "react-icons/fa";

const DayPlanSection = () => {
  return (
    <div className="dayplan-wrapper">
      {/* TOP SUMMARY BAR */}
      <div className="plan-summary">
        <span className="pill active">5 DAY PLAN</span>
        <span>2 TRANSFERS</span>
        <span>1 HOTEL</span>
        <span>4 MEALS</span>
      </div>

      <div className="dayplan-body">
        {/* LEFT DATE COLUMN */}
        <div className="date-column">
          <h4>Day Plan</h4>
          <ul>
            <li className="active">06 Feb, Fri</li>
            <li>07 Feb, Sat</li>
            <li>08 Feb, Sun</li>
            <li>09 Feb, Mon</li>
            <li>10 Feb, Tue</li>
          </ul>
        </div>

        {/* RIGHT CONTENT */}
        <div className="day-content">
          {/* DAY HEADER */}
          <div className="day-header">
            <span className="day-tag">Day 1</span>
            <span className="location">Goa</span>
            <span className="included">
              INCLUDED : 🏨 1 Hotel &nbsp; 🚗 1 Transfer
            </span>
          </div>

          {/* FLIGHT */}
          <div className="section">
            <div className="section-title">
              <FaPlane /> FLIGHT <FaChevronDown />
            </div>
            <p>Arrival in Goa</p>
            <p className="note">
              <span>Please Note :</span> You need to reach Goa on your own
            </p>
            <div className="info-box">
              There are more ways to reach your destination
              <span> VIEW TRANSPORT OPTION(S)</span>
            </div>
          </div>

          {/* TRANSFER */}
          <div className="section">
            <div className="section-title between">
              <div>
                <FaCar /> TRANSFER · Airport to hotel in Goa
              </div>
              <div className="actions">REMOVE | MODIFY</div>
            </div>

            <div className="transfer-card">
              <img src="/car.png" alt="car" />
              <div>
                <h4>Private Transfer</h4>
                <p>
                  Travel comfortably in a private vehicle from either Goa
                  Airports to your hotel in Goa.
                  <span className="read"> Read More...</span>
                </p>
                <span className="sub">📍 Airport to Hotel</span>
              </div>
            </div>
          </div>

          {/* HOTEL */}
          <div className="section">
            <div className="section-title between">
              <div>
                <FaHotel /> HOTEL · 4 Nights · In Goa
              </div>
              <div className="actions">CHANGE</div>
            </div>

            <div className="hotel-card">
              <img src="/hotel.jpg" alt="hotel" />
              <div className="hotel-info">
                <h4>
                  Turtle Beach Resort - Morjim <span>★★★★☆</span>
                </h4>
                <p>Morjim · 8 minutes walk to Morjim Beach</p>
                <p>📅 Fri 6 Feb - Tue 10 Feb, 4 Nights</p>
                <p className="room">Classic Room</p>
                <ul>
                  <li>Breakfast is included</li>
                  <li>Complimentary Happy Hours with 2+1 offer</li>
                  <li>
                    15% discount on food & beverages with à-la-carte selection
                  </li>
                  <li>Complimentary welcome drinks on arrival</li>
                </ul>
                <span className="link">More Room Options</span>
              </div>
            </div>
          </div>

          {/* ADD ACTIVITY */}
          <div className="add-box">
            <FaLightbulb />
            <div>
              <h4>Add Activities to your day</h4>
              <p>
                Spend the day at leisure or add an activity, transfer or meal to
                your day
              </p>
            </div>
            <span className="add">ADD TO DAY</span>
          </div>

          {/* DAY 2 */}
          <div className="day-header">
            <span className="day-tag">Day 2</span>
            <span className="location">Goa</span>
            <span className="included">
              INCLUDED : <FaUtensils /> 1 Meal
            </span>
          </div>

          <div className="section">
            <div className="section-title">
              <FaUtensils /> MEAL · Breakfast · In Goa <FaChevronDown />
            </div>
          </div>

          <div className="add-box">
            <FaLightbulb />
            <div>
              <h4>Add Activities to your day</h4>
              <p>
                Spend the day at leisure or add an activity, transfer or meal to
                your day
              </p>
            </div>
            <span className="add">ADD TO DAY</span>
          </div>

          {/* DAY 3 */}
          <div className="day-header">
            <span className="day-tag">Day 3</span>
            <span className="location">Goa</span>
            <span className="included">
              INCLUDED : <FaUtensils /> 1 Meal
            </span>
          </div>

          <div className="section">
            <div className="section-title">
              <FaUtensils /> MEAL · Breakfast · In Goa <FaChevronDown />
            </div>
          </div>

          <div className="add-box">
            <FaLightbulb />
            <div>
              <h4>Add Activities to your day</h4>
              <p>
                Spend the day at leisure or add an activity, transfer or meal to
                your day
              </p>
            </div>
            <span className="add">ADD TO DAY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayPlanSection;
