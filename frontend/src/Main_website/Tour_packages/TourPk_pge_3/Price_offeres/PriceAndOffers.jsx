// PriceAndOffers.jsx
import "./PriceAndOffers.scss";
import { FaPercent, FaTag, FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const PriceAndOffers = () => {
    const navigate = useNavigate();
  return (
    <div className="price-offer-wrapper">
      {/* PRICE CARD */}
      <div className="price-card">
        <div className="price-top">
          <span className="old-price">₹7,947</span>
          <span className="off">6% OFF</span>
        </div>

        <div className="current-price">
          <FaRupeeSign />
          <span>7,499</span>
          <small>/Adult</small>
        </div>

        <p className="tax-text">Excluding applicable taxes</p>

        <button className="pay-btn" onClick={() => navigate("/tourpkge4")}>PROCEED TO PAYMENT</button>
      </div>

      {/* COUPONS */}
      <div className="coupon-card">
        <h3>Coupons & Offers</h3>

        <div className="emi-row">
          <div className="emi-icon">₹ EMI</div>
          <div>
            <strong>No cost EMI @ ₹2,500</strong>
            <p>
              Book your holidays with Easy{" "}
              <span className="link">EMI options</span>.
            </p>
          </div>
        </div>

        <div className="coupon-input">
          <span>Have a Coupon Code?</span>
          <span className="link">Enter Code</span>
        </div>

        {/* APPLIED COUPON */}
        <div className="coupon applied">
          <div className="coupon-left">
            <FaPercent />
            <div>
              <strong>MOSTWANTED</strong>
              <p>
                Most wanted sale is live for limited time. Hurry and Book Now!
              </p>
            </div>
          </div>
          <div className="coupon-right">
            <span className="discount">-₹448</span>
            <span className="action">REMOVE</span>
          </div>
        </div>

        {/* AVAILABLE COUPON */}
        <div className="coupon">
          <div className="coupon-left">
            <FaTag />
            <div>
              <strong>MMTHLD</strong>
              <p>Grab Your Discount Before It’s Gone!</p>
            </div>
          </div>
          <div className="coupon-right">
            <span className="discount">-₹193</span>
            <span className="action apply">APPLY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceAndOffers;
