import "./FiltersSidebar.css";

const FiltersSidebar = () => {
  return (
    <aside className="filters">
      <div className="map-card">
        <button>EXPLORE ON MAP</button>
      </div>

      <input
        className="search-locality"
        placeholder="Search for locality / hotel name"
      />

      <div className="filter-group">
        <h4>Suggested For You</h4>
        <label><input type="checkbox" /> Rush Deal</label>
        <label><input type="checkbox" /> Last Minute Deals</label>
        <label><input type="checkbox" /> 5 Star</label>
      </div>

      <div className="filter-group">
        <h4>Price per night</h4>
        <label><input type="checkbox" /> ₹0 – ₹2500</label>
        <label><input type="checkbox" /> ₹2500 – ₹5500</label>
        <label><input type="checkbox" /> ₹5500 – ₹8000</label>
        <label><input type="checkbox" /> ₹8000+</label>
      </div>
    </aside>
  );
};

export default FiltersSidebar;
