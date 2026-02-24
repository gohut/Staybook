// Reviews.jsx
import "./Reviews.scss";
import { FiFilter, FiMessageCircle, FiSearch, FiStar } from "react-icons/fi";

const summaryCards = [
  { label: "Average Rating", value: "4.6", note: "Last 30 days" },
  { label: "Total Reviews", value: "128", note: "All time" },
  { label: "5-Star Reviews", value: "72%", note: "Last 30 days" },
  { label: "Response Rate", value: "93%", note: "Last 90 days" },
];

const reviews = [
  {
    name: "Sarah Mitchell",
    room: "Executive Suite",
    rating: 5,
    date: "Jan 20, 2026",
    text: "Outstanding stay. The staff was attentive and the room was spotless.",
    status: "Responded",
  },
  {
    name: "Michael Chen",
    room: "Deluxe Ocean View",
    rating: 4,
    date: "Jan 18, 2026",
    text: "Great view and comfortable bed. Breakfast could be warmer.",
    status: "Needs Reply",
  },
  {
    name: "Emily Rodriguez",
    room: "Family Suite",
    rating: 5,
    date: "Jan 15, 2026",
    text: "Perfect for our family. Spacious rooms and quick check-in.",
    status: "Responded",
  },
];

const RatingStars = ({ rating }) => (
  <div className="rating-stars">
    {Array.from({ length: 5 }).map((_, index) => (
      <FiStar key={index} className={index < rating ? "filled" : ""} />
    ))}
    <span>{rating}.0</span>
  </div>
);

const SummaryCard = ({ label, value, note }) => (
  <div className="review-summary-card">
    <p>{label}</p>
    <h3>{value}</h3>
    <span>{note}</span>
  </div>
);

const ReviewCard = ({ name, room, rating, date, text, status }) => {
  const statusKey = status.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="review-card">
      <div className="review-card-top">
        <div>
          <h4>{name}</h4>
          <p>{room}</p>
        </div>
        <RatingStars rating={rating} />
      </div>

      <p className="review-text">{text}</p>

      <div className="review-card-bottom">
        <span className="review-date">{date}</span>
        <span className={`review-status ${statusKey}`}>{status}</span>
        <button className="review-reply">
          <FiMessageCircle />
          Reply
        </button>
      </div>
    </div>
  );
};

const Reviews = () => {
  return (
    <div className="reviews-page">
      <div className="page-head">
        <div>
          <h2>Reviews</h2>
          <p>Monitor guest feedback and respond faster.</p>
        </div>
      </div>

      <div className="review-filter">
        <div className="review-search">
          <FiSearch />
          <input placeholder="Search by guest name or room..." />
        </div>
        <button className="review-filter-btn">
          <FiFilter />
          Latest
        </button>
      </div>

      <div className="review-summary">
        {summaryCards.map((card) => (
          <SummaryCard key={card.label} {...card} />
        ))}
      </div>

      <div className="review-list">
        {reviews.map((review) => (
          <ReviewCard key={`${review.name}-${review.date}`} {...review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
