import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./flightnav.scss";

const AIRPORTS = [
  {
    code: "DEL",
    city: "New Delhi",
    airport: "Indira Gandhi International Airport",
    country: "India",
  },
  {
    code: "BLR",
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    country: "India",
  },
  {
    code: "BOM",
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj Airport",
    country: "India",
  },
  {
    code: "HYD",
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    country: "India",
  },
  {
    code: "MAA",
    city: "Chennai",
    airport: "Chennai International Airport",
    country: "India",
  },
  {
    code: "CCU",
    city: "Kolkata",
    airport: "Netaji Subhas Chandra Bose Airport",
    country: "India",
  },
  {
    code: "GOI",
    city: "Goa",
    airport: "Dabolim International Airport",
    country: "India",
  },
  {
    code: "DXB",
    city: "Dubai",
    airport: "Dubai International Airport",
    country: "United Arab Emirates",
  },
  {
    code: "SIN",
    city: "Singapore",
    airport: "Singapore Changi Airport",
    country: "Singapore",
  },
  {
    code: "BKK",
    city: "Bangkok",
    airport: "Suvarnabhumi Airport",
    country: "Thailand",
  },
  {
    code: "KUL",
    city: "Kuala Lumpur",
    airport: "Kuala Lumpur International Airport",
    country: "Malaysia",
  },
];

const TRIP_OPTIONS = [
  { key: "one_way", label: "One Way" },
  { key: "round_trip", label: "Round Trip" },
  { key: "multi_city", label: "Multi City" },
];

const SPECIAL_FARES = [
  "Regular",
  "Travelling for work?",
  "Student",
  "Armed Forces",
  "Senior Citizen",
  "Doctor and Nurses",
];

const TRAVEL_CLASSES = [
  "Economy/Premium Economy",
  "Premium Economy",
  "Business",
  "First Class",
];

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const toStartOfDay = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const toStartOfMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const addDays = (date, count) => {
  const next = new Date(date);
  next.setDate(next.getDate() + count);
  return toStartOfDay(next);
};

const addMonths = (date, count) =>
  new Date(date.getFullYear(), date.getMonth() + count, 1);

const isSameDay = (a, b) =>
  a &&
  b &&
  a.getDate() === b.getDate() &&
  a.getMonth() === b.getMonth() &&
  a.getFullYear() === b.getFullYear();

const isAfterDay = (a, b) =>
  toStartOfDay(a).getTime() > toStartOfDay(b).getTime();

const isBeforeDay = (a, b) =>
  toStartOfDay(a).getTime() < toStartOfDay(b).getTime();

const buildMonthCells = (monthDate) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const monthDays = new Date(year, month + 1, 0).getDate();
  const cells = [];

  for (let i = 0; i < firstWeekday; i += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= monthDays; day += 1) {
    cells.push(new Date(year, month, day));
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
};

const formatCardDate = (date) => {
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = String(date.getFullYear()).slice(-2);
  return `${date.getDate()} ${month}'${year}`;
};

const formatWeekDay = (date) =>
  date.toLocaleDateString("en-US", { weekday: "long" });

const formatMonthTitle = (date) =>
  date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

const filterAirports = (query, excludeCode) => {
  const normalizedQuery = query.trim().toLowerCase();
  return AIRPORTS.filter((airport) => airport.code !== excludeCode).filter(
    (airport) =>
      !normalizedQuery ||
      airport.city.toLowerCase().includes(normalizedQuery) ||
      airport.code.toLowerCase().includes(normalizedQuery) ||
      airport.airport.toLowerCase().includes(normalizedQuery)
  );
};

