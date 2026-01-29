// FareSummary.jsx
import { FaChevronUp, FaMinusCircle, FaCheckSquare } from "react-icons/fa";
import "./FareSummary.css";

const FareSummary = () => {
  return (
    <div className="fare-wrapper">
      <div className="update-box">
        <div className="update-head">
          <span>UPDATED</span>
          <FaChevronUp />
        </div>
        <p>
          Price of this package has gone down by <b>Rs.660</b> from Rs.23,622 to
          Rs.22,962. Book before prices increase!
        </p>
        <p>
          Cancellation is no longer available on this package. Booking will be
          non refundable.
        </p>
        <p>
          Date Change option is no longer available on this package. Once booked,
          travel dates cannot be changed.
        </p>
      </div>

      <div className="price-box">
        <div className="total-row">
          <span>GRAND TOTAL - 3 Adults</span>
          <span className="off">6% OFF</span>
        </div>
        <h1>
          ₹22,962 <span>(Inclusive of GST)</span>
        </h1>
        <h4>Pay Full Amount Now</h4>
      </div>

      <div className="fare-breakup">
        <div className="fare-head">
          <h3>Fare Breakup</h3>
          <FaMinusCircle />
        </div>

        <div className="fare-row">
          <div>
            <b>Total Basic Cost</b>
            <p>7,724 x 3 Travellers</p>
          </div>
          <b>₹23,172</b>
        </div>

        <div className="fare-row">
          <div>
            <b>Coupon Discount</b>
            <span className="coupon">MOSTWANTED</span>
            <span className="edit">Edit</span>
          </div>
          <b className="minus">- ₹1,306</b>
        </div>

        <div className="fare-row">
          <div>
            <b>Fees & Taxes</b>
            <p>GST 5.0%</p>
          </div>
          <b>₹1,095</b>
        </div>
      </div>

      <div className="emi-bar">EMI Available on all payment modes</div>

      <div className="info-box">
        <h3>Important Information</h3>
        <label>
          <FaCheckSquare />
          <span>
            I confirm that I have read and I accept{" "}
            <a>Cancellation Policy</a>, <a>User Agreement</a>,{" "}
            <a>Terms of Service</a> and <a>Privacy Policy</a> of MakeMyTrip
          </span>
        </label>
        <button className="pay-btn">PROCEED TO PAYMENTS</button>
      </div>

      <div className="timer-box">
        <div>
          <b>Complete Booking in</b>
          <p>The package price will refresh after that</p>
        </div>
        <div className="timer">08:42 mins</div>
      </div>
    </div>
  );
};

export default FareSummary;
