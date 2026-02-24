// LocationSection.jsx
import { useMemo, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { buildMapEmbedUrl } from "../../../common/searchState";
import "./LocationSection.scss";

const LocationSection = ({ hotel }) => {
  const [open, setOpen] = useState(false);
  const mapQuery = useMemo(() => {
    const address = hotel?.location?.address || "";
    const city = hotel?.location?.city || "";
    const state = hotel?.location?.state || "";
    const country = hotel?.location?.country || "";
    return [address, city, state, country].filter(Boolean).join(", ") || hotel?.name || "Staybook Hotel";
  }, [hotel]);

  const mapEmbedUrl = buildMapEmbedUrl(mapQuery);

  return (
    <div className="location-wrapper">
      <div className="location-card">
        <h3 className="location-title">Location</h3>

        <div className="location-map">
          <button className="view-map-btn" onClick={() => setOpen(true)}>
            Click to View Map <FaMapMarkerAlt />
          </button>
        </div>

        <div className="location-summary">
          <p>{mapQuery}</p>
        </div>
      </div>

      {open && (
        <div className="location-modal" role="dialog" aria-modal="true">
          <div className="location-modal-card">
            <button className="location-close" onClick={() => setOpen(false)}>
              X
            </button>
            <iframe
              title="Hotel location"
              className="location-map-frame"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={mapEmbedUrl}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSection;
