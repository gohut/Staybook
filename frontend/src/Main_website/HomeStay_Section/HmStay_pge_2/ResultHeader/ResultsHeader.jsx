// ResultsHeader.jsx
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./ResultsHeader.css";

const ResultsHeader = () => {
  return (
    <div className="results-header">
      <div className="breadcrumb">
        <span className="link">Home</span>
        <span className="sep">›</span>
        <span>Homestays and more in Mumbai</span>
      </div>

      <h1>433 Properties in Mumbai</h1>

      <div className="sort-bar">
        <FaChevronLeft className="nav-icon" />

        <button className="sort-btn active">Popularity</button>
        <button className="sort-btn">Price (Low to High)</button>
        <button className="sort-btn">Price (High to Low)</button>
        <button className="sort-btn">User Rating (Highest)</button>
        <button className="sort-btn">Lowest Price & Best Rated</button>

        <FaChevronRight className="nav-icon" />
      </div>

      <div className="sub-title">Showing Properties in Mumbai</div>
    </div>
  );
};

export default ResultsHeader;
