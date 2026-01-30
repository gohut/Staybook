import "./BookingTopSummaryBar.scss";
import { FaChevronDown, FaPen } from "react-icons/fa";

export default function BookingTopSummaryBar() {
  return (
    <section className="btsb2-wrap">
      {/* blue bg */}
      <div className="btsb2-bg" />

      <div className="btsb2-inner">
        {/* header row */}
        <div className="btsb2-titleRow">
          <h2>Complete your booking</h2>

          <div className="btsb2-steps">
            {["Trip Summary", "Travel Insurance", "Traveler Details", "Seats & Meals", "Add-ons"].map(
              (t) => (
                <button key={t} className="btsb2-step" type="button">
                  {t}
                </button>
              )
            )}
          </div>
        </div>

        {/* content row */}
        <div className="btsb2-grid">
          {/* LEFT boxes */}
          <div className="btsb2-left">
            <div className="btsb2-card btsb2-trip">
              <div className="btsb2-cardHead">
                <b>Trip Summary</b>
                <FaChevronDown className="btsb2-down" />
              </div>
              <div className="btsb2-sub">
                New Delhi → Bengaluru &nbsp; Tuesday, Jan 27 • Non Stop • 2h 50m
              </div>
            </div>

            <div className="btsb2-card btsb2-mini">
              <div className="btsb2-miniLeft">
                <b>Traveller Details</b>
                <span className="btsb2-name">Karthi Kishor P</span>
              </div>
              <button className="btsb2-edit" type="button">
                <FaPen />
              </button>
            </div>

            <div className="btsb2-card btsb2-mini">
              <div className="btsb2-miniLeft">
                <b>Your State</b>
              </div>
              <button className="btsb2-edit" type="button">
                <FaPen />
              </button>
            </div>
          </div>

          {/* RIGHT fare */}
          <aside className="btsb2-right">
            <div className="btsb2-fareCard">
              <h3>Fare Summary</h3>

              <div className="btsb2-fareRow">
                <span>Base Fare</span>
                <b>₹ 6,100</b>
              </div>

              <div className="btsb2-fareRow">
                <span>Taxes and Surcharges</span>
                <b>₹ 889</b>
              </div>

              <div className="btsb2-fareRow">
                <span>Other Services</span>
                <b>₹ 369</b>
              </div>

              <div className="btsb2-total">
                <span>Total Amount</span>
                <b>₹ 7,358</b>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
