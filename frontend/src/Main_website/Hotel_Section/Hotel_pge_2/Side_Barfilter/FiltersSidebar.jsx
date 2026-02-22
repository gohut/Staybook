// FiltersSidebar.jsx
import "./FiltersSidebar.scss";
import {
  HOTEL_LOCATION_OPTIONS,
  HOTEL_PRICE_OPTIONS,
  HOTEL_PROPERTY_TYPES,
  HOTEL_RATING_OPTIONS,
  HOTEL_STAR_OPTIONS,
  HOTEL_SUGGESTED_OPTIONS,
} from "./filterOptions";

const Section = ({ title, children }) => (
  <div className="hotel-filter-section">
    <h4>{title}</h4>
    {children}
  </div>
);

const Item = ({ label, count, checked, onChange }) => (
  <label className="hotel-filter-item">
    <input
      className="hotel-filter-checkbox"
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
    <span className="hotel-filter-label">{label}</span>
    {count !== undefined && <span className="hotel-filter-count">({count})</span>}
  </label>
);

export default function FiltersSidebar({
  mapEmbedUrl,
  onExploreMap = () => {},
  hideMapSection = false,
  hideSearchBox = false,
  filters,
  onSearchTextChange,
  onToggleSuggested,
  onTogglePriceRange,
  onToggleStar,
  onToggleRating,
  onTogglePropertyType,
  onToggleLocation,
  onBudgetChange,
  onApplyBudget,
  onClearFilters,
}) {
  return (
    <aside className="hotel-filters-sidebar">
      {!hideMapSection && (
        <div className="hotel-map-box">
          <iframe
            className="hotel-map-preview"
            title="Hotel locations map preview"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={mapEmbedUrl}
          />
          <button type="button" className="hotel-map-btn" onClick={onExploreMap}>
            EXPLORE ON MAP
          </button>
        </div>
      )}

      {!hideSearchBox && (
        <div className="hotel-filter-search">
          <input
            placeholder="Search locality / hotel name"
            value={filters.searchText}
            onChange={(event) => onSearchTextChange(event.target.value)}
          />
        </div>
      )}

      <button
        type="button"
        className="hotel-filter-clear-btn"
        onClick={onClearFilters}
      >
        Clear all filters
      </button>

      <Section title="Suggested For You">
        {HOTEL_SUGGESTED_OPTIONS.map((option) => (
          <Item
            key={option.key}
            label={option.label}
            checked={Boolean(filters.suggested[option.key])}
            onChange={() => onToggleSuggested(option.key)}
          />
        ))}
      </Section>

      <Section title="Price per night">
        {HOTEL_PRICE_OPTIONS.map((option) => (
          <Item
            key={option.key}
            label={option.label}
            checked={filters.selectedPriceRanges.includes(option.key)}
            onChange={() => onTogglePriceRange(option.key)}
          />
        ))}
        <div className="hotel-filter-budget">
          <input
            placeholder="Min"
            value={filters.minBudget}
            onChange={(event) => onBudgetChange("minBudget", event.target.value)}
          />
          <span>to</span>
          <input
            placeholder="Max"
            value={filters.maxBudget}
            onChange={(event) => onBudgetChange("maxBudget", event.target.value)}
          />
          <button type="button" onClick={onApplyBudget}>
            &gt;
          </button>
        </div>
      </Section>

      <Section title="Star Category">
        {HOTEL_STAR_OPTIONS.map((option) => (
          <Item
            key={option.key}
            label={option.label}
            checked={filters.selectedStars.includes(option.value)}
            onChange={() => onToggleStar(option.value)}
          />
        ))}
      </Section>

      <Section title="User Rating">
        {HOTEL_RATING_OPTIONS.map((option) => (
          <Item
            key={option.key}
            label={option.label}
            checked={filters.selectedRatings.includes(option.min)}
            onChange={() => onToggleRating(option.min)}
          />
        ))}
      </Section>

      <Section title="Property Type">
        {HOTEL_PROPERTY_TYPES.map((type) => (
          <Item
            key={type}
            label={type}
            checked={filters.selectedPropertyTypes.includes(type)}
            onChange={() => onTogglePropertyType(type)}
          />
        ))}
      </Section>

      <Section title="Top locations">
        {HOTEL_LOCATION_OPTIONS.map((location) => (
          <Item
            key={location}
            label={location}
            checked={filters.selectedLocations.includes(location)}
            onChange={() => onToggleLocation(location)}
          />
        ))}
      </Section>
    </aside>
  );
}
