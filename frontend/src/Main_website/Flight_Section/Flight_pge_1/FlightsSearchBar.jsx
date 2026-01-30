import "./FlightsSearchBar.scss";
import { FaExchangeAlt } from "react-icons/fa";
import { IoChevronDownOutline } from "react-icons/io5";

export default function FlightsSearchBar() {
  return (
    <section className="fsb-wrap">
      <div className="fsb-card">
        {/* Row 1 */}
        <div className="fsb-row1">
          <div className="fsb-item">
            <div className="fsb-label">
              TRIP TYPE <IoChevronDownOutline className="fsb-dd" />
            </div>
            <div className="fsb-value">One Way</div>
          </div>

          <div className="fsb-item">
            <div className="fsb-label">FROM</div>
            <div className="fsb-value">New Delhi, India</div>
          </div>

          <button className="fsb-swap" aria-label="swap">
            <FaExchangeAlt />
          </button>

          <div className="fsb-item">
            <div className="fsb-label">TO</div>
            <div className="fsb-value">Bengaluru, India</div>
          </div>

          <div className="fsb-item">
            <div className="fsb-label">DEPART</div>
            <div className="fsb-value">Tue, 27 Jan 26</div>
          </div>

          <div className="fsb-item">
            <div className="fsb-label">RETURN</div>
            <div className="fsb-value fsb-muted">Select Return</div>
          </div>

          <div className="fsb-item">
            <div className="fsb-label">PASSENGER & CLASS</div>
            <div className="fsb-value">1 Adult, Economy/Pre</div>
          </div>

          <button className="fsb-search">SEARCH</button>
        </div>

        {/* Row 2 */}
        <div className="fsb-row2">
          <span className="fsb-fare">Fare type:</span>

          <label className="fsb-radio">
            <input type="radio" name="fare" defaultChecked />
            <span className="fsb-dot" />
            Regular
          </label>

          <label className="fsb-radio">
            <input type="radio" name="fare" />
            <span className="fsb-dot" />
            Travelling for work?
            <span className="fsb-new">new</span>
          </label>

          <label className="fsb-radio">
            <input type="radio" name="fare" />
            <span className="fsb-dot" />
            Student
          </label>

          <label className="fsb-radio">
            <input type="radio" name="fare" />
            <span className="fsb-dot" />
            Armed Forces
          </label>

          <label className="fsb-radio">
            <input type="radio" name="fare" />
            <span className="fsb-dot" />
            Senior Citizen
          </label>

          <label className="fsb-radio">
            <input type="radio" name="fare" />
            <span className="fsb-dot" />
            Doctor and Nurses
          </label>

          <label className="fsb-check">
            <input type="checkbox" />
            <span className="fsb-box" />
            Add Zero Cancellation
          </label>
        </div>
      </div>
    </section>
  );
}
