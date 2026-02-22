import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaPaw } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  HOTEL_SEARCH_STORAGE_KEY,
  parseInteger,
  readStoredSearch,
  writeStoredSearch,
} from "../../../common/searchState";
import "./hotelnav.scss";

const STAY_OPTIONS = [
  { key: "upto_4_rooms", label: "Upto 4 Rooms" },
  { key: "group_deals", label: "Group Deals" },
];

const HOTEL_LOCATIONS = [
  { city: "Goa", country: "India", subtitle: "Beach and sea view stays" },
  { city: "New Delhi", country: "India", subtitle: "Central business hotels" },
  { city: "Mumbai", country: "India", subtitle: "City and luxury hotels" },
  { city: "Jaipur", country: "India", subtitle: "Heritage and palace stays" },
  { city: "Bengaluru", country: "India", subtitle: "Airport and tech district" },
  { city: "Dubai", country: "United Arab Emirates", subtitle: "Downtown skyline hotels" },
  { city: "Singapore", country: "Singapore", subtitle: "Marina and city center" },
  { city: "Kuala Lumpur", country: "Malaysia", subtitle: "Twin tower district hotels" },
  { city: "Tokyo", country: "Japan", subtitle: "Shinjuku and Ginza stays" },
];

const PRICE_OPTIONS = [
  "Rs0-Rs1500",
  "Rs1500-Rs2500",
  "Rs2500-Rs5000",
  "Rs5000+",
];

const TRENDING_SEARCHES = [
  "Singapore, Singapore",
  "Dubai, UAE",
  "Tokyo, Japan",
  "Mumbai, India",
];

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const toStartOfDay = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const toStartOfMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const addDays = (date, days) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return toStartOfDay(next);
};

const addMonths = (date, months) =>
  new Date(date.getFullYear(), date.getMonth() + months, 1);

const isSameDay = (a, b) =>
  a &&
  b &&
  a.getDate() === b.getDate() &&
  a.getMonth() === b.getMonth() &&
  a.getFullYear() === b.getFullYear();

const isBeforeDay = (a, b) =>
  toStartOfDay(a).getTime() < toStartOfDay(b).getTime();

const isAfterDay = (a, b) =>
  toStartOfDay(a).getTime() > toStartOfDay(b).getTime();

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

const formatMonthTitle = (date) =>
  date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

const getFieldDay = (date) => date.getDate();

const getFieldMonth = (date) => {
  const month = date.toLocaleDateString("en-US", { month: "short" }).toLowerCase();
  const year = String(date.getFullYear()).slice(-2);
  return `${month}'${year}`;
};

const getWeekDay = (date) =>
  date.toLocaleDateString("en-US", { weekday: "long" });

