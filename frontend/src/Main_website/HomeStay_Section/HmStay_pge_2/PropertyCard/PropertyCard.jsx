// PropertyCard.jsx
import { FaHeart, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import "./PropertyCard.css";
import { useNavigate } from "react-router-dom"; 
const PropertyCard = () => {
    const navigate = useNavigate();
  return (
    <div className="property-card" onClick={() => navigate("/hotel3")}>
      <div className="card-left">
        <div className="main-img">
          <img
            src="https://images.unsplash.com/photo-1505691938895-1758d7feb511"
            alt="property"
          />
          <FaHeart className="wishlist" />
        </div>

        <div className="thumbs">
          <img src="https://images.unsplash.com/photo-1505691938895-1758d7feb511" />
          <img src="https://images.unsplash.com/photo-1560448075-bb485b067938" />
          <img src="https://images.unsplash.com/photo-1505691723518-36a5ac3b2d58" />
          <div className="view-all">View All</div>
        </div>
      </div>

      <div className="card-middle">
        <h3>
          Orbit Serviced Apartments <span className="like">Like a 4★</span>
        </h3>

        <p className="location">
          <FaMapMarkerAlt /> <span>Khar</span> | 2.7 km drive to Juhu Beach
        </p>

        <p className="type">Entire Serviced Apartment</p>
      </div>

      <div className="card-right">
        <div className="rating">
          <span className="label">Excellent</span>
          <span className="score">
            <FaStar /> 4.6
          </span>
          <span className="count">(20 Ratings)</span>
        </div>

        <div className="price">
          ₹ 20,000
          <span>+ ₹ 3,600 taxes & fees</span>
          <small>Per Night</small>
        </div>

        <div className="deal">Login & unlock a secret deal!</div>
      </div>
    </div>
  );
};

export default PropertyCard;
