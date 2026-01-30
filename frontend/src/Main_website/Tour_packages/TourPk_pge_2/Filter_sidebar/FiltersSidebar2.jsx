// FiltersSidebar.jsx
import { FiChevronUp, FiSearch } from "react-icons/fi";
import "./FiltersSidebar2.scss";

export default function FiltersSidebar2() {
  return (
    <aside className="filters-wrap">
      <div className="filters-section">
        <div className="filters-head">
          <span>Duration (in Nights)</span>
          <FiChevronUp />
        </div>

        <div className="range-wrap">
          <div className="range-track active"></div>
          <span className="range-thumb left"></span>
          <span className="range-thumb right"></span>
        </div>

        <div className="range-label">
          <span>1N</span>
          <span>3N</span>
        </div>
      </div>

      <div className="divider" />

      <div className="filters-section">
        <div className="filters-head">
          <span>Flights</span>
          <FiChevronUp />
        </div>

        <div className="pill-row">
          <div className="pill disabled">With Flight</div>
          <div className="pill active">Without Flight (24)</div>
        </div>
      </div>

      <div className="divider" />

      <div className="filters-section">
        <div className="filters-head">
          <span>Budget (per person)</span>
          <FiChevronUp />
        </div>

        <div className="range-wrap">
          <div className="range-track active"></div>
          <span className="range-thumb left"></span>
          <span className="range-thumb right"></span>
        </div>

        <div className="range-label">
          <span>₹0</span>
          <span>₹20,000</span>
        </div>

        <div className="check-list">
          <label><input type="checkbox" /><span>&lt; ₹10,000</span><em>(16)</em></label>
          <label><input type="checkbox" /><span>₹10,000 - ₹15,000</span><em>(9)</em></label>
          <label><input type="checkbox" /><span>&gt; ₹15,000</span><em>(2)</em></label>
        </div>
      </div>

      <div className="divider" />

      <div className="filters-section">
        <div className="filters-head">
          <span>Hotel Category</span>
          <FiChevronUp />
        </div>

        <div className="hotel-grid">
          <div className="hotel-box">&lt;3★<span>(2)</span></div>
          <div className="hotel-box">3★<span>(12)</span></div>
          <div className="hotel-box">4★<span>(8)</span></div>
          <div className="hotel-box">5★<span>(6)</span></div>
        </div>
      </div>

      <div className="divider" />

      <div className="filters-section">
        <div className="filters-head">
          <span>Cities</span>
          <FiChevronUp />
        </div>

        <div className="city-search">
          <input placeholder="" />
          <FiSearch />
        </div>

        <div className="check-list">
          <label><input type="checkbox" /><span>Munnar</span><em>(8)</em></label>
          <label><input type="checkbox" /><span>Wayanad</span><em>(8)</em></label>
          <label><input type="checkbox" /><span>Alleppey</span><em>(2)</em></label>
          <label><input type="checkbox" /><span>Cochin</span><em>(2)</em></label>
        </div>

        <div className="show-more">Show More</div>
      </div>

      <div className="divider" />

      <div className="filters-section">
        <div className="filters-head">
          <span>Themes</span>
          <FiChevronUp />
        </div>
      </div>

      <div className="divider" />

      <div className="filters-section">
        <div className="filters-head">
          <span>Package Type</span>
          <FiChevronUp />
        </div>

        <div className="pill-row">
          <div className="pill active">Customizable (24)</div>
          <div className="pill disabled">Group Package (0)</div>
        </div>
      </div>

      <div className="divider" />

      <div className="filters-section">
        <div className="filters-head">
          <span>Premium Packages</span>
          <FiChevronUp />
        </div>

        <label className="single-check">
          <input type="checkbox" />
          <span>Premium packages</span>
          <em>(8)</em>
        </label>
      </div>

      <div className="divider" />

      <div className="filters-section">
        <div className="filters-head">
          <span>Buy Now, Pay Later</span>
          <FiChevronUp />
        </div>

        <label className="single-check">
          <input type="checkbox" />
          <span>Book @ ₹2,000</span>
          <em>(51)</em>
        </label>
      </div>
    </aside>
  );
}