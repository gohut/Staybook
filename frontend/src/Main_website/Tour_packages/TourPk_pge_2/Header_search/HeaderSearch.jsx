// HeaderSearch.jsx
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends, FaSearch } from "react-icons/fa";
import "./HeaderSearch.scss";

const HeaderSearch = ({ values, onFieldChange, onSearch }) => {
  return (
    <div className="tour-header-wrapper">
      <div className="tour-header-bar">
        <div className="tour-header-field">
          <span className="tour-header-label">STARTING FROM</span>
          <div className="tour-header-input-row">
            <FaMapMarkerAlt />
            <input
              className="tour-header-input"
              value={values.fromCity}
              onChange={(event) => onFieldChange("fromCity", event.target.value)}
              placeholder="From city"
            />
          </div>
        </div>

        <div className="tour-header-field">
          <span className="tour-header-label">GOING TO</span>
          <div className="tour-header-input-row">
            <FaMapMarkerAlt />
            <input
              className="tour-header-input"
              value={values.toCity}
              onChange={(event) => onFieldChange("toCity", event.target.value)}
              placeholder="Destination"
            />
          </div>
        </div>

        <div className="tour-header-field">
          <span className="tour-header-label">STARTING DATE</span>
          <div className="tour-header-input-row tour-header-muted">
            <FaCalendarAlt />
            <input
              className="tour-header-input"
              type="date"
              value={values.departureDate}
              onChange={(event) => onFieldChange("departureDate", event.target.value)}
            />
          </div>
        </div>

        <div className="tour-header-field">
          <span className="tour-header-label">ROOMS & GUESTS</span>
          <div className="tour-header-input-row tour-header-muted">
            <FaUserFriends />
            <input
              className="tour-header-input"
              value={values.guestSummary}
              onChange={(event) => onFieldChange("guestSummary", event.target.value)}
              placeholder="2 Adults, 1 Room"
            />
          </div>
        </div>

        <button className="tour-header-search-btn" type="button" onClick={onSearch}>
          <FaSearch />
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default HeaderSearch;
