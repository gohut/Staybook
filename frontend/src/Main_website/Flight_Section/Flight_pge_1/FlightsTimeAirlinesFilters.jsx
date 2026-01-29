import "./FlightsTimeAirlinesFilters.css";
import { useMemo, useState } from "react";
import { FaRegSquare, FaCheckSquare } from "react-icons/fa";
import { FiSunrise, FiSun, FiSunset, FiMoon } from "react-icons/fi";

const TIME_BLOCKS = [
  { id: "before6", label: "Before\n6 AM", icon: <FiSunrise /> },
  { id: "6to12", label: "6 AM to\n12 PM", icon: <FiSun /> },
  { id: "12to6", label: "12 PM to\n6 PM", icon: <FiSunset /> },
  { id: "after6", label: "After\n6 PM", icon: <FiMoon /> },
];

const AIRLINES = [
  { id: "airindia", name: "Air India", price: "₹ 7,171" },
  { id: "airindiaexpress", name: "Air India Express", price: "₹ 7,119" },
  { id: "akasa", name: "Akasa Air", price: "₹ 7,018" },
  { id: "indigo", name: "IndiGo", price: "₹ 7,121" },
  { id: "spicejet", name: "SpiceJet", price: "₹ 7,237" },
];

const AIRCRAFT = [
  { id: "large", name: "Large Aircraft", price: "₹ 8,233" },
  { id: "smallmid", name: "Small / Mid - size aircraft", price: "₹ 7,018" },
];

export default function FlightsTimeAirlinesFilters() {
  const [depTime, setDepTime] = useState(new Set([]));
  const [arrTime, setArrTime] = useState(new Set([]));
  const [airlines, setAirlines] = useState(new Set([]));
  const [aircraft, setAircraft] = useState(new Set([]));

  const toggle = (setter, setState, id) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totals = useMemo(() => {
    return depTime.size + arrTime.size + airlines.size + aircraft.size;
  }, [depTime, arrTime, airlines, aircraft]);

  return (
    <aside className="ftaf-wrap">
      <div className="ftaf-card">
        {/* Departure time */}
        <div className="ftaf-section">
          <h4 className="ftaf-title">Departure From New Delhi</h4>

          <div className="ftaf-timeGrid">
            {TIME_BLOCKS.map((t) => {
              const active = depTime.has(t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`ftaf-timeBtn ${active ? "active" : ""}`}
                  onClick={() => toggle(setDepTime, depTime, t.id)}
                >
                  <span className="ftaf-timeIcon">{t.icon}</span>
                  <span className="ftaf-timeText">
                    {t.label.split("\n").map((line, i) => (
                      <span key={i}>{line}</span>
                    ))}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Arrival time */}
        <div className="ftaf-section">
          <h4 className="ftaf-title">Arrival at Bengaluru</h4>

          <div className="ftaf-timeGrid">
            {TIME_BLOCKS.map((t) => {
              const active = arrTime.has(t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`ftaf-timeBtn ${active ? "active" : ""}`}
                  onClick={() => toggle(setArrTime, arrTime, t.id)}
                >
                  <span className="ftaf-timeIcon">{t.icon}</span>
                  <span className="ftaf-timeText">
                    {t.label.split("\n").map((line, i) => (
                      <span key={i}>{line}</span>
                    ))}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Airlines */}
        <div className="ftaf-section">
          <h4 className="ftaf-title">Airlines</h4>

          <div className="ftaf-list">
            {AIRLINES.map((a) => {
              const active = airlines.has(a.id);
              return (
                <button
                  key={a.id}
                  type="button"
                  className={`ftaf-item ${active ? "active" : ""}`}
                  onClick={() =>
                    setAirlines((prev) => {
                      const next = new Set(prev);
                      if (next.has(a.id)) next.delete(a.id);
                      else next.add(a.id);
                      return next;
                    })
                  }
                >
                  <span className="ftaf-box">
                    {active ? <FaCheckSquare /> : <FaRegSquare />}
                  </span>

                  <span className="ftaf-itemText">
                    <span className="ftaf-airDot" />
                    {a.name}
                  </span>

                  <span className="ftaf-price">{a.price}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Aircraft size */}
        <div className="ftaf-section">
          <h4 className="ftaf-title">Aircraft Size</h4>

          <div className="ftaf-list">
            {AIRCRAFT.map((a) => {
              const active = aircraft.has(a.id);
              return (
                <button
                  key={a.id}
                  type="button"
                  className={`ftaf-item ${active ? "active" : ""}`}
                  onClick={() =>
                    setAircraft((prev) => {
                      const next = new Set(prev);
                      if (next.has(a.id)) next.delete(a.id);
                      else next.add(a.id);
                      return next;
                    })
                  }
                >
                  <span className="ftaf-box">
                    {active ? <FaCheckSquare /> : <FaRegSquare />}
                  </span>

                  <span className="ftaf-itemText">{a.name}</span>
                  <span className="ftaf-price">{a.price}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="ftaf-footer">
          Applied: <b>{totals}</b>
        </div>
      </div>
    </aside>
  );
}
