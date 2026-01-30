// PropertyManagement.jsx
import "./PropertyManagement.scss";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

const InfoField = ({ label, value, full }) => (
  <div className={`info-field ${full ? "full" : ""}`}>
    <label>{label}</label>
    <div className={full ? "textarea" : "input-box"}>{value}</div>
  </div>
);

const RoomCard = ({ title, bed, price, guests, rooms, amenities }) => (
  <div className="room-card">
    <div className="room-header">
      <div>
        <h4>{title}</h4>
        <p>{bed}</p>
      </div>
      <div className="room-actions">
        <FiEdit2 />
        <FiTrash2 />
      </div>
    </div>

    <div className="room-meta">
      <div>
        <span>Base Price</span>
        <strong>{price}</strong>
      </div>
      <div>
        <span>Max Guests</span>
        <strong>{guests}</strong>
      </div>
      <div>
        <span>Total Rooms</span>
        <strong>{rooms}</strong>
      </div>
    </div>

    <div className="amenities">
      {amenities.map((a) => (
        <span key={a}>{a}</span>
      ))}
    </div>
  </div>
);

const PropertyManagement = () => {
  return (
    <div className="pm-page">
      <section className="card">
        <div className="card-header">
          <div>
            <h3>Property Information</h3>
            <p>Manage your hotel details and settings</p>
          </div>
          <button className="primary-btn">Save Changes</button>
        </div>

        <div className="info-grid">
          <InfoField label="Hotel Name" value="Grand Plaza Hotel" />
          <InfoField label="Email" value="info@grandplaza.com" />
          <InfoField label="Address" value="123 Ocean Drive" />
          <InfoField label="Phone" value="+1 (305) 555-0123" />
          <InfoField label="City" value="Miami Beach, FL 33139" />
          <InfoField label="Check-in Time" value="15:00" />
          <InfoField label="Check-out Time" value="11:00" />
          <InfoField
            label="Description"
            value="Experience luxury beachfront living at Grand Plaza Hotel. Our modern accommodations offer stunning ocean views, world-class amenities, and exceptional service."
            full
          />
        </div>
      </section>

      <section className="card">
        <div className="card-header">
          <div>
            <h3>Room Types</h3>
            <p>Manage your room inventory and details</p>
          </div>
          <button className="primary-btn">
            <FiPlus /> Add Room Type
          </button>
        </div>

        <div className="room-grid">
          <RoomCard
            title="Deluxe Ocean View"
            bed="King Bed"
            price="$250/night"
            guests="2 guests"
            rooms="15 rooms"
            amenities={["Wi-Fi", "Air Conditioning", "Smart TV", "Mini Bar", "Ocean View", "Balcony"]}
          />
          <RoomCard
            title="Executive Suite"
            bed="King Bed + Sofa Bed"
            price="$450/night"
            guests="4 guests"
            rooms="8 rooms"
            amenities={["Wi-Fi", "Air Conditioning", "Smart TV", "Mini Bar", "Ocean View", "Living Room", "Balcony", "Coffee Maker"]}
          />
          <RoomCard
            title="Standard Double"
            bed="Double Bed"
            price="$180/night"
            guests="2 guests"
            rooms="20 rooms"
            amenities={["Wi-Fi", "Air Conditioning", "TV", "Mini Fridge"]}
          />
          <RoomCard
            title="Family Suite"
            bed="2 Queen Beds"
            price="$380/night"
            guests="6 guests"
            rooms="5 rooms"
            amenities={["Wi-Fi", "Air Conditioning", "Smart TV", "Mini Bar", "Kitchenette", "Living Room"]}
          />
        </div>
      </section>
    </div>
  );
};

export default PropertyManagement;
