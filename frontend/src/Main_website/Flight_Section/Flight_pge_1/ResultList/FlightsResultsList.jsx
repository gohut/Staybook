// FlightsResultsList.jsx
import "./FlightsResultsList.scss";
import { FaLock } from "react-icons/fa";
import FlightsAdBanner from "../FlightAd/FlightsAdBanner"
import { useNavigate } from "react-router-dom";


const FLIGHTS = [
  {
    id: 1,
    airline: "Akasa Air",
    code: "QP 1824",
    departTime: "19:55",
    departCity: "New Delhi",
    duration: "03 h",
    stop: "Non stop",
    arriveTime: "22:55",
    arriveCity: "Bengaluru",
    price: "₹ 7,018",
    lock: "Lock this price @ ₹ 413 →",
    promo:
      "FLAT ₹ 184 OFF using MMTSUPER | FLAT 500 OFF on ICICI Credit Cards using MMTICICIFEST.",
  },
  {
    id: 2,
    airline: "Akasa Air",
    code: "QP 1350",
    departTime: "20:50",
    departCity: "New Delhi",
    duration: "03 h 05 m",
    stop: "Non stop",
    arriveTime: "23:55",
    arriveCity: "Bengaluru",
    price: "₹ 7,018",
    lock: "Lock this price @ ₹ 373 →",
    promo:
      "FLAT ₹ 185 OFF using MMTSUPER | FLAT 500 OFF on ICICI Credit Cards using MMTICICIFEST.",
  },
  {
    id: 3,
    airline: "Akasa Air",
    code: "QP 1812",
    departTime: "23:10",
    departCity: "New Delhi",
    duration: "03 h",
    stop: "Non stop",
    arriveTime: "02:10",
    arriveCity: "Bengaluru",
    price: "₹ 7,018",
    lock: "Lock this price @ ₹ 413 →",
    promo:
      "FLAT ₹ 184 OFF using MMTSUPER | FLAT 500 OFF on ICICI Credit Cards using MMTICICIFEST.",
  },
  {
    id: 4,
    airline: "Air India Express",
    code: "IX 2679",
    departTime: "21:10",
    departCity: "New Delhi",
    duration: "02 h 55 m",
    stop: "Non stop",
    arriveTime: "00:05",
    arriveCity: "Bengaluru",
    price: "₹ 7,119",
    lock: "Lock this price @ ₹ 413 →",
    promo:
      "FLAT ₹ 314 OFF using MMTSUPER | FLAT 500 OFF on ICICI Credit Cards using MMTICICIFEST.",
  },
  {
    id: 5,
    airline: "Air India Express",
    code: "IX 1056",
    departTime: "22:20",
    departCity: "New Delhi",
    duration: "02 h 55 m",
    stop: "Non stop",
    arriveTime: "01:15",
    arriveCity: "Bengaluru",
    price: "₹ 7,119",
    lock: "Lock this price @ ₹ 413 →",
    promo:
      "FLAT ₹ 314 OFF using MMTSUPER | FLAT 500 OFF on ICICI Credit Cards using MMTICICIFEST.",
  },
  {
    id: 6,
    airline: "IndiGo",
    code: "6E 6810",
    departTime: "13:00",
    departCity: "New Delhi",
    duration: "02 h 55 m",
    stop: "Non stop",
    arriveTime: "15:55",
    arriveCity: "Bengaluru",
    price: "₹ 12,689",
    lock: "Lock this price @ ₹ 673 →",
    promo:
      "FLAT ₹ 185 OFF using MMTSUPER | FLAT 200 OFF on ICICI Credit Cards using MMTICICIFEST.",
  },
];

function FlightCard({ f }) {
  const navigate = useNavigate();

  return (
    <article className="frl-card">
      <div className="frl-topNote">Free Seat with VISA Signature*</div>

      <div className="frl-row">
        {/* Airline */}
        <div className="frl-airline">
          <div className="frl-logo">{f.airline?.[0] || "A"}</div>
          <div>
            <div className="frl-name">{f.airline}</div>
            <div className="frl-code">{f.code}</div>
          </div>
        </div>

        {/* Depart */}
        <div className="frl-timeBlock">
          <div className="frl-time">{f.departTime}</div>
          <div className="frl-city">{f.departCity}</div>
        </div>

        {/* Duration */}
        <div className="frl-midBlock">
          <div className="frl-duration">{f.duration}</div>
          <div className="frl-line" />
          <div className="frl-stop">{f.stop}</div>
        </div>

        {/* Arrive */}
        <div className="frl-timeBlock">
          <div className="frl-time">{f.arriveTime}</div>
          <div className="frl-city">{f.arriveCity}</div>
        </div>

        {/* Price */}
        <div className="frl-priceBlock">
          <div className="frl-price">{f.price}</div>
          <div className="frl-per">/ adult</div>
        </div>

        {/* CTA */}
        <div className="frl-actions">
          <button className="frl-btn" type="button"  onClick={() => navigate("/flight2")}>
            VIEW PRICES
          </button>
          <button className="frl-lock" type="button">
            <FaLock /> {f.lock}
          </button>
        </div>
      </div>

      <div className="frl-linksRow">
        <button className="frl-link blue" type="button">
          Add to compare <span className="frl-plus">+</span>
        </button>
        <button className="frl-link" type="button" onClick={() => navigate("/flight2")}>
          View Flight Details
        </button>
      </div>

      <div className="frl-promo">
        <span className="frl-dot" />
        {f.promo}
      </div>
    </article>
  );
}

export default function FlightsResultsList() {
  return (
    <section className="frl-wrap">
      <FlightCard f={FLIGHTS[0]} />
      <FlightCard f={FLIGHTS[1]} />

      {/* Banner inserted like screenshot (no "Sponsored" part) */}
      <FlightsAdBanner />

      {FLIGHTS.slice(2).map((f) => (
        <FlightCard key={f.id} f={f} />
      ))}
    </section>
  );
}
