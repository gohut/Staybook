// FilterSidebar.jsx
import {
  FaSearch,
  FaMapMarkedAlt,
  FaChevronRight,
} from "react-icons/fa";
import "./FilterSidebar.css";

const FilterSidebar = () => {
  return (
    <aside className="filter-sidebar">
      <div className="map-box">
        <FaMapMarkedAlt />
        <button>EXPLORE ON MAP</button>
      </div>

      <div className="search-box">
        <FaSearch />
        <input placeholder="Search for" />
      </div>

      <Section title="Suggested For You">
        <Checkbox label="Early Bird Deals" count="88" />
        <Checkbox label="Entire Villas & Apartments" count="88" />
        <Checkbox label="Rated Very Good by Travellers" count="123" />
        <Checkbox label="Villa" count="33" />
        <Checkbox label="Apartment" count="300" />
        <span className="link">Show 4 more</span>
      </Section>

      <Section title="Price Per Night">
        <Checkbox label="₹0 - ₹4000" count="156" />
        <Checkbox label="₹4000 - ₹8000" count="161" />
        <Checkbox label="₹8000 - ₹11000" count="50" />
        <Checkbox label="₹11000 - ₹15000" count="27" />
        <Checkbox label="₹15000 - ₹30000" count="29" />
        <Checkbox label="₹30000+" count="3" />
        <div className="budget">
          <input placeholder="Min" />
          <span>to</span>
          <input placeholder="Max" />
          <button>
            <FaChevronRight />
          </button>
        </div>
      </Section>

      <Section title="User Rating">
        <Checkbox label="Excellent: 4.2+" count="74" />
        <Checkbox label="Very Good: 3.5+" count="199" />
        <Checkbox label="Good: 3+" count="130" />
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

const Checkbox = ({ label, count }) => (
  <label className="checkbox">
    <input type="checkbox" />
    <span>{label}</span>
    <em>({count})</em>
  </label>
);

export default FilterSidebar;
