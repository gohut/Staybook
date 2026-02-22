import "./FlightsFiltersSidebar.scss";
import { useMemo, useRef } from "react";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function FlightsFiltersSidebar({
  fromCity,
  departureAirports,
  selectedDepartureAirports,
  onToggleDepartureAirport,
  priceRange,
  onPriceChange,
  stopFilters,
  selectedStops,
  onToggleStop,
}) {
  const trackRef = useRef(null);
  const minPrice = priceRange.min || 0;
  const maxPrice = priceRange.max || minPrice;
  const selectedMax = clamp(
    Number(priceRange.selectedMax || maxPrice),
    minPrice,
    maxPrice
  );

  const percent = useMemo(() => {
    if (maxPrice === minPrice) {
      return 100;
    }
    return ((selectedMax - minPrice) / (maxPrice - minPrice)) * 100;
  }, [maxPrice, minPrice, selectedMax]);

  const appliedCount = useMemo(() => {
    const hasPriceFilter = selectedMax < maxPrice;
    return (
      selectedDepartureAirports.size +
      selectedStops.size +
      (hasPriceFilter ? 1 : 0)
    );
  }, [selectedDepartureAirports, selectedStops, selectedMax, maxPrice]);

  const handleTrackClick = (event) => {
    if (!trackRef.current || maxPrice === minPrice) {
      return;
    }
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const value = Math.round(minPrice + ratio * (maxPrice - minPrice));
    onPriceChange(value);
  };

  const handleTrackKey = (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }
    const step = Math.max(50, Math.round((maxPrice - minPrice) / 25));
    if (event.key === "ArrowLeft") {
      onPriceChange(selectedMax - step);
    } else {
      onPriceChange(selectedMax + step);
    }
  };

  return (
    <aside className="ffs-wrap">
      <div className="ffs-card">
        <div className="ffs-section">
          <h4 className="ffs-title">Departure Airports</h4>

          <div className="ffs-list">
            {departureAirports.map((airport) => {
              const active = selectedDepartureAirports.has(airport.id);
              return (
                <button
                  key={airport.id}
                  type="button"
                  className={`ffs-item ${active ? "active" : ""}`}
                  onClick={() => onToggleDepartureAirport(airport.id)}
                >
                  <span className="ffs-box">
                    {active ? <FaCheckSquare /> : <FaRegSquare />}
                  </span>
                  <span className="ffs-label">{airport.label}</span>
                  <span className="ffs-price">{airport.priceLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="ffs-section">
          <h4 className="ffs-title">One Way Price</h4>

          <div className="ffs-slider">
            <div
              className="ffs-track"
              ref={trackRef}
              role="button"
              tabIndex={0}
              onClick={handleTrackClick}
              onKeyDown={handleTrackKey}
            >
              <div className="ffs-fill" style={{ width: `${percent}%` }} />
              <div className="ffs-knob" style={{ right: `${100 - percent}%` }} />
            </div>

            <div className="ffs-range">
              <span>{`Rs ${minPrice.toLocaleString("en-IN")}`}</span>
              <span>{`Rs ${selectedMax.toLocaleString("en-IN")}`}</span>
            </div>
          </div>
        </div>

        <div className="ffs-section">
          <h4 className="ffs-title">Stops From {fromCity}</h4>

          <div className="ffs-list">
            {stopFilters.map((stop) => {
              const active = selectedStops.has(stop.id);
              return (
                <button
                  key={stop.id}
                  type="button"
                  className={`ffs-item ${active ? "active" : ""}`}
                  onClick={() => onToggleStop(stop.id)}
                >
                  <span className="ffs-box">
                    {active ? <FaCheckSquare /> : <FaRegSquare />}
                  </span>
                  <span className="ffs-label">{stop.label}</span>
                  <span className="ffs-price">{stop.priceLabel}</span>
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
