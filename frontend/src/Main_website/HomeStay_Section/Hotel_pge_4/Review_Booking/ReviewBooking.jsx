// ReviewBooking.jsx
import "./ReviewBooking.css";
import {
  FaStar,
  FaUtensils,
  FaSpa,
  FaGlassCheers,
  FaTag,
} from "react-icons/fa";

export default function ReviewBooking() {
  return (
    <div className="rb-wrap">
      {/* LEFT CARD */}
      <div className="rb-left">
        <div className="rb-hotel">
          <div className="rb-hotel-info">
            <h2>Hard Rock Hotel Goa Calangute</h2>
            <div className="rb-rating">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              <span className="rb-chip">Couple Friendly</span>
            </div>
            <p className="rb-address">
              370/14/15 Porba Vaddo Calangute Bardez Goa, Goa, India
            </p>
          </div>
          <img
            className="rb-hotel-img"
            src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Hard_Rock_Cafe_logo.svg"
            alt=""
          />
        </div>

        <div className="rb-dates">
          <div className="rb-date">
            <span>CHECK IN</span>
            <strong>Sat 24 Jan 2026</strong>
            <small>3 PM</small>
          </div>

          <div className="rb-night">1 NIGHT</div>

          <div className="rb-date">
            <span>CHECK OUT</span>
            <strong>Sun 25 Jan 2026</strong>
            <small>12 PM</small>
          </div>

          <div className="rb-summary">
            1 Night | 2 Adults | 1 Room
          </div>
        </div>

        <div className="rb-room">
          <div className="rb-room-head">
            <h3>
              Rock Platinum Suite with 30 Mins Couple Massage (Once Per Stay)
            </h3>
            <a>See Inclusions</a>
          </div>

          <ul className="rb-list">
            <li><FaUtensils /> Room with Breakfast</li>
            <li><FaUtensils /> Breakfast included</li>
            <li><FaTag /> 10% off on Food & Beverage services</li>
            <li><FaSpa /> 10% off on session of Spa</li>
          </ul>

          <div className="rb-exp">
            <h4>Experiences Included</h4>
            <p><FaGlassCheers /> Enjoy Happy Hours with 1+1 offer</p>
          </div>

          <div className="rb-refund">
            <strong>Non-Refundable</strong>
            <p>Refund is not applicable for this booking</p>
            <a>Cancellation policy details</a>
          </div>

          <div className="rb-upgrade">
            <strong>Upgrade Your Stay</strong>
            <label>
              <input type="radio" />
              Add Lunch/Dinner for ₹1814 for all guests
            </label>
          </div>
        </div>
      </div>

      {/* RIGHT CARD */}
      <div className="rb-right">
        <h3>Coupon Codes</h3>

        <div className="rb-coupon">
          <input placeholder="Have A Coupon Code?" />
          <button disabled>APPLY</button>
        </div>

        <p className="rb-note">
          No coupon codes applicable for this property.
        </p>

        <div className="rb-gift">
          MMT Gift Cards can be applied at payment step
        </div>
      </div>
    </div>
  );
}
