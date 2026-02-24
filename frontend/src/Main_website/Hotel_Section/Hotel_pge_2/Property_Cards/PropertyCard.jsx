// PropertyCard.jsx
import { FaStar, FaStarHalfAlt, FaRegStar, FaSpa, FaMapMarkerAlt } from "react-icons/fa";
import "./PropertyCard.scss";
import { useNavigate } from "react-router-dom";

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
      const navigate = useNavigate();

  const handleSelect = () => {
    if (data?.dbHotelId) {
      localStorage.setItem("staybook_selected_hotel_id", data.dbHotelId);
      navigate("/hotel3", { state: { hotelId: data.dbHotelId } });
      return;
    }
    navigate("/hotel3");
  };

  return (
    <div className="htl4-property-card" onClick={handleSelect}>
      {/* LEFT IMAGES */}
      <div className="htl4-pc-images">
        <img className="htl4-main-img" src={data.images.main} alt={data.name} />
        <div className="htl4-thumbs">
          {data.images.thumbs.map((img, i) => (
            <img key={i} src={img} alt="thumb" />
          ))}
          <div className="htl4-view-all">View All</div>
        </div>
      </div>

      {/* DETAILS */}
      <div className="htl4-pc-details">
        <h3>
          {data.name} <StarRating rating={data.starRating} />
        </h3>

        <p className="htl4-location">
          <FaMapMarkerAlt /> {data.location}
        </p>

        <span className="htl4-badge">{data.badge}</span>

        <p className="htl4-offer">
          <FaSpa /> {data.offer}
        </p>

        <ul className="htl4-points">
          {data.highlights.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>

      {/* PRICE */}
      <div className="htl4-pc-price">
        <div className="htl4-rating">
          {data.reviewLabel} <span>{data.reviewScore}</span>
          <p>({data.totalRatings} Ratings)</p>
        </div>

        <div className="htl4-price">
          <del>₹{data.originalPrice}</del>
          <h2>₹{data.discountedPrice}</h2>
          <p className="htl4-tax">+ ₹{data.taxes} taxes & fees</p>
          <p className="htl4-night">Per Night</p>
        </div>

        <a className="htl4-login">{data.ctaText}</a>
      </div>
    </div>
  );
};

export default PropertyCard;
