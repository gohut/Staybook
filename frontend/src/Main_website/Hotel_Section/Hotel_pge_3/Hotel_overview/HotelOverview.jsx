// HotelOverview.jsx
import "./HotelOverview.scss";
import { useMemo } from "react";
import img1 from "../../../../assets/touristPlace/timg1.jpg";

const buildStarString = (rating) => {
  const stars = Math.max(1, Math.min(5, Math.round(rating || 4)));
  return "★".repeat(stars);
};

const HotelOverview = ({ hotel, photos = [], onSelectRoom }) => {
  const starString = useMemo(() => buildStarString(hotel?.starRating), [hotel]);
  const propertyPhotos = photos.length ? photos : [img1, img1, img1];
  const primaryRoom = hotel?.roomTypes?.[0];

  const handleSelect = () => {
    if (primaryRoom && onSelectRoom) {
      onSelectRoom(primaryRoom);
    }
  };

  return (
    <div className="htl3-ho-hotel-wrap">
      <div className="htl3ho-hotel-card">
        <h2 className="htl3ho-hotel-title">
          {hotel?.name || "Hard Rock Hotel Goa Calangute"} <span>{starString}</span>
        </h2>

        <div className="htl3ho-hotel-grid">
          <div className="htl3ho-left">
            <div className="htl3ho-gallery">
              <div
                className="htl3ho-gallery-main"
                style={{ backgroundImage: `url(${propertyPhotos[0]})` }}
              >
                <span className="htl3ho-photo-badge">
                  {hotel?.photos?.length || 0} Property Photos →
                </span>
              </div>
              <div className="htl3ho-gallery-side">
                <div className="htl3ho-side-img">
                  <img src={propertyPhotos[1] || propertyPhotos[0]} alt="" />
                </div>
                <div className="htl3ho-side-img">
                  <img src={propertyPhotos[2] || propertyPhotos[0]} alt="" />
                </div>
              </div>
            </div>

            <div className="htl3ho-about">
              <h3>About Property</h3>
              <p>
                {hotel?.description ||
                  "Nestled in the heart of the city, this property blends comfort with easy access to local attractions."}
                <span className="link"> More</span>
              </p>

              <div className="htl3ho-tabs">
                <button className="tab active">Property Highlights</button>
                <button className="tab">Activities & Nearby Attractions</button>
              </div>

              <h4>Amenities</h4>
              <div className="htl3ho-amenities">
                <span>Swimming Pool</span>
                <span>Restaurant</span>
                <span className="htl3ho-link">+ More Amenities</span>
              </div>
            </div>
          </div>

          <div className="htl3ho-right">
            <div className="htl3ho-room-card">
              <h3>{primaryRoom?.name || "Deluxe Room King Bed"}</h3>
              <p className="htl3ho-fits">
                Fits {primaryRoom?.maxGuests || 2} Adults
              </p>

              <ul>
                <li>Breakfast included</li>
                <li>10% off on Food & Beverage services</li>
                <li>10% off on session of Spa</li>
                <li>Non-Refundable</li>
              </ul>

              <a className="htl3ho-link">View All</a>

              <div className="htl3ho-price">
                <small>
                  {primaryRoom?.currency || "INR"}{" "}
                  {primaryRoom?.basePrice
                    ? Math.round(primaryRoom.basePrice * 1.1)
                    : 15624}{" "}
                  Per Night
                </small>
                <div className="htl3ho-final">
                  {primaryRoom?.currency || "INR"}{" "}
                  {primaryRoom?.basePrice ? Math.round(primaryRoom.basePrice) : 12499}{" "}
                  <span>+ {primaryRoom?.currency || "INR"} 2,619 taxes & fees</span>
                </div>
              </div>

              <button className="htl3ho-book" onClick={handleSelect}>
                BOOK THIS NOW
              </button>

              <div className="htl3ho-more-options">
                <div>
                  <b>More options available with</b>
                  <p>Meals Included</p>
                </div>
                <button className="htl3ho-outline">VIEW ALL (5)</button>
              </div>
            </div>

            <div className="htl3ho-rating-card">
              <div className="htl3ho-rating">
                {hotel?.averageRating ? hotel.averageRating.toFixed(1) : "3.9"}
              </div>
              <div className="htl3ho-rating-text">
                <b>
                  {hotel?.averageRating >= 4.5
                    ? "Excellent"
                    : hotel?.averageRating >= 4
                    ? "Very Good"
                    : "Good"}
                </b>
                <span>({hotel?.reviewCount || 0} ratings)</span>
                <a className="htl3ho-link">All Reviews</a>
              </div>

              <div className="htl3ho-location">
                <b>{hotel?.location?.city || "Calangute"}</b>
                <p>{hotel?.location?.address || "1.3 km drive to Calangute Beach"}</p>
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
