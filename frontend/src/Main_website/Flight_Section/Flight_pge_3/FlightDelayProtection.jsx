import "./FlightDelayProtection.css";
import { useState } from "react";
import { FaClock, FaInfoCircle, FaPlus, FaShieldAlt } from "react-icons/fa";

export default function FlightDelayProtection() {
  const [added, setAdded] = useState(false);

  return (
    <section className="fdp-wrap">
      <div className="fdp-head">
        <div className="fdp-title">
          <FaClock className="fdp-ic" />
          <b>Flight Delay Protection</b>
        </div>

        <div className="fdp-icons">
          <FaShieldAlt />
          <FaInfoCircle />
        </div>
      </div>

      <div className="fdp-sub">
        Flight delay compensation of <b>₹ 2,000</b>
      </div>

      <div className="fdp-main">
        <div className="fdp-left">
          <div className="fdp-row">
            <span className="fdp-dot" />
            <span>
              Claim in case of delay beyond <b>2 hrs</b> for your journey
            </span>
          </div>

          <div className="fdp-row">
            <span className="fdp-dot" />
            <span>
              Valid for <b>SpiceJet</b> booking
            </span>
          </div>

          <div className="fdp-row">
            <span className="fdp-dot" />
            <span>
              Hassle-free settlement within <b>7 days</b>
            </span>
          </div>

          <div className="fdp-links">
            <button type="button" className="fdp-link">
              View T&amp;C
            </button>
            <button type="button" className="fdp-link">
              View FAQ
            </button>
          </div>
        </div>

        <div className="fdp-right">
          <div className="fdp-price">
            <b>₹ 279</b>
            <span>/ traveller</span>
          </div>

          {!added ? (
            <button className="fdp-addBtn" type="button" onClick={() => setAdded(true)}>
              <FaPlus /> ADD
            </button>
          ) : (
            <button className="fdp-addedBtn" type="button" onClick={() => setAdded(false)}>
              ADDED
            </button>
          )}
        </div>
      </div>

      <div className="fdp-note">
        *Protection is applicable only if flight is delayed by more than 2 hours.
      </div>
    </section>
  );
}
