import "./PropertyCard.css";

const PropertyCard = ({ data }) => {
  return (
    <div className="property-card">

      {/* LEFT: IMAGE */}
      <div className="image-section">
        <img src={data.image} alt={data.name} />
      </div>

      {/* MIDDLE: DETAILS */}
      <div className="details-section">
        <h3>{data.name}</h3>
        <p className="location">{data.location}</p>

        <span className="tag">Couple Friendly</span>

        <ul className="offers">
          {data.offers.map((offer, i) => (
            <li key={i}>{offer}</li>
          ))}
        </ul>
      </div>

      {/* RIGHT: PRICE */}
      <div className="price-section">
        <span className="rating">Very Good {data.rating}</span>
        <h2>₹{data.price}</h2>
        <p className="per-night">Per Night</p>
        <span className="login-text">
          Login to Book Now & Pay Later
        </span>
      </div>

    </div>
  );
};

export default PropertyCard;
