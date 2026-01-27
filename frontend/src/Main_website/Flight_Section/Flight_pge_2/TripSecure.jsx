import "./TripSecure.css";
import { FaCheckCircle, FaSuitcase, FaUserShield, FaBoxOpen } from "react-icons/fa";

export default function TripSecure() {
  return (
    <section className="ts-wrap">
      <div className="ts-head">
        <div className="ts-titleRow">
          <FaCheckCircle className="ts-tick" />
          <h3>Trip Secure</h3>
        </div>

        <div className="ts-brand">
          digit <span className="ts-brandMark">A</span>
        </div>
      </div>

      <div className="ts-priceRow">
        <b>₹ 349</b>
        <span>/Traveller (18% GST included)</span>
      </div>

      <div className="ts-benefitsRow">
        <div className="ts-benefit">
          <FaSuitcase className="ts-ic" />
          <div>
            <b>24×7</b>
            <span>support</span>
            <p>Baggage Assistance</p>
          </div>
        </div>

        <div className="ts-benefit">
          <FaUserShield className="ts-ic green" />
          <div>
            <b>Flat ₹ 50,000</b>
            <p>Personal Accident</p>
          </div>
        </div>

        <div className="ts-benefit">
          <FaBoxOpen className="ts-ic green" />
          <div>
            <b>Flat ₹ 2,000</b>
            <p>Loss of Checked-in Baggage</p>
          </div>
        </div>

        <button className="ts-viewBtn" type="button">
          View All <br /> Benefits →
        </button>
      </div>

      <div className="ts-reco">
        Recommended for your travel within India
      </div>

      <div className="ts-radioBox">
        <label className="ts-radio">
          <input type="radio" name="tripSecure" defaultChecked />
          <span className="ts-dot" />
          Yes, Secure my trip.
        </label>

        <label className="ts-radio">
          <input type="radio" name="tripSecure" />
          <span className="ts-dot" />
          No, I will book without trip secure.
        </label>
      </div>
    </section>
  );
}
