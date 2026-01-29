// SearchBar.jsx
import "./SearchBar.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="searchbar">
      <div className="search-item">
        <span className="label">STARTING FROM</span>
        <div className="value">
          <FaMapMarkerAlt />
          <span>New Delhi</span>
        </div>
      </div>

      <div className="divider" />

      <div className="search-item">
        <span className="label">TRAVELLING ON</span>
        <div className="value">
          <FaCalendarAlt />
          <span>Tue, 24 Feb 2026</span>
        </div>
      </div>

      <div className="divider" />

      <div className="search-item">
        <span className="label">ROOMS & GUESTS</span>
        <div className="value">
          <FaUserFriends />
          <span>2 Adults</span>
        </div>
      </div>

      <button className="search-btn">SEARCH</button>
    </div>
  );
};

export default SearchBar;
