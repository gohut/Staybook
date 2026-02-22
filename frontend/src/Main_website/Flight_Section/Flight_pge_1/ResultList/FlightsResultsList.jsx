import "./FlightsResultsList.scss";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FlightsAdBanner from "../FlightAd/FlightsAdBanner";

function FlightCard({ flight }) {
  const navigate = useNavigate();

  return (
    <article className="frl-card">
      <div className="frl-topNote">Free Seat with VISA Signature*</div>

      <div className="frl-row">
        <div className="frl-airline">
          <div className="frl-logo">{flight.airline?.[0] || "A"}</div>
          <div>
            <div className="frl-name">{flight.airline}</div>
            <div className="frl-code">{flight.code}</div>
          </div>
        </div>

        <div className="frl-timeBlock">
          <div className="frl-time">{flight.departTime}</div>
          <div className="frl-city">{flight.departCity}</div>
        </div>

        <div className="frl-midBlock">
          <div className="frl-duration">{flight.duration}</div>
          <div className="frl-line" />
          <div className="frl-stop">{flight.stop}</div>
        </div>

        <div className="frl-timeBlock">
          <div className="frl-time">{flight.arriveTime}</div>
          <div className="frl-city">{flight.arriveCity}</div>
        </div>

        <div className="frl-priceBlock">
          <div className="frl-price">{flight.price}</div>
          <div className="frl-per">/ adult</div>
        </div>

        <div className="frl-actions">
          <button
            className="frl-btn"
            type="button"
            onClick={() => navigate("/flight2", { state: { flight } })}
          >
            VIEW PRICES
          </button>
          <button className="frl-lock" type="button">
            <FaLock /> {flight.lock}
          </button>
        </div>
      </div>

      <div className="frl-linksRow">
        <button className="frl-link blue" type="button">
          Add to compare <span className="frl-plus">+</span>
        </button>
        <button
          className="frl-link"
          type="button"
          onClick={() => navigate("/flight2", { state: { flight } })}
        >
          View Flight Details
        </button>
      </div>

      <div className="frl-promo">
        <span className="frl-dot" />
        {flight.promo}
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <article className="frl-card">
      <div className="frl-topNote">No flights match your current search and filters.</div>
      <div className="frl-row" style={{ gridTemplateColumns: "1fr" }}>
        <div className="frl-name">Try updating your route, date, fare type, or price range.</div>
      </div>
    </article>
  );
}

export default function FlightsResultsList({ flights }) {
  if (!flights.length) {
    return (
      <section className="frl-wrap">
        <EmptyState />
      </section>
    );
  }

  return (
    <section className="frl-wrap">
      {flights.slice(0, 2).map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}

      <FlightsAdBanner />

      {flights.slice(2).map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </section>
  );
}
