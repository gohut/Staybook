// LocationSection.jsx
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import "./LocationSection.scss";

const LocationSection = () => {
  return (
    <div className="location-wrapper">
      <div className="location-card">
        <h3 className="location-title">Location</h3>

        <div className="location-toolbar">
          <div className="location-search">
            <FaSearch />
            <input
              type="text"
              placeholder="Search distance from any location in Goa"
            />
          </div>

          <label className="nearby">
            <input type="checkbox" />
            <span>Show Nearby Properties</span>
          </label>
        </div>

        <div className="location-map">
          <button className="view-map-btn">
            Click to View Map <FaMapMarkerAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
