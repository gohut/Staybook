// HotelOverview.jsx
import "./HotelOverview.scss";

const HotelOverview = () => {
  return (
    <div className="hotel-wrap">
      <div className="hotel-card">
        <h2 className="hotel-title">
          Hard Rock Hotel Goa Calangute <span>★★★★★</span>
        </h2>

        <div className="hotel-grid">
          {/* LEFT */}
          <div className="left">
            <div className="gallery">
              <div className="gallery-main">
                <span className="photo-badge">1993 Property & Guest Photos →</span>
              </div>
              <div className="gallery-side">
                <div className="side-img">
                  <span className="view">360° View</span>
                </div>
                <div className="side-img" />
              </div>
            </div>

            <div className="about">
              <h3>About Property</h3>
              <p>
                Nestled in Calangute’s heart, Hard Rock Hotel is a complete
                entertainment destination where one lives like a rockstar with
                top leisure amenities and proximity to top attractions.
                <span className="link"> More</span>
              </p>

              <div className="tabs">
                <button className="tab active">Property Highlights</button>
                <button className="tab">Activities & Nearby Attractions</button>
              </div>

              <h4>Amenities</h4>
              <div className="amenities">
                <span>🏊 Swimming Pool</span>
                <span>🍽 Restaurant</span>
                <span className="link">+ More Amenities</span>
              </div>

              <div className="login-box">
                <b>Login to unlock deals & manage your bookings!</b>
                <div className="login-row">
                  <input placeholder="+91 Mobile Number" />
                  <button>LOGIN NOW</button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="right">
            <div className="room-card">
              <h3>Deluxe Room King Bed</h3>
              <p className="fits">Fits 2 Adults</p>

              <ul>
                <li>Breakfast included</li>
                <li>10% off on Food & Beverage services</li>
                <li>10% off on session of Spa</li>
                <li>Non-Refundable</li>
              </ul>

              <a className="link">View All</a>

              <div className="price">
                <small>₹15,624 Per Night</small>
                <div className="final">
                  ₹12,499 <span>+ ₹2,619 taxes & fees</span>
                </div>
              </div>

              <button className="book">BOOK THIS NOW</button>

              <div className="more-options">
                <div>
                  <b>More options available with</b>
                  <p>Meals Included</p>
                </div>
                <button className="outline">VIEW ALL (5)</button>
              </div>
            </div>

            <div className="rating-card">
              <div className="rating">3.9</div>
              <div className="rating-text">
                <b>Very Good</b>
                <span>(6312 ratings)</span>
                <a className="link">All Reviews</a>
              </div>

              <div className="location">
                <b>Calangute</b>
                <p>1.3 km drive to Calangute Beach</p>
                <a className="link">See on Map</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelOverview;
