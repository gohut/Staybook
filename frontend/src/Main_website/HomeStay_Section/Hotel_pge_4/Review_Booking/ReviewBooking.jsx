// ReviewBooking.jsx
import "./ReviewBooking.scss";
import { FaStar, FaUtensils, FaSpa, FaGlassCheers, FaTag } from "react-icons/fa";

export default function ReviewBooking({
  hotel,
  bookingSelection,
  checkInDateLabel,
  checkOutDateLabel,
  nights,
  adults,
  children,
  locationLabel,
}) {
  const roomName = bookingSelection?.roomTypeName || "Selected Room";
  const hotelName = bookingSelection?.hotelName || hotel?.name || "Staybook Hotel";
  const hotelAddress =
    hotel?.location?.address ||
    hotel?.location?.city ||
    locationLabel ||
    "Staybook, India";
  const hotelImage =
    bookingSelection?.imageUrl ||
    "https://upload.wikimedia.org/wikipedia/commons/4/4e/Hard_Rock_Cafe_logo.svg";

  return (
    <div className="rb-wrap">
      <div className="rb-left">
        <div className="rb-hotel">
          <div className="rb-hotel-info">
            <h2>{hotelName}</h2>
            <div className="rb-rating">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <span className="rb-chip">Couple Friendly</span>
            </div>
            <p className="rb-address">{hotelAddress}</p>
          </div>
          <img className="rb-hotel-img" src={hotelImage} alt="" />
        </div>

        <div className="rb-dates">
          <div className="rb-date">
            <span>CHECK IN</span>
            <strong>{checkInDateLabel}</strong>
            <small>{hotel?.checkInTime || "3 PM"}</small>
          </div>

          <div className="rb-night">{nights} NIGHT{nights > 1 ? "S" : ""}</div>

          <div className="rb-date">
            <span>CHECK OUT</span>
            <strong>{checkOutDateLabel}</strong>
            <small>{hotel?.checkOutTime || "12 PM"}</small>
          </div>

          <div className="rb-summary">
            {nights} Night{nights > 1 ? "s" : ""} | {adults} Adults{children ? ` | ${children} Children` : ""} | 1 Room
          </div>
        </div>

        <div className="rb-room">
          <div className="rb-room-head">
            <h3>{roomName}</h3>
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
              Add Lunch/Dinner for Rs 1814 for all guests
            </label>
          </div>
        </div>
      </div>

      <div className="rb-right">
        <h3>Coupon Codes</h3>

        <div className="rb-coupon">
          <input placeholder="Have A Coupon Code?" />
          <button disabled>APPLY</button>
        </div>

        <p className="rb-note">No coupon codes applicable for this property.</p>

        <div className="rb-gift">MMT Gift Cards can be applied at payment step</div>
      </div>
    </div>
  );
}
