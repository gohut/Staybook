import "./FlightsTimeAirlinesFilters.scss";
import { useMemo } from "react";
import { FaRegSquare, FaCheckSquare } from "react-icons/fa";
import { FiSunrise, FiSun, FiSunset, FiMoon } from "react-icons/fi";

const iconByTimeId = {
  before6: <FiSunrise />,
  "6to12": <FiSun />,
  "12to6": <FiSunset />,
  after6: <FiMoon />,
};

export default function FlightsTimeAirlinesFilters({
  fromCity,
  toCity,
  timeBlocks,
  selectedDepTime,
  selectedArrTime,
  onToggleDepTime,
  onToggleArrTime,
  airlines,
  selectedAirlines,
  onToggleAirline,
  aircraft,
  selectedAircraft,
  onToggleAircraft,
}) {
  const totals = useMemo(
    () =>
      selectedDepTime.size +
      selectedArrTime.size +
      selectedAirlines.size +
      selectedAircraft.size,
    [selectedDepTime, selectedArrTime, selectedAirlines, selectedAircraft]
  );

  return (
    <aside className="ftaf-wrap">
      <div className="ftaf-card">
        <div className="ftaf-section">
          <h4 className="ftaf-title">Departure From {fromCity}</h4>

          <div className="ftaf-timeGrid">
            {timeBlocks.map((timeBlock) => {
              const active = selectedDepTime.has(timeBlock.id);
              return (
                <button
                  key={timeBlock.id}
                  type="button"
                  className={`ftaf-timeBtn ${active ? "active" : ""}`}
                  onClick={() => onToggleDepTime(timeBlock.id)}
                >
                  <span className="ftaf-timeIcon">{iconByTimeId[timeBlock.id]}</span>
                  <span className="ftaf-timeText">
                    {timeBlock.label.split("\n").map((line) => (
                      <span key={`${timeBlock.id}-${line}`}>{line}</span>
                    ))}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="ftaf-section">
          <h4 className="ftaf-title">Arrival at {toCity}</h4>

          <div className="ftaf-timeGrid">
            {timeBlocks.map((timeBlock) => {
              const active = selectedArrTime.has(timeBlock.id);
              return (
                <button
                  key={timeBlock.id}
                  type="button"
                  className={`ftaf-timeBtn ${active ? "active" : ""}`}
                  onClick={() => onToggleArrTime(timeBlock.id)}
                >
                  <span className="ftaf-timeIcon">{iconByTimeId[timeBlock.id]}</span>
                  <span className="ftaf-timeText">
                    {timeBlock.label.split("\n").map((line) => (
                      <span key={`${timeBlock.id}-arr-${line}`}>{line}</span>
                    ))}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="ftaf-section">
          <h4 className="ftaf-title">Airlines</h4>

          <div className="ftaf-list">
            {airlines.map((airline) => {
              const active = selectedAirlines.has(airline.id);
              return (
                <button
                  key={airline.id}
                  type="button"
                  className={`ftaf-item ${active ? "active" : ""}`}
                  onClick={() => onToggleAirline(airline.id)}
                >
                  <span className="ftaf-box">
                    {active ? <FaCheckSquare /> : <FaRegSquare />}
                  </span>

                  <span className="ftaf-itemText">
                    <span className="ftaf-airDot" />
                    {airline.name}
                  </span>

                  <span className="ftaf-price">{airline.priceLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="ftaf-section">
          <h4 className="ftaf-title">Aircraft Size</h4>

          <div className="ftaf-list">
            {aircraft.map((item) => {
              const active = selectedAircraft.has(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`ftaf-item ${active ? "active" : ""}`}
                  onClick={() => onToggleAircraft(item.id)}
                >
                  <span className="ftaf-box">
                    {active ? <FaCheckSquare /> : <FaRegSquare />}
                  </span>

                  <span className="ftaf-itemText">{item.name}</span>
                  <span className="ftaf-price">{item.priceLabel}</span>
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
