// PropertyCard.jsx
import { FaStar, FaStarHalfAlt, FaRegStar, FaSpa, FaMapMarkerAlt } from "react-icons/fa";
import "./PropertyCard.css";

/* ⭐ STAR SUB-COMPONENT */
const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }

  return <span className="stars">{stars}</span>;
};

/* 🏨 PROPERTY CARD */
const PropertyCard = ({ data }) => {
  return (
    <div className="property-card">
      {/* LEFT IMAGES */}
      <div className="pc-images">
        <img className="main-img" src={data.images.main} alt={data.name} />
        <div className="thumbs">
          {data.images.thumbs.map((img, i) => (
            <img key={i} src={img} alt="thumb" />
          ))}
          <div className="view-all">View All</div>
        </div>
      </div>

      {/* DETAILS */}
      <div className="pc-details">
        <h3>
          {data.name} <StarRating rating={data.starRating} />
        </h3>

        <p className="location">
          <FaMapMarkerAlt /> {data.location}
        </p>

        <span className="badge">{data.badge}</span>

        <p className="offer">
          <FaSpa /> {data.offer}
        </p>

        <ul className="points">
          {data.highlights.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>

      {/* PRICE */}
      <div className="pc-price">
        <div className="rating">
          {data.reviewLabel} <span>{data.reviewScore}</span>
          <p>({data.totalRatings} Ratings)</p>
        </div>

        <div className="price">
          <del>₹{data.originalPrice}</del>
          <h2>₹{data.discountedPrice}</h2>
          <p className="tax">+ ₹{data.taxes} taxes & fees</p>
          <p className="night">Per Night</p>
        </div>

        <a className="login">{data.ctaText}</a>
      </div>
    </div>
  );
};

export default PropertyCard;
