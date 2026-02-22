// FilterSidebar.jsx
import React from "react";
import { FaSearch, FaChevronRight } from "react-icons/fa";
import {
  HOMESTAY_LOCATION_OPTIONS,
  HOMESTAY_PRICE_OPTIONS,
  HOMESTAY_RATING_OPTIONS,
  HOMESTAY_SUGGESTED_OPTIONS,
  HOMESTAY_TYPE_OPTIONS,
} from "./filterOptions";
import "./FilterSidebar.scss";

const Section = ({ title, children }) => (
  <div className="hm-filter-section">
    <h4>{title}</h4>
    {children}
  </div>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label className="hm-filter-checkbox">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span>{label}</span>
  </label>
);

const FilterSidebar = ({
  mapEmbedUrl,
  onExploreMap = () => {},
  hideMapSection = false,
  hideSearchBox = false,
  filters,
  onSearchTextChange,
  onToggleSuggested,
  onTogglePriceRange,
  onToggleRating,
  onToggleType,
  onToggleLocation,
  onBudgetChange,
  onApplyBudget,
  onClearFilters,
}) => {
  return (
    <aside className="filter-sidebar">
      {!hideMapSection && (
        <div className="homestay-map-box">
          <iframe
            className="homestay-map-preview"
            title="Homestay locations map preview"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={mapEmbedUrl}
          />
          <button type="button" className="homestay-map-btn" onClick={onExploreMap}>
            EXPLORE ON MAP
          </button>
        </div>
      )}

      {!hideSearchBox && (
        <div className="hm-filter-search">
          <FaSearch />
          <input
            placeholder="Search locality / property"
            value={filters.searchText}
            onChange={(event) => onSearchTextChange(event.target.value)}
          />
        </div>
      )}

      <button type="button" className="hm-clear-btn" onClick={onClearFilters}>
        Clear all filters
      </button>

      <Section title="Suggested For You">
        {HOMESTAY_SUGGESTED_OPTIONS.map((option) => (
          <Checkbox
            key={option.key}
            label={option.label}
            checked={Boolean(filters.suggested[option.key])}
            onChange={() => onToggleSuggested(option.key)}
          />
        ))}
      </Section>

      <Section title="Price Per Night">
        {HOMESTAY_PRICE_OPTIONS.map((option) => (
          <Checkbox
            key={option.key}
            label={option.label}
            checked={filters.selectedPriceRanges.includes(option.key)}
            onChange={() => onTogglePriceRange(option.key)}
          />
        ))}
        <div className="hm-filter-budget">
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
            <FaChevronRight />
          </button>
        </div>
      </Section>

      <Section title="User Rating">
        {HOMESTAY_RATING_OPTIONS.map((option) => (
          <Checkbox
            key={option.key}
            label={option.label}
            checked={filters.selectedRatings.includes(option.min)}
            onChange={() => onToggleRating(option.min)}
          />
        ))}
      </Section>

      <Section title="Property Type">
        {HOMESTAY_TYPE_OPTIONS.map((type) => (
          <Checkbox
            key={type}
            label={type}
            checked={filters.selectedTypes.includes(type)}
            onChange={() => onToggleType(type)}
          />
        ))}
      </Section>

      <Section title="Top locations">
        {HOMESTAY_LOCATION_OPTIONS.map((location) => (
          <Checkbox
            key={location}
            label={location}
            checked={filters.selectedLocations.includes(location)}
            onChange={() => onToggleLocation(location)}
          />
        ))}
      </Section>
    </aside>
  );
};

export default FilterSidebar;
