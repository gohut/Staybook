import "./FlightsFiltersSidebar.scss";
import { useMemo, useState } from "react";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";

const FILTER_GROUPS = [
  {
    title: "Departure Airports",
    key: "departureAirports",
    items: [
      { id: "igi", label: "Indira Gandhi International Airport", price: "₹ 7,018" },
      { id: "hindon", label: "Hindon Airport (32Km)", price: "₹ 9,223" },
    ],
  },
  {
    title: "Stops From New Delhi",
    key: "stops",
    items: [
      { id: "nonstop", label: "Non Stop", price: "₹ 7,018" },
      { id: "1stop", label: "1 Stop", price: "₹ 9,106" },
    ],
  },
];

export default function FlightsFiltersSidebar() {
  const [selected, setSelected] = useState({
    departureAirports: new Set([]),
    stops: new Set(["nonstop"]),
  });

  const toggle = (groupKey, id) => {
    setSelected((prev) => {
      const next = { ...prev };
      const setCopy = new Set(next[groupKey]);
      if (setCopy.has(id)) setCopy.delete(id);
      else setCopy.add(id);
      next[groupKey] = setCopy;
      return next;
    });
  };

  const appliedCount = useMemo(() => {
    return Object.values(selected).reduce((acc, s) => acc + s.size, 0);
  }, [selected]);

  return (
    <aside className="ffs-wrap">
      <div className="ffs-card">
        <div className="ffs-section">
          <h4 className="ffs-title">Departure Airports</h4>

          <div className="ffs-list">
            {FILTER_GROUPS[0].items.map((f) => {
              const active = selected.departureAirports.has(f.id);
              return (
                <button
                  key={f.id}
                  type="button"
                  className={`ffs-item ${active ? "active" : ""}`}
                  onClick={() => toggle("departureAirports", f.id)}
                >
                  <span className="ffs-box">
                    {active ? <FaCheckSquare /> : <FaRegSquare />}
                  </span>
                  <span className="ffs-label">{f.label}</span>
                  <span className="ffs-price">{f.price}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="ffs-section">
          <h4 className="ffs-title">One Way Price</h4>

          <div className="ffs-slider">
            <div className="ffs-track">
              <div className="ffs-fill" />
              <div className="ffs-knob" />
            </div>

            <div className="ffs-range">
              <span>₹ 7,018</span>
              <span>₹ 22,500</span>
            </div>
          </div>
        </div>

        <div className="ffs-section">
          <h4 className="ffs-title">Stops From New Delhi</h4>

          <div className="ffs-list">
            {FILTER_GROUPS[1].items.map((f) => {
              const active = selected.stops.has(f.id);
              return (
                <button
                  key={f.id}
                  type="button"
                  className={`ffs-item ${active ? "active" : ""}`}
                  onClick={() => toggle("stops", f.id)}
                >
                  <span className="ffs-box">
                    {active ? <FaCheckSquare /> : <FaRegSquare />}
                  </span>
                  <span className="ffs-label">{f.label}</span>
                  <span className="ffs-price">{f.price}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="ffs-footerNote">
          Applied: <b>{appliedCount}</b>
        </div>
      </div>
    </aside>
  );
}
