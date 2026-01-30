// UserReviews.jsx
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "./UserReviews.scss";

const ratingBars = [
  { label: "Excellent", value: 51 },
  { label: "Very Good", value: 27 },
  { label: "Average", value: 11 },
  { label: "Poor", value: 5 },
  { label: "Bad", value: 6 },
];

const categories = [
  { label: "Hospitality", score: 4.4 },
  { label: "Facilities", score: 4.3 },
  { label: "Food", score: 3.7 },
  { label: "Room", score: 4.4 },
  { label: "Cleanliness", score: 4.2 },
  { label: "Value For Money", score: 3.9 },
];

const filters = [
  "All Reviews",
  "Friendly staff",
  "Good location",
  "Delicious breakfast",
  "Nice hotel ambience",
  "Excellent service",
  "Large swimming pool",
  "Lively atmosphere",
  "Crowded breakfast area",
  "Limited breakfast variety",
  "Indoor music events",
];

const ReviewCard = ({ score, title, meta, text }) => (
  <div className="review-card">
    <div className="review-score">{score.toFixed(1)}</div>
    <div className="review-content">
      <b>{title}</b>
      <span className="review-meta">{meta}</span>
      <p>{text}</p>
      <div className="review-footer">
        <span><b>Travel Month:</b> Dec 2025</span>
        <span><b>Room:</b> Deluxe Room King Bed</span>
      </div>
    </div>
  </div>
);

const UserReviews = () => {
  return (
    <div className="reviews-wrapper">
      <h3>User Rating & Reviews</h3>

      <div className="review-tabs">
        <span className="active">Everyone</span>
        <span>Group</span>
        <span>Couple</span>
        <span>Solo</span>
        <span>Business</span>
        <span>Family</span>
      </div>

      <div className="review-grid">
        {/* LEFT SUMMARY */}
        <div className="review-summary">
          <div className="overall">
            <div className="overall-score">3.9</div>
            <div>
              <b>Very Good</b>
              <span>6312 Ratings, 3646 Reviews</span>
            </div>
          </div>

          <div className="bars">
            {ratingBars.map((r, i) => (
              <div key={i} className="bar-row">
                <span>{r.label}</span>
                <div className="bar">
                  <div style={{ width: `${r.value}%` }} />
                </div>
                <span>{r.value}%</span>
              </div>
            ))}
          </div>

          <div className="last-ratings">
            <b>Last 10 Customer Ratings (Latest First)</b>
            <div className="rating-bubbles">
              {[3,5,5,3,5,2,1,5,3,5].map((r,i)=>(
                <span key={i}>{r}</span>
              ))}
            </div>
          </div>

          <div className="categories">
            <b>Rating Categories</b>
            {categories.map((c,i)=>(
              <div key={i} className="cat-row">
                <span>{c.label}</span>
                <span className="cat-score">{c.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="review-list">
          <div className="review-top">
            <div className="filter-box">
              <b>Filter By:</b>
              <div className="filters">
                {filters.map((f,i)=>(
                  <span key={i} className={i===0?"active":""}>{f}</span>
                ))}
              </div>
            </div>

            <div className="sort">
              <span>Sort by:</span>
              <select>
                <option>Latest first</option>
              </select>
            </div>
          </div>

          <ReviewCard
            score={3.0}
            title="overall experience"
            meta="Shailesh K · Family With 1 Kid"
            text="Food good, hospitality good, room less lighted, no balcony, poor drainage in the bathroom. Bar area excellent. Pool awesome."
          />

          <ReviewCard
            score={3.0}
            title="Average Stay"
            meta="Mithilesh K · Family With 2 Kids"
            text="Property located far inside from main road. Cab issues. Pool facility is plus point but reception process is very slow."
          />

          <ReviewCard
            score={1.0}
            title="Poor experience with no hot water and very small restaurant"
            meta="Qaid H · Couple"
            text="Worst experience here. No hot water. Swimming pool temperature not controlled. Restaurant was congested."
          />

          <div className="pagination">
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
