import "./BillingStateAndContinue.scss";
import { FaLock, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export default function BillingStateAndContinue() {
  const navigate = useNavigate();

  return (
    <section className="bsc-wrap">
      {/* STATE BOX */}
      <div className="bsc-card">
        <h4 className="bsc-title">
          Your State{" "}
          <span className="bsc-sub">
            (Required for GST purpose on your tax invoice. You can edit this anytime later
            in your profile section.)
          </span>
        </h4>

        <div className="bsc-field">
          <label>Select the State</label>

          <div className="bsc-selectWrap">
            <select defaultValue="Tamil Nadu" className="bsc-select">
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <FaChevronDown className="bsc-dd" />
          </div>
        </div>

        <label className="bsc-check">
          <input type="checkbox" />
          <span className="bsc-box" />
          Confirm and save billing details to your profile
        </label>
      </div>

      {/* LOCK PRICE BAR */}
      <div className="bsc-lockBar">
        <div className="bsc-lockLeft">
          <FaLock className="bsc-lockIc" />
          <span>
            <b>Still unsure about this trip?</b>{" "}
            <span className="bsc-lockBlue">Lock this price!</span>
          </span>
        </div>

        <button className="bsc-lockBtn" type="button">
          LOCK NOW
        </button>
      </div>

      {/* CONTINUE + ACCORDIONS */}
      <div className="bsc-actions">
        <button className="bsc-continue" type="button"  onClick={() => navigate("/flight3")}>
          CONTINUE
        </button>

        <div className="bsc-accordion">
          <div className="bsc-accRow">Seats &amp; Meals</div>
        </div>

        <div className="bsc-accordion">
          <div className="bsc-accRow">
            Add ons <span className="bsc-accSub">Flight Delay Insurance</span>
          </div>
        </div>
      </div>
    </section>
  );
}
