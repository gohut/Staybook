// FilterSidebar.jsx
import React, { useState } from 'react';
import {
  FaSearch,
  FaMapMarkedAlt,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import "./FilterSidebar.scss";

const FilterSidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showMoreSuggested, setShowMoreSuggested] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  
  const [filters, setFilters] = useState({
    suggested: {
      'Early Bird Deals': false,
      'Entire Villas & Apartments': false,
      'Rated Very Good by Travellers': false,
      'Villa': false,
      'Apartment': false,
      'North Goa': false,
      'South Goa': false,
      'Swimming Pool': false,
      'Kitchen Available': false,
    },
    price: {
      '₹0 - ₹4000': false,
      '₹4000 - ₹8000': false,
      '₹8000 - ₹11000': false,
      '₹11000 - ₹15000': false,
      '₹15000 - ₹30000': false,
      '₹30000+': false,
    },
    rating: {
      'Excellent: 4.2+': false,
      'Very Good: 3.5+': false,
      'Good: 3+': false,
    }
  });

  const handleCheckboxChange = (category, label) => {
    setFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [label]: !prev[category][label]
      }
    }));
  };

  const handleBudgetSubmit = () => {
    console.log('Budget range:', { min: minPrice, max: maxPrice });
    // Apply budget filter logic here
  };
  return (
    <aside className="filter-sidebar">
      <div className="map-box">
        <FaMapMarkedAlt />
        <button>EXPLORE ON MAP</button>
      </div>

      <div className="search-box">
        <FaSearch />
        <input 
          placeholder="Search for" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Section title="Suggested For You">
        <Checkbox 
          label="Early Bird Deals" 
          count="88" 
          checked={filters.suggested['Early Bird Deals']}
          onChange={() => handleCheckboxChange('suggested', 'Early Bird Deals')}
        />
        <Checkbox 
          label="Entire Villas & Apartments" 
          count="88" 
          checked={filters.suggested['Entire Villas & Apartments']}
          onChange={() => handleCheckboxChange('suggested', 'Entire Villas & Apartments')}
        />
        <Checkbox 
          label="Rated Very Good by Travellers" 
          count="123" 
          checked={filters.suggested['Rated Very Good by Travellers']}
          onChange={() => handleCheckboxChange('suggested', 'Rated Very Good by Travellers')}
        />
        <Checkbox 
          label="Villa" 
          count="33" 
          checked={filters.suggested['Villa']}
          onChange={() => handleCheckboxChange('suggested', 'Villa')}
        />
        <Checkbox 
          label="Apartment" 
          count="300" 
          checked={filters.suggested['Apartment']}
          onChange={() => handleCheckboxChange('suggested', 'Apartment')}
        />
        {showMoreSuggested && (
          <>
            <Checkbox 
              label="North Goa" 
              count="45" 
              checked={filters.suggested['North Goa']}
              onChange={() => handleCheckboxChange('suggested', 'North Goa')}
            />
            <Checkbox 
              label="South Goa" 
              count="67" 
              checked={filters.suggested['South Goa']}
              onChange={() => handleCheckboxChange('suggested', 'South Goa')}
            />
            <Checkbox 
              label="Swimming Pool" 
              count="89" 
              checked={filters.suggested['Swimming Pool']}
              onChange={() => handleCheckboxChange('suggested', 'Swimming Pool')}
            />
            <Checkbox 
              label="Kitchen Available" 
              count="156" 
              checked={filters.suggested['Kitchen Available']}
              onChange={() => handleCheckboxChange('suggested', 'Kitchen Available')}
            />
          </>
        )}
        <span 
          className="link" 
          onClick={() => setShowMoreSuggested(!showMoreSuggested)}
        >
          {showMoreSuggested ? 'Show less' : 'Show 4 more'}
          {showMoreSuggested ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </Section>

      <Section title="Price Per Night">
        <Checkbox 
          label="₹0 - ₹4000" 
          count="156" 
          checked={filters.price['₹0 - ₹4000']}
          onChange={() => handleCheckboxChange('price', '₹0 - ₹4000')}
        />
        <Checkbox 
          label="₹4000 - ₹8000" 
          count="161" 
          checked={filters.price['₹4000 - ₹8000']}
          onChange={() => handleCheckboxChange('price', '₹4000 - ₹8000')}
        />
        <Checkbox 
          label="₹8000 - ₹11000" 
          count="50" 
          checked={filters.price['₹8000 - ₹11000']}
          onChange={() => handleCheckboxChange('price', '₹8000 - ₹11000')}
        />
        <Checkbox 
          label="₹11000 - ₹15000" 
          count="27" 
          checked={filters.price['₹11000 - ₹15000']}
          onChange={() => handleCheckboxChange('price', '₹11000 - ₹15000')}
        />
        <Checkbox 
          label="₹15000 - ₹30000" 
          count="29" 
          checked={filters.price['₹15000 - ₹30000']}
          onChange={() => handleCheckboxChange('price', '₹15000 - ₹30000')}
        />
        <Checkbox 
          label="₹30000+" 
          count="3" 
          checked={filters.price['₹30000+']}
          onChange={() => handleCheckboxChange('price', '₹30000+')}
        />
        <div className="budget">
          <input 
            placeholder="Min" 
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span>to</span>
          <input 
            placeholder="Max" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <button onClick={handleBudgetSubmit}>
            <FaChevronRight />
          </button>
        </div>
      </Section>

      <Section title="User Rating">
        <Checkbox 
          label="Excellent: 4.2+" 
          count="74" 
          checked={filters.rating['Excellent: 4.2+']}
          onChange={() => handleCheckboxChange('rating', 'Excellent: 4.2+')}
        />
        <Checkbox 
          label="Very Good: 3.5+" 
          count="199" 
          checked={filters.rating['Very Good: 3.5+']}
          onChange={() => handleCheckboxChange('rating', 'Very Good: 3.5+')}
        />
        <Checkbox 
          label="Good: 3+" 
          count="130" 
          checked={filters.rating['Good: 3+']}
          onChange={() => handleCheckboxChange('rating', 'Good: 3+')}
        />
      </Section>
    </aside>
  );
};

const Section = ({ title, children }) => (
  <div className="section">
    <h4>{title}</h4>
    {children}
  </div>
);

const Checkbox = ({ label, count, checked, onChange }) => (
  <label className="checkbox">
    <input 
      type="checkbox" 
      checked={checked}
      onChange={onChange}
    />
    <span>{label}</span>
    <em>({count})</em>
  </label>
);

export default FilterSidebar;
