import "./SearchBar.scss";

const SearchBar = ({
  values,
  onFieldChange,
  onSearch,
}) => {
  return (
    <div className="search-bar">
      <input
        value={values.city}
        onChange={(event) => onFieldChange("city", event.target.value)}
        placeholder="City, area or property"
      />
      <input
        type="date"
        value={values.checkInDate}
        onChange={(event) => onFieldChange("checkInDate", event.target.value)}
      />
      <input
        type="date"
        min={values.checkInDate}
        value={values.checkOutDate}
        onChange={(event) => onFieldChange("checkOutDate", event.target.value)}
      />
      <input
        value={values.guestSummary}
        onChange={(event) => onFieldChange("guestSummary", event.target.value)}
        placeholder="1 Room, 2 Adults"
      />
      <button type="button" onClick={onSearch}>
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;
