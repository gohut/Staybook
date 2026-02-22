import "./FlightsSearchBar.scss";
import { FaExchangeAlt } from "react-icons/fa";
import { IoChevronDownOutline } from "react-icons/io5";

const controlStyle = {
  width: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
  fontSize: "14px",
  fontWeight: 700,
  color: "#222",
  marginTop: "2px",
  padding: 0,
};

const miniControlStyle = {
  ...controlStyle,
  minWidth: 0,
};

const nextDay = (dateValue) => {
  if (!dateValue) {
    return "";
  }
  const date = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  date.setDate(date.getDate() + 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function FlightsSearchBar({
  airports,
  tripOptions,
  fareOptions,
  travelClasses,
  values,
  onChange,
  onSwap,
  onSearch,
}) {
  return (
    <section className="fsb-wrap">
      <div className="fsb-card">
        <div className="fsb-row1">
          <div className="fsb-item">
            <div className="fsb-label">
              TRIP TYPE <IoChevronDownOutline className="fsb-dd" />
            </div>
            <select
              style={controlStyle}
              value={values.tripType}
              onChange={(event) => onChange({ tripType: event.target.value })}
            >
              {tripOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="fsb-item">
            <div className="fsb-label">FROM</div>
            <select
              style={controlStyle}
              value={values.fromCode}
              onChange={(event) => onChange({ fromCode: event.target.value })}
            >
              {airports.map((airport) => (
                <option key={airport.code} value={airport.code}>
                  {airport.city}, {airport.country}
                </option>
              ))}
            </select>
          </div>

          <button className="fsb-swap" aria-label="swap" type="button" onClick={onSwap}>
            <FaExchangeAlt />
          </button>

          <div className="fsb-item">
            <div className="fsb-label">TO</div>
            <select
              style={controlStyle}
              value={values.toCode}
              onChange={(event) => onChange({ toCode: event.target.value })}
            >
              {airports.map((airport) => (
                <option key={airport.code} value={airport.code}>
                  {airport.city}, {airport.country}
                </option>
              ))}
            </select>
          </div>

          <div className="fsb-item">
            <div className="fsb-label">DEPART</div>
            <input
              style={controlStyle}
              type="date"
              value={values.departureDate}
              onChange={(event) => onChange({ departureDate: event.target.value })}
            />
          </div>

          <div className="fsb-item">
            <div className="fsb-label">RETURN</div>
            <input
              style={{
                ...controlStyle,
                color: values.tripType === "round_trip" ? "#222" : "#9a9a9a",
              }}
              type="date"
              value={values.returnDate}
              min={nextDay(values.departureDate)}
              disabled={values.tripType !== "round_trip"}
              onChange={(event) => onChange({ returnDate: event.target.value })}
            />
          </div>

          <div className="fsb-item">
            <div className="fsb-label">PASSENGER & CLASS</div>
            <div style={{ display: "grid", gridTemplateColumns: "76px 1fr", gap: "6px", width: "100%" }}>
              <input
                style={miniControlStyle}
                type="number"
                min={1}
                max={9}
                value={values.adults}
                onChange={(event) =>
                  onChange({
                    adults: Number(event.target.value || 1),
                  })
                }
              />
              <select
                style={miniControlStyle}
                value={values.travelClass}
                onChange={(event) => onChange({ travelClass: event.target.value })}
              >
                {travelClasses.map((travelClass) => (
                  <option key={travelClass} value={travelClass}>
                    {travelClass}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="fsb-search" type="button" onClick={onSearch}>
            SEARCH
          </button>
        </div>

        <div className="fsb-row2">
          <span className="fsb-fare">Fare type:</span>

          {fareOptions.map((fareLabel) => (
            <label key={fareLabel} className="fsb-radio">
              <input
                type="radio"
                name="fare"
                checked={values.fareType === fareLabel}
                onChange={() => onChange({ fareType: fareLabel })}
              />
              <span className="fsb-dot" />
              {fareLabel}
              {fareLabel === "Travelling for work?" ? (
                <span className="fsb-new">new</span>
              ) : null}
            </label>
          ))}

          <label className="fsb-check">
            <input
              type="checkbox"
              checked={values.zeroCancellation}
              onChange={(event) => onChange({ zeroCancellation: event.target.checked })}
            />
            <span className="fsb-box" />
            Add Zero Cancellation
          </label>
        </div>
      </div>
    </section>
  );
}