export default function HotelNav() {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const storedHotelSearch = readStoredSearch(HOTEL_SEARCH_STORAGE_KEY) || {};
  const today = toStartOfDay(new Date());
  const initialCheckIn = (() => {
    if (storedHotelSearch.checkInDate) {
      const parsed = new Date(`${storedHotelSearch.checkInDate}T00:00:00`);
      if (!Number.isNaN(parsed.getTime()) && !isBeforeDay(parsed, today)) {
        return toStartOfDay(parsed);
      }
    }
    return addDays(today, 7);
  })();
  const initialCheckOut = (() => {
    if (storedHotelSearch.checkOutDate) {
      const parsed = new Date(`${storedHotelSearch.checkOutDate}T00:00:00`);
      if (!Number.isNaN(parsed.getTime()) && isAfterDay(parsed, initialCheckIn)) {
        return toStartOfDay(parsed);
      }
    }
    return addDays(initialCheckIn, 2);
  })();

  const [stayOption, setStayOption] = useState(
    storedHotelSearch?.stayOption || STAY_OPTIONS[0].key
  );
  const [selectedLocation, setSelectedLocation] = useState(() => {
    const storedCity = storedHotelSearch?.city?.trim().toLowerCase();
    if (!storedCity) {
      return HOTEL_LOCATIONS[0];
    }

    const matchedLocation = HOTEL_LOCATIONS.find(
      (location) => location.city.toLowerCase() === storedCity
    );

    if (matchedLocation) {
      return matchedLocation;
    }

    return {
      city: storedHotelSearch.city,
      country: storedHotelSearch.country || "India",
      subtitle: "Popular destination stays",
    };
  });
  const [locationQuery, setLocationQuery] = useState("");
  const [checkInDate, setCheckInDate] = useState(initialCheckIn);
  const [checkOutDate, setCheckOutDate] = useState(initialCheckOut);
  const [calendarBaseMonth, setCalendarBaseMonth] = useState(
    toStartOfMonth(initialCheckIn)
  );
  const [selectedPrice, setSelectedPrice] = useState(
    storedHotelSearch?.priceRange || PRICE_OPTIONS[0]
  );
  const [openPanel, setOpenPanel] = useState(null);
  const initialGuestConfig = (() => {
    const rooms = parseInteger(storedHotelSearch.rooms, 1, 1, 4);
    const adults = Math.max(rooms, parseInteger(storedHotelSearch.adults, 2, 1, 8));
    return {
      rooms,
      adults,
      children: parseInteger(storedHotelSearch.children, 0, 0, 6),
      withPets: Boolean(storedHotelSearch.withPets),
    };
  })();
  const [roomGuestConfig, setRoomGuestConfig] = useState(initialGuestConfig);
  const [draftRoomGuestConfig, setDraftRoomGuestConfig] = useState(
    initialGuestConfig
  );

  const filteredLocations = useMemo(() => {
    const query = locationQuery.trim().toLowerCase();
    return HOTEL_LOCATIONS.filter(
      (location) =>
        !query ||
        location.city.toLowerCase().includes(query) ||
        location.country.toLowerCase().includes(query)
    );
  }, [locationQuery]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenPanel(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenPanel(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const openCalendar = (event, target) => {
    event.stopPropagation();
    setCalendarBaseMonth(
      toStartOfMonth(target === "checkout" ? checkOutDate : checkInDate)
    );
    setOpenPanel(target);
  };

  const selectDate = (event, date) => {
    event.stopPropagation();

    if (!date) {
      return;
    }

    if (openPanel === "checkin") {
      if (isBeforeDay(date, today)) {
        return;
      }

      setCheckInDate(date);
      if (!isAfterDay(checkOutDate, date)) {
        setCheckOutDate(addDays(date, 1));
      }
      setOpenPanel("checkout");
      setCalendarBaseMonth(toStartOfMonth(addDays(date, 1)));
      return;
    }

    if (openPanel === "checkout") {
      if (!isAfterDay(date, checkInDate)) {
        return;
      }
      setCheckOutDate(date);
      setOpenPanel(null);
    }
  };

  const openGuestsPanel = (event) => {
    event.stopPropagation();
    setDraftRoomGuestConfig(roomGuestConfig);
    setOpenPanel("guests");
  };

  const updateDraftConfig = (event, type, delta) => {
    event.stopPropagation();

    setDraftRoomGuestConfig((prev) => {
      const next = { ...prev };

      if (type === "rooms") {
        next.rooms = Math.max(1, Math.min(4, prev.rooms + delta));
        if (next.adults < next.rooms) {
          next.adults = next.rooms;
        }
        return next;
      }

      if (type === "adults") {
        next.adults = Math.max(1, Math.min(8, prev.adults + delta));
        if (next.rooms > next.adults) {
          next.rooms = next.adults;
        }
        return next;
      }

      if (type === "children") {
        next.children = Math.max(0, Math.min(6, prev.children + delta));
        return next;
      }

      return prev;
    });
  };

  const applyRoomGuestConfig = (event) => {
    event.stopPropagation();
    setRoomGuestConfig(draftRoomGuestConfig);
    setOpenPanel(null);
  };

  const handleLocationSelect = (event, location) => {
    event.stopPropagation();
    setSelectedLocation(location);
    setLocationQuery("");
    setOpenPanel(null);
  };

  const handleSearch = () => {
    const checkInDateIso = checkInDate.toISOString().slice(0, 10);
    const checkOutDateIso = checkOutDate.toISOString().slice(0, 10);
    const searchPayload = {
      stayOption,
      city: selectedLocation.city,
      country: selectedLocation.country,
      checkInDate: checkInDateIso,
      checkOutDate: checkOutDateIso,
      rooms: roomGuestConfig.rooms,
      adults: roomGuestConfig.adults,
      children: roomGuestConfig.children,
      withPets: roomGuestConfig.withPets,
      priceRange: selectedPrice,
    };

    writeStoredSearch(HOTEL_SEARCH_STORAGE_KEY, searchPayload);

    const searchParams = new URLSearchParams({
      city: searchPayload.city,
      country: searchPayload.country,
      checkIn: searchPayload.checkInDate,
      checkOut: searchPayload.checkOutDate,
      rooms: String(searchPayload.rooms),
      adults: String(searchPayload.adults),
      children: String(searchPayload.children),
      price: searchPayload.priceRange,
      stayOption: searchPayload.stayOption,
    });

    navigate(`/hotel2?${searchParams.toString()}`, {
      state: {
        stayOption,
        location: selectedLocation,
        checkInDate,
        checkOutDate,
        roomsGuests: roomGuestConfig,
        priceRange: selectedPrice,
        searchPayload,
      },
    });
  };

  const renderLocationPopover = () => (
    <div
      className="hotel-popover hotel-location-popover"
      onClick={(event) => event.stopPropagation()}
    >
      <input
        className="hotel-search-input"
        type="text"
        placeholder="Where do you want to stay?"
        value={locationQuery}
        onChange={(event) => setLocationQuery(event.target.value)}
      />
      <p className="hotel-popover-title">Popular Locations</p>
      <div className="hotel-location-list">
        {filteredLocations.length > 0 ? (
          filteredLocations.slice(0, 8).map((location) => (
            <button
              key={`${location.city}-${location.country}`}
              type="button"
              className="hotel-location-item"
              onClick={(event) => handleLocationSelect(event, location)}
            >
              <h5>{location.city}</h5>
              <p>{location.country}</p>
              <span>{location.subtitle}</span>
            </button>
          ))
        ) : (
          <p className="hotel-empty">No locations found</p>
        )}
      </div>
    </div>
  );

  const renderCalendarPopover = () => {
    const firstMonth = calendarBaseMonth;
    const secondMonth = addMonths(calendarBaseMonth, 1);
    const months = [firstMonth, secondMonth];

    return (
      <div
        className={`hotel-popover hotel-calendar-popover ${
          openPanel === "checkout" ? "hotel-align-right" : ""
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="hotel-calendar-toolbar">
          <button
            type="button"
            className="hotel-cal-nav-btn"
            onClick={(event) => {
              event.stopPropagation();
              setCalendarBaseMonth((prev) => addMonths(prev, -1));
            }}
          >
            &#8249;
          </button>
          <span>
            {openPanel === "checkout"
              ? "Select check-out date"
              : "Select check-in date"}
          </span>
          <button
            type="button"
            className="hotel-cal-nav-btn"
            onClick={(event) => {
              event.stopPropagation();
              setCalendarBaseMonth((prev) => addMonths(prev, 1));
            }}
          >
            &#8250;
          </button>
        </div>

        <div className="hotel-calendar-months">
          {months.map((monthDate) => {
            const cells = buildMonthCells(monthDate);
            return (
              <div
                className="hotel-calendar-month"
                key={`${monthDate.getFullYear()}-${monthDate.getMonth()}`}
              >
                <h5>{formatMonthTitle(monthDate)}</h5>
                <div className="hotel-calendar-week-row">
                  {WEEK_DAYS.map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>

                <div className="hotel-calendar-days-grid">
                  {cells.map((day, index) => {
                    if (!day) {
                      return (
                        <span
                          key={`blank-${index}`}
                          className="hotel-day-cell hotel-day-cell-blank"
                        />
                      );
                    }

                    const disabled =
                      openPanel === "checkout"
                        ? !isAfterDay(day, checkInDate)
                        : isBeforeDay(day, today);
                    const checkInSelected = isSameDay(day, checkInDate);
                    const checkOutSelected = isSameDay(day, checkOutDate);
                    const inRange =
                      isAfterDay(day, checkInDate) &&
                      isBeforeDay(day, checkOutDate);

                    return (
                      <button
                        type="button"
                        key={day.toISOString()}
                        className={`hotel-day-cell ${
                          checkInSelected || checkOutSelected ? "selected" : ""
                        } ${inRange ? "in-range" : ""}`}
                        disabled={disabled}
                        onClick={(event) => selectDate(event, day)}
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

  const renderGuestsPopover = () => (
    <div
      className="hotel-popover hotel-guests-popover"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="guest-row">
        <div>
          <h5>Room</h5>
        </div>
        <div className="hotel-stepper">
          <button
            type="button"
            onClick={(event) => updateDraftConfig(event, "rooms", -1)}
            disabled={draftRoomGuestConfig.rooms <= 1}
          >
            -
          </button>
          <span>{draftRoomGuestConfig.rooms}</span>
          <button
            type="button"
            onClick={(event) => updateDraftConfig(event, "rooms", 1)}
            disabled={draftRoomGuestConfig.rooms >= 4}
          >
            +
          </button>
        </div>
      </div>

      <div className="guest-row">
        <div>
          <h5>Adults</h5>
        </div>
        <div className="hotel-stepper">
          <button
            type="button"
            onClick={(event) => updateDraftConfig(event, "adults", -1)}
            disabled={draftRoomGuestConfig.adults <= 1}
          >
            -
          </button>
          <span>{draftRoomGuestConfig.adults}</span>
          <button
            type="button"
            onClick={(event) => updateDraftConfig(event, "adults", 1)}
            disabled={draftRoomGuestConfig.adults >= 8}
          >
            +
          </button>
        </div>
      </div>

      <div className="guest-row">
        <div>
          <h5>Children</h5>
          <p>0-17 years old</p>
        </div>
        <div className="hotel-stepper">
          <button
            type="button"
            onClick={(event) => updateDraftConfig(event, "children", -1)}
            disabled={draftRoomGuestConfig.children <= 0}
          >
            -
          </button>
          <span>{draftRoomGuestConfig.children}</span>
          <button
            type="button"
            onClick={(event) => updateDraftConfig(event, "children", 1)}
            disabled={draftRoomGuestConfig.children >= 6}
          >
            +
          </button>
        </div>
      </div>

      <p className="guest-note">
        Please provide the right number of guests for better stay options.
      </p>

      <button
        type="button"
        className={`pet-row ${
          draftRoomGuestConfig.withPets ? "pet-row-active" : ""
        }`}
        onClick={(event) => {
          event.stopPropagation();
          setDraftRoomGuestConfig((prev) => ({
            ...prev,
            withPets: !prev.withPets,
          }));
        }}
      >
        <div>
          <h6>Are you travelling with pets?</h6>
          <p>We will only show pet-friendly properties.</p>
        </div>
        <FaPaw />
      </button>

      <div className="guest-footer">
        <button type="button" className="hotel-apply-btn" onClick={applyRoomGuestConfig}>
          APPLY
        </button>
      </div>
    </div>
  );

  const renderPricePopover = () => (
    <div
      className="hotel-popover hotel-price-popover"
      onClick={(event) => event.stopPropagation()}
    >
      {PRICE_OPTIONS.map((priceOption) => (
        <button
          key={priceOption}
          type="button"
          className={selectedPrice === priceOption ? "active" : ""}
          onClick={(event) => {
            event.stopPropagation();
            setSelectedPrice(priceOption);
            setOpenPanel(null);
          }}
        >
          {priceOption}
        </button>
      ))}
    </div>
  );

  return (
    <div className="hotel-nav-wrapper" ref={wrapperRef}>
      <div className="hotel-top-row">
        {STAY_OPTIONS.map((option) => (
          <label key={option.key}>
            <input
              type="radio"
              name="stayOption"
              checked={stayOption === option.key}
              onChange={() => setStayOption(option.key)}
            />
            {option.label}
          </label>
        ))}
        <span className="hotel-top-right">
          Book Domestic and International Property Online, to list your property
          <button type="button">Click Here</button>
        </span>
      </div>

      <div className="hotel-search-grid">
        <div
          className={`hotel-field location clickable ${
            openPanel === "location" ? "open" : ""
          }`}
          onClick={() => setOpenPanel("location")}
        >
          <span className="field-label">City, Property Name or Location</span>
          <h3>{selectedLocation.city}</h3>
          <p>{selectedLocation.country}</p>
          {openPanel === "location" && renderLocationPopover()}
        </div>

        <div
          className={`hotel-field date clickable ${openPanel === "checkin" ? "open" : ""}`}
          onClick={(event) => openCalendar(event, "checkin")}
        >
          <span className="field-label">
            Check-In <MdKeyboardArrowDown />
          </span>
          <div className="date-value">
            <strong>{getFieldDay(checkInDate)}</strong>
            <span>{getFieldMonth(checkInDate)}</span>
          </div>
          <p>{getWeekDay(checkInDate)}</p>
          {openPanel === "checkin" && renderCalendarPopover()}
        </div>

        <div
          className={`hotel-field date clickable ${
            openPanel === "checkout" ? "open" : ""
          }`}
          onClick={(event) => openCalendar(event, "checkout")}
        >
          <span className="field-label">
            Check-Out <MdKeyboardArrowDown />
          </span>
          <div className="date-value">
            <strong>{getFieldDay(checkOutDate)}</strong>
            <span>{getFieldMonth(checkOutDate)}</span>
          </div>
          <p>{getWeekDay(checkOutDate)}</p>
          {openPanel === "checkout" && renderCalendarPopover()}
        </div>

        <div
          className={`hotel-field rooms clickable ${openPanel === "guests" ? "open" : ""}`}
          onClick={openGuestsPanel}
        >
          <span className="field-label">
            Rooms & Guests <MdKeyboardArrowDown />
          </span>
          <h3>{roomGuestConfig.rooms}</h3>
          <p>
            {roomGuestConfig.rooms} Room{roomGuestConfig.rooms > 1 ? "s" : ""},{" "}
            {roomGuestConfig.adults} Adult{roomGuestConfig.adults > 1 ? "s" : ""}
            {roomGuestConfig.children > 0
              ? `, ${roomGuestConfig.children} ${
                  roomGuestConfig.children > 1 ? "Children" : "Child"
                }`
              : ""}
          </p>
          {openPanel === "guests" && renderGuestsPopover()}
        </div>

        <div
          className={`hotel-field price clickable ${openPanel === "price" ? "open" : ""}`}
          onClick={() => setOpenPanel("price")}
        >
          <span className="field-label">
            Price Per Night <MdKeyboardArrowDown />
          </span>
          <h4>{selectedPrice}</h4>
          <p>Rs1500-Rs2500, Rs2500-Rs5000...</p>
          {openPanel === "price" && renderPricePopover()}
        </div>
      </div>

      <div className="hotel-trending-row">
        <span>Trending Searches:</span>
        {TRENDING_SEARCHES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              const matchedLocation = HOTEL_LOCATIONS.find((location) =>
                item.toLowerCase().includes(location.city.toLowerCase())
              );
              if (matchedLocation) {
                setSelectedLocation(matchedLocation);
              }
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <button type="button" className="hotel-search-btn" onClick={handleSearch}>
        SEARCH
      </button>
    </div>
  );
}
