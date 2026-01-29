// TravellerDetails.jsx
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import "./TravellerDetails.css";

const TravellerDetails = () => {
  return (
    <div className="traveller-card">
      <div className="card-header">
        <h3>1. Traveller Details</h3>
        <FaChevronDown />
      </div>

      <div className="login-strip">
        <span>
          <strong>Login</strong> to view your Saved Travellers list, get special
          offers and more
        </span>
        <a href="#">Login Now →</a>
      </div>

      <h4>3 Travellers - 1 Room | 3 Adults</h4>

      {[1, 2, 3].map((t) => (
        <div className="traveller-row" key={t}>
          <FaUserCircle className="user-icon" />
          <span className="add-text">Add Traveller</span>
          <span className="age-note">
            *ADULT - SHOULD BE ABOVE {t === 2 ? 12 : 18} YEARS
          </span>
        </div>
      ))}

      <div className="form-section">
        <h4>Please enter contact details</h4>
        <div className="form-row">
          <input placeholder="Eg. John.doe@email.com" />
          <input placeholder="Mobile Code" />
          <input placeholder="Eg. 980 123 8910" />
        </div>

        <h4>Please enter GST details</h4>
        <input placeholder="GST State" />

        <h4>Special Requests</h4>
        <input placeholder="Enter Special Requests" />
      </div>
    </div>
  );
};

export default TravellerDetails;
