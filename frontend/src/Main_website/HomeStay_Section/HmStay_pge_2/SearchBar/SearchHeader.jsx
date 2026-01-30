// SearchHeader.jsx
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import "./SearchHeader.scss";

const SearchHeader = () => {
  return (
    <div className="search-header">
      <div className="search-box">
        <div className="field">
          <span className="label">CITY, AREA OR PROPERTY</span>
          <div className="input">
            <FaMapMarkerAlt />
            <span>Mumbai</span>
          </div>
        </div>

        <div className="field">
          <span className="label">CHECK-IN</span>
          <div className="input">
            <FaCalendarAlt />
            <span>Tue, 3 Feb 2026</span>
          </div>
        </div>

        <div className="field">
          <span className="label">CHECK-OUT</span>
          <div className="input">
            <FaCalendarAlt />
            <span>Thu, 5 Feb 2026</span>
          </div>
        </div>

        <div className="field">
          <span className="label">GUESTS</span>
          <div className="input">
            <FaUser />
            <span>2 Adults</span>
          </div>
        </div>

        <button className="search-btn">SEARCH</button>
      </div>
    </div>
  );
};

export default SearchHeader;