export default function FlightNav() {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const today = useMemo(() => toStartOfDay(new Date()), []);
  const initialDeparture = useMemo(() => addDays(today, 7), [today]);
  const initialReturn = useMemo(() => addDays(today, 11), [today]);

  const [tripType, setTripType] = useState("one_way");
  const [fromAirport, setFromAirport] = useState(AIRPORTS[0]);
  const [toAirport, setToAirport] = useState(AIRPORTS[1]);
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [departureDate, setDepartureDate] = useState(initialDeparture);
  const [returnDate, setReturnDate] = useState(null);
  const [calendarBaseMonth, setCalendarBaseMonth] = useState(
    toStartOfMonth(initialDeparture)
  );
  const [openPanel, setOpenPanel] = useState(null);
  const [activeFare, setActiveFare] = useState(SPECIAL_FARES[0]);
  const [travellers, setTravellers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    travelClass: TRAVEL_CLASSES[0],
  });
  const [draftTravellers, setDraftTravellers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    travelClass: TRAVEL_CLASSES[0],
  });

  const isRoundTrip = tripType === "round_trip";
  const isDatePanelOpen = openPanel === "departure" || openPanel === "return";

  const filteredFromAirports = useMemo(
    () => filterAirports(fromSearch, toAirport.code),
    [fromSearch, toAirport.code]
  );

  const filteredToAirports = useMemo(
    () => filterAirports(toSearch, fromAirport.code),
    [toSearch, fromAirport.code]
  );

  const totalTravellers =
    travellers.adults + travellers.children + travellers.infants;
  const travellersSummary = `${totalTravellers} Traveller${
    totalTravellers > 1 ? "s" : ""
  }`;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenPanel(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenPanel(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleTripTypeChange = (nextType) => {
    setTripType(nextType);
    setOpenPanel(null);

    if (nextType === "round_trip") {
      if (!returnDate || !isAfterDay(returnDate, departureDate)) {
        setReturnDate(addDays(departureDate, 3));
      }
      return;
    }

    setReturnDate(null);
  };

  const handleSwapAirports = (event) => {
    event.stopPropagation();
    setFromAirport(toAirport);
    setToAirport(fromAirport);
  };

  const handleSelectFrom = (event, airport) => {
    event.stopPropagation();

    if (airport.code === toAirport.code) {
      setToAirport(fromAirport);
    }

    setFromAirport(airport);
    setFromSearch("");
    setOpenPanel(null);
  };

  const handleSelectTo = (event, airport) => {
    event.stopPropagation();

    if (airport.code === fromAirport.code) {
      setFromAirport(toAirport);
    }

    setToAirport(airport);
    setToSearch("");
    setOpenPanel(null);
  };

  const openDatePanel = (event, target) => {
    event.stopPropagation();
    if (target === "return" && !isRoundTrip) {
      return;
    }

    const focusDate =
      target === "return"
        ? returnDate || addDays(departureDate, 1)
        : departureDate;

    setCalendarBaseMonth(toStartOfMonth(focusDate));
    setOpenPanel(target);
  };

  const handleDatePick = (event, date) => {
    event.stopPropagation();
    if (!date) {
      return;
    }

    if (openPanel === "departure") {
      if (isBeforeDay(date, today)) {
        return;
      }

      setDepartureDate(date);
      if (returnDate && !isAfterDay(returnDate, date)) {
        setReturnDate(addDays(date, 1));
      }

      if (isRoundTrip) {
        setOpenPanel("return");
        setCalendarBaseMonth(toStartOfMonth(addDays(date, 1)));
      } else {
        setOpenPanel(null);
      }
      return;
    }

    if (openPanel === "return") {
      if (!isAfterDay(date, departureDate)) {
        return;
      }
      setReturnDate(date);
      setOpenPanel(null);
    }
  };

  const updateDraftCount = (event, type, delta) => {
    event.stopPropagation();

    setDraftTravellers((prev) => {
      const next = { ...prev };

      if (type === "adults") {
        next.adults = Math.max(1, Math.min(9, prev.adults + delta));
        if (next.adults + next.children > 9) {
          next.children = Math.max(0, 9 - next.adults);
        }
        if (next.infants > next.adults) {
          next.infants = next.adults;
        }
        return next;
      }

      if (type === "children") {
        const proposedChildren = Math.max(0, prev.children + delta);
        if (prev.adults + proposedChildren > 9) {
          return prev;
        }
        next.children = proposedChildren;
        return next;
      }

      if (type === "infants") {
        const proposedInfants = Math.max(0, prev.infants + delta);
        if (proposedInfants > prev.adults) {
          return prev;
        }
        next.infants = proposedInfants;
        return next;
      }

      return prev;
    });
  };

  const openTravellersPanel = (event) => {
    event.stopPropagation();
    setDraftTravellers(travellers);
    setOpenPanel("travellers");
  };

  const applyTravellers = (event) => {
    event.stopPropagation();
    setTravellers(draftTravellers);
    setOpenPanel(null);
  };

  const handleSearch = () => {
    navigate("/flight1", {
      state: {
        tripType,
        from: fromAirport,
        to: toAirport,
        departureDate,
        returnDate,
        travellers,
        fareType: activeFare,
      },
    });
  };

  const renderLocationPopover = (type) => {
    const isFrom = type === "from";
    const results = isFrom ? filteredFromAirports : filteredToAirports;
    const searchValue = isFrom ? fromSearch : toSearch;

    return (
      <div
        className={`flight-popover location-popover ${type}-popover`}
        onClick={(event) => event.stopPropagation()}
      >
        <input
          className="airport-search"
          type="text"
          value={searchValue}
          placeholder="Search city, airport or code"
          onChange={(event) =>
            isFrom
              ? setFromSearch(event.target.value)
              : setToSearch(event.target.value)
          }
        />
        <p className="popover-subtitle">Popular Airports</p>
        <div className="airport-list">
          {results.slice(0, 8).map((airport) => (
            <button
              type="button"
              key={airport.code}
              className="airport-item"
              onClick={(event) =>
                isFrom
                  ? handleSelectFrom(event, airport)
                  : handleSelectTo(event, airport)
              }
            >
              <div>
                <h5>{airport.city}</h5>
                <p>{airport.airport}</p>
              </div>
              <span>{airport.code}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderCalendarPopover = () => {
    const selectedDate = openPanel === "return" ? returnDate : departureDate;
    const firstMonth = calendarBaseMonth;
    const secondMonth = addMonths(calendarBaseMonth, 1);
    const months = [firstMonth, secondMonth];

    return (
      <div
        className={`flight-popover calendar-popover ${
          openPanel === "return" ? "align-right" : ""
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="calendar-toolbar">
          <button
            type="button"
            className="cal-nav-btn"
            onClick={(event) => {
              event.stopPropagation();
              setCalendarBaseMonth((prev) => addMonths(prev, -1));
            }}
          >
            &#8249;
          </button>
          <span>
            {openPanel === "return"
              ? "Select return date"
              : "Select departure date"}
          </span>
          <button
            type="button"
            className="cal-nav-btn"
            onClick={(event) => {
              event.stopPropagation();
              setCalendarBaseMonth((prev) => addMonths(prev, 1));
            }}
          >
            &#8250;
          </button>
        </div>

        <div className="calendar-months">
          {months.map((monthDate) => {
            const cells = buildMonthCells(monthDate);
            return (
              <div
                className="calendar-month"
                key={`${monthDate.getFullYear()}-${monthDate.getMonth()}`}
              >
                <h5>{formatMonthTitle(monthDate)}</h5>
                <div className="calendar-week-row">
                  {WEEK_DAYS.map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
                <div className="calendar-days-grid">
                  {cells.map((day, index) => {
                    if (!day) {
                      return (
                        <span
                          key={`blank-${index}`}
                          className="day-cell day-cell-blank"
                        />
                      );
                    }

                    const disabled =
                      openPanel === "return"
                        ? !isAfterDay(day, departureDate)
                        : isBeforeDay(day, today);
                    const selected = selectedDate && isSameDay(day, selectedDate);
                    const isToday = isSameDay(day, today);

                    return (
                      <button
                        type="button"
                        key={day.toISOString()}
                        className={`day-cell ${
                          selected ? "selected" : ""
                        } ${isToday ? "today" : ""}`}
                        disabled={disabled}
                        onClick={(event) => handleDatePick(event, day)}
                      >
                        {day.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flight-nav-wrapper" ref={wrapperRef}>
      <div className="trip-type">
        {TRIP_OPTIONS.map((option) => (
          <label key={option.key}>
            <input
              type="radio"
              name="tripType"
              checked={tripType === option.key}
              onChange={() => handleTripTypeChange(option.key)}
            />
            {option.label}
          </label>
        ))}
        <span className="trip-right-text">
          Book International and Domestic Flights
        </span>
      </div>

      <div className="flight-search-box">
        <div
          className={`field from clickable ${openPanel === "from" ? "open" : ""}`}
          onClick={() => setOpenPanel("from")}
        >
          <span className="label">From</span>
          <h3>{fromAirport.city}</h3>
          <p>
            {fromAirport.code}, {fromAirport.airport}
          </p>
          {openPanel === "from" && renderLocationPopover("from")}
        </div>

        <button
          type="button"
          className="swap"
          aria-label="Swap from and to cities"
          onClick={handleSwapAirports}
        >
          <FaExchangeAlt />
        </button>

        <div
          className={`field to clickable ${openPanel === "to" ? "open" : ""}`}
          onClick={() => setOpenPanel("to")}
        >
          <span className="label">To</span>
          <h3>{toAirport.city}</h3>
          <p>
            {toAirport.code}, {toAirport.airport}
          </p>
          {openPanel === "to" && renderLocationPopover("to")}
        </div>

        <div
          className={`field date clickable ${openPanel === "departure" ? "open" : ""}`}
          onClick={(event) => openDatePanel(event, "departure")}
        >
          <span className="label">
            Departure <MdKeyboardArrowDown />
          </span>
          <h3>{formatCardDate(departureDate)}</h3>
          <p>{formatWeekDay(departureDate)}</p>
          {openPanel === "departure" && renderCalendarPopover()}
        </div>

        <div
          className={`field date return-date ${
            !isRoundTrip ? "disabled" : "clickable"
          } ${openPanel === "return" ? "open" : ""}`}
          onClick={(event) => openDatePanel(event, "return")}
        >
          <span className="label">
            Return <MdKeyboardArrowDown />
          </span>
          {isRoundTrip && returnDate ? (
            <>
              <h3>{formatCardDate(returnDate)}</h3>
              <p>{formatWeekDay(returnDate)}</p>
            </>
          ) : (
            <p>Tap to add a return date for bigger discounts</p>
          )}
          {openPanel === "return" && renderCalendarPopover()}
        </div>

        <div
          className={`field travellers clickable ${
            openPanel === "travellers" ? "open" : ""
          }`}
          onClick={openTravellersPanel}
        >
          <span className="label">
            Travellers &amp; Class <MdKeyboardArrowDown />
          </span>
          <h3>{travellersSummary}</h3>
          <p>{travellers.travelClass}</p>

          {openPanel === "travellers" && (
            <div
              className="flight-popover travellers-popover"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="traveller-row">
                <div>
                  <h5>Adults (12+ yrs)</h5>
                  <p>On the day of travel</p>
                </div>
                <div className="stepper">
                  <button
                    type="button"
                    onClick={(event) => updateDraftCount(event, "adults", -1)}
                    disabled={draftTravellers.adults <= 1}
                  >
                    -
                  </button>
                  <span>{draftTravellers.adults}</span>
                  <button
                    type="button"
                    onClick={(event) => updateDraftCount(event, "adults", 1)}
                    disabled={
                      draftTravellers.adults + draftTravellers.children >= 9
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="traveller-row compact">
                <div>
                  <h5>Children (2-12 yrs)</h5>
                  <p>On the day of travel</p>
                </div>
                <div className="stepper">
                  <button
                    type="button"
                    onClick={(event) => updateDraftCount(event, "children", -1)}
                    disabled={draftTravellers.children <= 0}
                  >
                    -
                  </button>
                  <span>{draftTravellers.children}</span>
                  <button
                    type="button"
                    onClick={(event) => updateDraftCount(event, "children", 1)}
                    disabled={
                      draftTravellers.adults + draftTravellers.children >= 9
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="traveller-row compact">
                <div>
                  <h5>Infants (below 2 yrs)</h5>
                  <p>Infants cannot travel alone</p>
                </div>
                <div className="stepper">
                  <button
                    type="button"
                    onClick={(event) => updateDraftCount(event, "infants", -1)}
                    disabled={draftTravellers.infants <= 0}
                  >
                    -
                  </button>
                  <span>{draftTravellers.infants}</span>
                  <button
                    type="button"
                    onClick={(event) => updateDraftCount(event, "infants", 1)}
                    disabled={draftTravellers.infants >= draftTravellers.adults}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="travel-class">
                <h6>Choose Travel Class</h6>
                <div className="class-options">
                  {TRAVEL_CLASSES.map((travelClass) => (
                    <button
                      type="button"
                      key={travelClass}
                      className={
                        draftTravellers.travelClass === travelClass ? "active" : ""
                      }
                      onClick={(event) => {
                        event.stopPropagation();
                        setDraftTravellers((prev) => ({
                          ...prev,
                          travelClass,
                        }));
                      }}
                    >
                      {travelClass}
                    </button>
                  ))}
                </div>
              </div>

              <div className="traveller-footer">
                <span>Maximum 9 travellers (adults + children)</span>
                <button type="button" className="apply-btn" onClick={applyTravellers}>
                  APPLY
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="special-fares">
        <span className="title">SPECIAL FARES</span>
        {SPECIAL_FARES.map((fare) => (
          <button
            key={fare}
            type="button"
            className={activeFare === fare ? "active" : ""}
            onClick={() => setActiveFare(fare)}
          >
            {fare}
          </button>
        ))}
        <button type="button" className="tracker">
          Flight Tracker
        </button>
      </div>

      <button type="button" className="flight-search-btn" onClick={handleSearch}>
        SEARCH
      </button>
    </div>
  );
}
