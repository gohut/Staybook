import "./BookingRightPanel.scss";
import { FaTag, FaGift } from "react-icons/fa";

export default function BookingRightPanel() {
  return (
    <div className="brp-wrap">
      {/* Fare Summary */}
      <section className="brp-card">
        <h3 className="brp-title">Fare Summary</h3>

        <div className="brp-row">
          <span>Base Fare</span>
          <b>₹ 6,100</b>
        </div>
        <div className="brp-row">
          <span>Taxes and Surcharges</span>
          <b>₹ 889</b>
        </div>

        <div className="brp-total">
          <span>Total Amount</span>
          <b>₹ 6,989</b>
        </div>
      </section>

      {/* Coupons */}
      <section className="brp-card">
        <div className="brp-couponHead">
          <h3 className="brp-title">Coupons and Offers</h3>
          <FaGift className="brp-gift" />
        </div>

        <input className="brp-input" placeholder="Enter coupon code" />

        <div className="brp-couponCard">
          <div className="brp-couponTop">
            <div className="brp-badge">
              <FaTag /> MMTTRAVEL
            </div>
            <span className="brp-lock">🔒</span>
          </div>

          <div className="brp-couponSub">
            Log in to get up to 15% OFF. <br /> Offer valid for new users only
          </div>

          <button className="brp-unlock">UNLOCK COUPON</button>
        </div>

        <div className="brp-mini">
          <div>
            <b>MMTSECURE</b> <span className="brp-off">₹ 339 off</span>
            <p>Get an instant discount of ₹339 on your flight booking and Trip Secure combo</p>
          </div>
          <button className="brp-apply">Apply</button>
        </div>

        <div className="brp-mini">
          <div>
            <b>FLYMONEMI</b> <span className="brp-off">₹ 500 off</span>
            <p>Get ₹500 instant discount.</p>
          </div>
          <button className="brp-apply">Apply</button>
        </div>

        <div className="brp-mini">
          <div>
            <b>FREESEAT</b> <span className="brp-off">up to ₹350 off</span>
            <p>Use this coupon and get a Free Seat (Upto 350) on your flight booking</p>
          </div>
          <button className="brp-apply">Apply</button>
        </div>

        <div className="brp-mini">
          <div>
            <b>MMTBONUS</b> <span className="brp-off">₹ 120 off</span>
            <p>Get ₹120 instant discount on your flight booking</p>
          </div>
          <button className="brp-apply">Apply</button>
        </div>
      </section>
    </div>
  );
}
