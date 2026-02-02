// HotelOverview.jsx
import "./HotelOverview.scss";
import { useNavigate } from "react-router-dom";
import img1 from "../../../../assets/touristPlace/timg1.jpg";
const HotelOverview = () => {
    const navigate = useNavigate();
  return (
    <div className="htl3-ho-hotel-wrap">
      <div className="htl3ho-hotel-card">
        <h2 className="htl3ho-hotel-title">
          Hard Rock Hotel Goa Calangute <span>★★★★★</span>
        </h2>

        <div className="htl3ho-hotel-grid">
          {/* LEFT */}
          <div className="htl3ho-left">
            <div className="htl3ho-gallery">
              <div className="htl3ho-gallery-main">
                <span className="htl3ho-photo-badge">1993 Property & Guest Photos →</span>
              </div>
              <div className="htl3ho-gallery-side">
                <div className="htl3ho-side-img">
                   <img src={img1} alt="" />
                </div>
                <div className="htl3ho-side-img" />
              
              </div>
            </div>

            <div className="htl3ho-about">
              <h3>About Property</h3>
              <p>
                Nestled in Calangute’s heart, Hard Rock Hotel is a complete
                entertainment destination where one lives like a rockstar with
                top leisure amenities and proximity to top attractions.
                <span className="link"> More</span>
              </p>

              <div className="htl3ho-tabs">
                <button className="tab active">Property Highlights</button>
                <button className="tab">Activities & Nearby Attractions</button>
              </div>

              <h4>Amenities</h4>
              <div className="htl3ho-amenities">
                <span>🏊 Swimming Pool</span>
                <span>🍽 Restaurant</span>
                <span className="htl3ho-link">+ More Amenities</span>
              </div>

    
            </div>
          </div>

          {/* RIGHT */}
          <div className="htl3ho-right">
            <div className="htl3ho-room-card">
              <h3>Deluxe Room King Bed</h3>
              <p className="htl3ho-fits">Fits 2 Adults</p>

              <ul>
                <li>Breakfast included</li>
                <li>10% off on Food & Beverage services</li>
                <li>10% off on session of Spa</li>
                <li>Non-Refundable</li>
              </ul>

              <a className="htl3ho-link">View All</a>

              <div className="htl3ho-price">
                <small>₹15,624 Per Night</small>
                <div className="htl3ho-final">
                  ₹12,499 <span>+ ₹2,619 taxes & fees</span>
                </div>
              </div>

              <button className="htl3ho-book" onClick={() => navigate("/hotel4")}>BOOK THIS NOW</button>

              <div className="htl3ho-more-options">
                <div>
                  <b>More options available with</b>
                  <p>Meals Included</p>
                </div>
                <button className="htl3ho-outline">VIEW ALL (5)</button>
              </div>
            </div>

            <div className="htl3ho-rating-card">
              <div className="htl3ho-rating">3.9</div>
              <div className="htl3ho-rating-text">
                <b>Very Good</b>
                <span>(6312 ratings)</span>
                <a className="htl3ho-link">All Reviews</a>
              </div>

              <div className="htl3ho-location">
                <b>Calangute</b>
                <p>1.3 km drive to Calangute Beach</p>
                <a className="htl3ho-link">See on Map</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelOverview;
