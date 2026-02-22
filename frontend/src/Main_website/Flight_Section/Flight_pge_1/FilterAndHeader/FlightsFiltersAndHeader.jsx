import "./FlightsFiltersAndHeader.scss";
import { useEffect, useMemo, useState } from "react";
import {
  FaCheckSquare,
  FaRegSquare,
  FaChevronLeft,
  FaChevronRight,
  FaRegCreditCard,
  FaBolt,
  FaStar,
  FaSlidersH,
  FaTimes,
} from "react-icons/fa";

export default function FlightsFiltersAndHeader({
  title,
  flightsCount,
  popularFilters,
  selectedPopular,
  appliedPills,
  onTogglePopular,
  onRemovePopular,
  onClearPopular,
  quickDates,
  activeDate,
  onDateChange,
  sortModes,
  activeSortMode,
  sortSummaries,
  onSortChange,
}) {
  const [dateOffset, setDateOffset] = useState(0);

  useEffect(() => {
    setDateOffset(0);
  }, [quickDates]);

  const visibleDates = useMemo(
    () => quickDates.slice(dateOffset, dateOffset + 8),
    [quickDates, dateOffset]
  );

  const canGoLeft = dateOffset > 0;
  const canGoRight = dateOffset + 8 < quickDates.length;

  return (
    <section className="ffh-wrap">
      <aside className="ffh-left">
        <div className="ffh-filterCard">
          <div className="ffh-filterTop">
            <div>
              <h4>Applied Filters</h4>

              <div className="ffh-pillRow">
                {appliedPills.length === 0 ? (
                  <span className="ffh-pillEmpty">No filters applied</span>
                ) : (
                  appliedPills.map((pill) => (
                    <span key={pill.id} className="ffh-pill">
                      {pill.label.toUpperCase()}
                      <button
                        className="ffh-pillClose"
                        onClick={() => onRemovePopular(pill.id)}
                        aria-label={`remove ${pill.label}`}
                        type="button"
                      >
                        <FaTimes />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            <button className="ffh-clearAll" onClick={onClearPopular} type="button">
              CLEAR ALL
            </button>
          </div>

          <div className="ffh-filterSection">
            <h5>Popular Filters</h5>

            {popularFilters.map((filterItem) => {
              const active = selectedPopular.has(filterItem.id);
              return (
                <button
                  key={filterItem.id}
                  type="button"
                  className={`ffh-filterItem ${active ? "active" : ""}`}
                  onClick={() => onTogglePopular(filterItem.id)}
                >
                  <span className="ffh-check">
                    {active ? <FaCheckSquare /> : <FaRegSquare />}
                  </span>
                  <span className="ffh-filterText">{filterItem.label}</span>
                  <span className="ffh-price">{filterItem.priceLabel}</span>
                </button>
              );
            })}

            <button className="ffh-more" type="button">
              + Functional filters
            </button>
          </div>
        </div>
      </aside>

      <main className="ffh-right">
        <h2 className="ffh-title">
          {title} {flightsCount ? `(${flightsCount})` : ""}
        </h2>

        <div className="ffh-cardsRow">
          <div className="ffh-promoCard">
            <div className="ffh-promoIcon">
              <FaRegCreditCard />
            </div>
            <div className="ffh-promoText">
              <div className="ffh-promoHead">Flat instant card discount available</div>
              <div className="ffh-promoSub">Apply offers on selected cards</div>
            </div>
          </div>

          <div className="ffh-promoCard">
            <img
              className="ffh-promoImg"
              src="https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&w=240&q=60"
              alt="promo"
            />
            <div className="ffh-promoText">
              <div className="ffh-promoHead">Meet and Greet & Porter Services</div>
              <div className="ffh-promoSub">Add airport concierge assistance</div>
            </div>
          </div>
        </div>

        <div className="ffh-dateStrip">
          <button
            className="ffh-navBtn"
            type="button"
            onClick={() => setDateOffset((prev) => Math.max(0, prev - 1))}
            disabled={!canGoLeft}
          >
            <FaChevronLeft />
          </button>

          <div className="ffh-dateRow">
            {visibleDates.map((day) => (
              <button
                key={day.dateValue}
                className={`ffh-day ${activeDate === day.dateValue ? "active" : ""}`}
                type="button"
                onClick={() => onDateChange(day.dateValue)}
              >
                <span>{day.label}</span>
                <strong>{day.priceLabel}</strong>
              </button>
            ))}
          </div>

          <button
            className="ffh-navBtn"
            type="button"
            onClick={() => setDateOffset((prev) => prev + 1)}
            disabled={!canGoRight}
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="ffh-sortRow">
          {sortModes.map((mode) => (
            <button
              key={mode.id}
              className={`ffh-sortBox ${activeSortMode === mode.id ? "active" : ""} ${
                mode.id === "other" ? "small" : ""
              }`}
              type="button"
              onClick={() => onSortChange(mode.id)}
            >
              <span className={`ffh-sortIcon ${mode.id === "cheapest" ? "blue" : ""}`}>
                {mode.id === "cheapest" ? (
                  "Rs"
                ) : mode.id === "nonstop" ? (
                  <FaBolt />
                ) : mode.id === "prefer" ? (
                  <FaStar />
                ) : (
                  <FaSlidersH />
                )}
              </span>
              <div>
                <div className="ffh-sortHead">{mode.label}</div>
                <div className="ffh-sortSub">{sortSummaries[mode.id] || "No fares"}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="ffh-subtitle">Flights sorted by your selected filters and search</div>
      </main>
    </section>
  );
}
