// PackageAddOns.jsx
import { FaCheckCircle, FaChevronUp } from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";
import "./PackageAddOns.scss";

const PackageAddOns = () => {
  return (
    <div className="addons-wrapper">
      <div className="addons-header">
        <h3>2. Package Add-Ons</h3>
        <FaChevronUp />
      </div>

      <div className="insurance-strip">
        <div className="insurance-left">
          <FaCheckCircle className="green-check" />
          <div>
            <h4>Travel + Medical Insurance</h4>
            <p>Secure your trip and travel worry free</p>
          </div>
        </div>
      </div>

      <div className="insurance-card">
        <div className="card-left">
          <div className="title-row">
            <BsShieldCheck className="shield-icon" />
            <span className="title">
              Reliance - ₹200k Travel Insurance
            </span>
            <span className="badge">MOST POPULAR</span>
          </div>

          <p className="claims">99% Claims Settled</p>

          <h5>What’s included</h5>
          <ul>
            <li>Trip Delay - Flat Rs. 1,500</li>
            <li>Trip Cancellation & interruption - Up to Rs. 4,500</li>
            <li>Loss of checked-in baggage - Up to Rs. 3,500</li>
          </ul>

          <a className="view-link">View Benefits</a>
        </div>

        <div className="card-right">
          <a className="tc-link">View T&amp;Cs</a>
          <div className="price">
            <span className="amount">+ ₹82</span>
            <span className="per">per person</span>
          </div>
          <button className="select-btn">SELECT</button>
        </div>
      </div>
    </div>
  );
};

export default PackageAddOns;
