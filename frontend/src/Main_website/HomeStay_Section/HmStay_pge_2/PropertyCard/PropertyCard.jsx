// PropertyCard.jsx
import { FaHeart, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./PropertyCard.scss";

const PropertyCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="property-card" onClick={() => navigate("/hstaypge3")}>
      <div className="card-left">
        <div className="main-img">
          <img src={data.images.main} alt={data.name} />
          <FaHeart className="wishlist" />
        </div>

        <div className="thumbs">
          {data.images.thumbs.map((thumb, index) => (
            <img key={`${data.id}-thumb-${index}`} src={thumb} alt={`${data.name} thumb`} />
          ))}
          <div className="view-all">View All</div>
        </div>
      </div>

      <div className="card-middle">
        <h3>
          {data.name} <span className="like">Like a {data.starRating} Star</span>
        </h3>

        <p className="location">
          <FaMapMarkerAlt /> <span>{data.locality}</span> | {data.locationDetail}
        </p>

        <p className="type">{data.propertyType}</p>
      </div>

      <div className="card-right">
        <div className="rating">
          <span className="label">{data.reviewLabel}</span>
          <span className="score">
            <FaStar /> {data.reviewScore}
          </span>
          <span className="count">({data.totalRatings} Ratings)</span>
        </div>

        <div className="price">
          Rs {data.price}
          <span>+ Rs {data.taxes} taxes & fees</span>
          <small>Per Night</small>
        </div>

        <div className="deal">{data.ctaText}</div>
      </div>
    </div>
  );
};

export default PropertyCard;
