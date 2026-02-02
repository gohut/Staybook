// GuestAndRequest.jsx
import "./GuestAndRequest.scss";
import { FaUserPlus, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const GuestAndRequest = () => {
  const navigate = useNavigate();
  return (
    <div className="guest-wrapper">
      {/* GUEST DETAILS */}
      <div className="guest-card">
        <h3>Guest Details</h3>

        <div className="form-row">
          <div className="field small">
            <label>TITLE</label>
            <select>
              <option>Mr</option>
              <option>Ms</option>
              <option>Mrs</option>
            </select>
          </div>

          <div className="field">
            <label>FULL NAME</label>
            <input placeholder="First Name" />
          </div>

          <div className="field">
            <label>&nbsp;</label>
            <input placeholder="Last Name" />
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label>
              EMAIL ADDRESS <span>(Booking voucher will be sent to this email ID)</span>
            </label>
            <input placeholder="Email ID" />
          </div>

          <div className="field">
            <label>MOBILE NUMBER</label>
            <div className="mobile">
              <select>
                <option>+91</option>
              </select>
              <input placeholder="Contact Number" />
            </div>
          </div>
        </div>

        <div className="checkbox">
          <input type="checkbox" />
          <span>Enter GST Details <small>(Optional)</small></span>
        </div>

        <div className="add-guest">
          <FaUserPlus />
          <span>Add Guest</span>
        </div>


      </div>

      {/* SPECIAL REQUEST */}
      <div className="request-card">
        <div className="request-left">
          <FaBell />
          <div>
            <h4>Special Requests</h4>
            <p>
              Add any special requests for your stay. These will be sent to the
              property after booking, and they will do their best to accommodate them.
            </p>
          </div>
        </div>
        <button className="request-btn">MAKE A REQUEST</button>
      </div>

      {/* PAY SECTION */}
      <div className="pay-section">
        <label className="agree">
          <input type="checkbox" checked readOnly />
          <span>
            By proceeding, I agree to MakeMyTrip’s{" "}
            <a href="#">User Agreement</a>, <a href="#">Terms of Service</a> and{" "}
            <a href="#">Cancellation & Property Booking Policies</a>.
          </span>
        </label>

        <button className="pay-btn" onClick={() => navigate("/hotel5")}>PAY NOW</button>
      </div>
    </div>
  );
};

export default GuestAndRequest;
