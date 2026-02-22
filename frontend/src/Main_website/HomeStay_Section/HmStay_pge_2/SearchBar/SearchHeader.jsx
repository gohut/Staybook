// SearchHeader.jsx
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import "./SearchHeader.scss";

const SearchHeader = ({ values, onFieldChange, onSearch }) => {
  return (
    <div className="search-header">
      <div className="hm-search-header-box">
        <div className="hm-search-header-field">
          <span className="hm-search-header-label">CITY, AREA OR PROPERTY</span>
          <div className="hm-search-header-input-wrap">
            <FaMapMarkerAlt />
            <input
              className="search-header-input"
              value={values.city}
              onChange={(event) => onFieldChange("city", event.target.value)}
              placeholder="Search city"
            />
          </div>
        </div>

        <div className="hm-search-header-field">
          <span className="hm-search-header-label">CHECK-IN</span>
          <div className="hm-search-header-input-wrap">
            <FaCalendarAlt />
            <input
              className="search-header-input"
              type="date"
              value={values.checkInDate}
              onChange={(event) => onFieldChange("checkInDate", event.target.value)}
            />
          </div>
        </div>

        <div className="hm-search-header-field">
          <span className="hm-search-header-label">CHECK-OUT</span>
          <div className="hm-search-header-input-wrap">
            <FaCalendarAlt />
            <input
              className="search-header-input"
              type="date"
              min={values.checkInDate}
              value={values.checkOutDate}
              onChange={(event) => onFieldChange("checkOutDate", event.target.value)}
            />
          </div>
        </div>

        <div className="hm-search-header-field">
          <span className="hm-search-header-label">GUESTS</span>
          <div className="hm-search-header-input-wrap">
            <FaUser />
            <input
              className="search-header-input"
              value={values.guestSummary}
              onChange={(event) => onFieldChange("guestSummary", event.target.value)}
              placeholder="2 Adults"
            />
          </div>
        </div>

        <button className="search-btn" type="button" onClick={onSearch}>
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default SearchHeader;
