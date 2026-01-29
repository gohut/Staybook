// PackageCard.jsx
import { FaCheckCircle } from "react-icons/fa";
import "./PackageCard.css";

export default function PackageCard() {
  return (
    <div className="pkg-card">
      <img
        className="pkg-img"
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        alt="package"
      />

      <div className="pkg-body">
        <div className="pkg-title-row">
          <h3>Lakeside Wayanad - Terrace Resorts</h3>
          <span className="pkg-tag">2N/3D</span>
        </div>

        <p className="pkg-sub">2N Wayanad</p>

        <div className="pkg-divider" />

        <div className="pkg-info">
          <ul>
            <li>• 4 Star Hotel</li>
            <li>• Selected Meals</li>
          </ul>
          <ul>
            <li>• 2 Activities</li>
          </ul>
        </div>

        <div className="pkg-free">
          <span><FaCheckCircle /> Complimentary Hi-Tea</span>
          <span><FaCheckCircle /> Complimentary Trekking</span>
        </div>

        <button className="pkg-book">Book this package @ ₹2,000</button>

        <div className="pkg-price-box">
          <div className="pkg-emi">
            <span>No Cost EMI at</span>
            <strong>₹1,203/month</strong>
          </div>

          <div className="pkg-price">
            <strong>₹4,660</strong>
            <span>/Person</span>
            <p>Total Price ₹9,320</p>
          </div>
        </div>
      </div>
    </div>
  );
}
