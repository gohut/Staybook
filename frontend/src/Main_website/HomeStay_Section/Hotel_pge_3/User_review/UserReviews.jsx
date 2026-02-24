// UserReviews.jsx
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./UserReviews.scss";

const ratingBars = [
  { label: "Excellent", value: 51 },
  { label: "Very Good", value: 27 },
  { label: "Average", value: 11 },
  { label: "Poor", value: 5 },
  { label: "Bad", value: 6 },
];

const ReviewCard = ({ score, title, meta, text, travelMonth, roomType }) => (
  <div className="htl3-ur-review-card">
    <div className="htl3-ur-review-score">{score.toFixed(1)}</div>
    <div className="htl3-ur-review-content">
      <b>{title}</b>
      <span className="htl3-ur-review-meta">{meta}</span>
      <p>{text}</p>
      <div className="htl3-ur-review-footer">
        <span>
          <b>Travel Month:</b> {travelMonth}
        </span>
        <span>
          <b>Room:</b> {roomType}
        </span>
      </div>
    </div>
  </div>
);

const buildFallbackReviews = () => [
  {
    score: 3.0,
    title: "overall experience",
    meta: "Shailesh K · Family With 1 Kid",
    text:
      "Food good, hospitality good, room less lighted, no balcony, poor drainage in the bathroom. Bar area excellent. Pool awesome.",
    travelMonth: "Dec 2025",
    roomType: "Deluxe Room King Bed",
  },
  {
    score: 3.0,
    title: "Average Stay",
    meta: "Mithilesh K · Family With 2 Kids",
    text:
      "Property located far inside from main road. Cab issues. Pool facility is plus point but reception process is very slow.",
    travelMonth: "Dec 2025",
    roomType: "Deluxe Room King Bed",
  },
  {
    score: 1.0,
    title: "Poor experience with no hot water and very small restaurant",
    meta: "Qaid H · Couple",
    text:
      "Worst experience here. No hot water. Swimming pool temperature not controlled. Restaurant was congested.",
    travelMonth: "Dec 2025",
    roomType: "Deluxe Room King Bed",
  },
];

const UserReviews = ({ reviews = [], averageRating = 0, reviewCount = 0 }) => {
  const visibleReviews =
    reviews && reviews.length > 0
      ? reviews.map((review) => ({
          score: review.rating || 0,
          title: review.reviewTitle || "Guest review",
          meta: review.userId ? `Guest · ${review.userId}` : "Guest review",
          text: review.reviewText || "No detailed feedback provided.",
          travelMonth: review.travelMonth || "Recent stay",
          roomType: review.roomTypeId || "Room",
        }))
      : buildFallbackReviews();

  return (
    <div className="htl3-ur-reviews-wrapper">
      <h3>User Rating & Reviews</h3>

      <div className="htl3-ur-review-tabs">
        <span className="active">Everyone</span>
        <span>Group</span>
        <span>Couple</span>
        <span>Solo</span>
        <span>Business</span>
        <span>Family</span>
      </div>

      <div className="htl3-ur-review-grid">
        <div className="htl3-ur-review-summary">
          <div className="htl3-ur-overall">
            <div className="htl3-ur-overall-score">
              {averageRating ? averageRating.toFixed(1) : "3.9"}
            </div>
            <div>
              <b>
                {averageRating >= 4.5
                  ? "Excellent"
                  : averageRating >= 4
                  ? "Very Good"
                  : "Good"}
              </b>
              <span>
                {reviewCount || 0} Ratings, {visibleReviews.length} Reviews
              </span>
            </div>
          </div>

          <div className="htl3-ur-bars">
            {ratingBars.map((rating, i) => (
              <div key={i} className="htl3-ur-bar-row">
                <span>{rating.label}</span>
                <div className="htl3-ur-bar">
                  <div style={{ width: `${rating.value}%` }} />
                </div>
                <span>{rating.value}%</span>
              </div>
            ))}
          </div>

          <div className="htl3-ur-last-ratings">
            <b>Last 10 Customer Ratings (Latest First)</b>
            <div className="htl3-ur-rating-bubbles">
              {[3, 5, 5, 3, 5, 2, 1, 5, 3, 5].map((rating, i) => (
                <span key={i}>{rating}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="htl3-ur-review-list">
          {visibleReviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}

          <div className="htl3-ur-pagination">
            <button><FaChevronLeft /></button>
            <span className="active">1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <button><FaChevronRight /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReviews;
