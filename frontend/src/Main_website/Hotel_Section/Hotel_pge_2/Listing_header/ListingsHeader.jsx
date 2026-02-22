import "./ListingsHeader.scss";

const SORT_OPTIONS = [
  { key: "popularity", label: "Popularity" },
  { key: "price_low_high", label: "Price (Low to High)" },
  { key: "price_high_low", label: "Price (High to Low)" },
  { key: "rating_high", label: "User Rating" },
  { key: "best_value", label: "Lowest Price & Best Rated" },
];

const ListingsHeader = ({ city, count, activeSort, onSortChange }) => {
  return (
    <div className="listings-header">
      <h2>
        {count} Properties in {city}
      </h2>

      <div className="sort-tabs">
        {SORT_OPTIONS.map((option) => (
          <span
            key={option.key}
            className={activeSort === option.key ? "active" : ""}
            onClick={() => onSortChange(option.key)}
          >
            {option.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ListingsHeader;
