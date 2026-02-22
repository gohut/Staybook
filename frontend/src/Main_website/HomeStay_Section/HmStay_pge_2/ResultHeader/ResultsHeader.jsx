// ResultsHeader.jsx
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./ResultsHeader.scss";

const SORT_OPTIONS = [
  { key: "popularity", label: "Popularity" },
  { key: "price_low_high", label: "Price (Low to High)" },
  { key: "price_high_low", label: "Price (High to Low)" },
  { key: "rating_high", label: "User Rating (Highest)" },
  { key: "best_value", label: "Lowest Price & Best Rated" },
];

const ResultsHeader = ({ city, count, activeSort, onSortChange }) => {
  return (
    <div className="results-header">
      <div className="breadcrumb">
        <span className="link">Home</span>
        <span className="sep">{">"}</span>
        <span>Homestays and more in {city}</span>
      </div>

      <h1>
        {count} Properties in {city}
      </h1>

      <div className="sort-bar">
        <FaChevronLeft className="nav-icon" />

        {SORT_OPTIONS.map((option) => (
          <button
            key={option.key}
            type="button"
            className={`sort-btn ${activeSort === option.key ? "active" : ""}`}
            onClick={() => onSortChange(option.key)}
          >
            {option.label}
          </button>
        ))}

        <FaChevronRight className="nav-icon" />
      </div>

      <div className="sub-title">Showing Properties in {city}</div>
    </div>
  );
};

export default ResultsHeader;
