// HeaderSearch.jsx
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends, FaSearch } from "react-icons/fa";
import "./HeaderSearch.css";

const HeaderSearch = () => {
  return (
    <div className="header-wrapper">
      <div className="header-bar">
        <div className="field">
          <span className="label">STARTING FROM</span>
          <div className="input">
            <FaMapMarkerAlt />
            <span>New Delhi</span>
          </div>
        </div>

        <div className="field">
          <span className="label">GOING TO</span>
          <div className="input">
            <FaMapMarkerAlt />
            <span>Kerala</span>
          </div>
        </div>

        <div className="field">
          <span className="label">STARTING DATE</span>
          <div className="input muted">
            <FaCalendarAlt />
            <span>Select</span>
          </div>
        </div>

        <div className="field">
          <span className="label">ROOMS & GUESTS</span>
          <div className="input muted">
            <FaUserFriends />
            <span>Select</span>
          </div>
        </div>

        <button className="search-btn">
          <FaSearch />
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default HeaderSearch;
