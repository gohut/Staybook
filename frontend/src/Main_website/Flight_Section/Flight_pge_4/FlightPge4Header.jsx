// FlightPge4Header.jsx
import "./FlightPge4Header.css";
import { FaChevronDown, FaRegClock, FaRegCalendarAlt } from "react-icons/fa";
import { MdFlightTakeoff } from "react-icons/md";

export default function FlightPge4Header() {
  return (
    <div className="fp4h-wrap">
      {/* Left Card */}
      <div className="fp4h-leftCard">
        <div className="fp4h-leftTop">
          <div className="fp4h-logoBox">
            <div className="fp4h-logo" />
          </div>

          <div className="fp4h-main">
            <div className="fp4h-titleRow">
              <div className="fp4h-title">New Delhi (DEL) → Bengaluru (BLR)</div>

              <button className="fp4h-viewBtn" type="button">
                VIEW DETAILS <FaChevronDown />
              </button>
            </div>

            <div className="fp4h-metaRow">
              <div className="fp4h-meta">
                <FaRegCalendarAlt />
                Tue, 27 Jan&apos;26
              </div>

              <div className="fp4h-meta">
                <FaRegClock />
                9:45 PM → 12:35 AM
              </div>

              <div className="fp4h-meta">(2h 50m)</div>

              <div className="fp4h-meta">(non-stop)</div>
            </div>
          </div>
        </div>

        <div className="fp4h-divider" />

        <div className="fp4h-bottomRow">
          <div className="fp4h-user">
            <span className="fp4h-dotIc">●</span>
            Karthi Kishor P (Primary)
          </div>

          <div className="fp4h-user">
            <MdFlightTakeoff className="fp4h-smallIc" />
            717823s129@kce.ac.in, +91-8610006097
          </div>
        </div>
      </div>

      {/* Right Card */}
      <div className="fp4h-rightCard">
        <div className="fp4h-rightHead">
          <div className="fp4h-rightTitle">Total Due</div>
          <div className="fp4h-amount">₹ 7,409</div>
        </div>

        <div className="fp4h-rightLine" />

        <div className="fp4h-breakRow">
          <div className="fp4h-breakLeft">Fare</div>
          <div className="fp4h-breakRight">₹ 6,989</div>
        </div>

        <div className="fp4h-breakRow">
          <div className="fp4h-breakLeft">Convenience Fee</div>
          <div className="fp4h-breakRight">₹ 420</div>
        </div>
      </div>
    </div>
  );
}
