// VillasHomestaysSearch.jsx
import React, { useMemo, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  HOMESTAY_SEARCH_STORAGE_KEY,
  addDays,
  normalizeIsoDate,
  parseInteger,
  readStoredSearch,
  todayIso,
  writeStoredSearch,
} from "../../../common/searchState";
import "./VillasHomestaysSearch.scss";

const HOMESTAY_CITY_OPTIONS = [
  "Goa",
  "Mumbai",
  "Delhi",
  "Jaipur",
  "Bengaluru",
  "Pune",
  "Kochi",
  "Udaipur",
];

const HOMESTAY_PRICE_OPTIONS = [
  "Rs0-Rs4000",
  "Rs4000-Rs8000",
  "Rs8000-Rs12000",
  "Rs12000-Rs20000",
  "Rs20000+",
];

export default function VillasHomestaysSearch() {
  const navigate = useNavigate();
  const storedHomestaySearch = useMemo(
    () => readStoredSearch(HOMESTAY_SEARCH_STORAGE_KEY),
    []
  );

  const defaultCheckIn = addDays(todayIso(), 7);
  const defaultCheckOut = addDays(defaultCheckIn, 2);

  const [city, setCity] = useState(storedHomestaySearch?.city || "Goa");
  const [checkInDate, setCheckInDate] = useState(
    normalizeIsoDate(storedHomestaySearch?.checkInDate, defaultCheckIn)
  );
  const [checkOutDate, setCheckOutDate] = useState(
    normalizeIsoDate(storedHomestaySearch?.checkOutDate, defaultCheckOut)
  );
  const [adults, setAdults] = useState(
    parseInteger(storedHomestaySearch?.adults, 2, 1, 10)
  );
  const [children, setChildren] = useState(
    parseInteger(storedHomestaySearch?.children, 0, 0, 8)
  );
  const [priceRange, setPriceRange] = useState(
    storedHomestaySearch?.priceRange || HOMESTAY_PRICE_OPTIONS[0]
  );

  const handleCheckInChange = (event) => {
    const nextCheckIn = event.target.value;
    setCheckInDate(nextCheckIn);

    if (new Date(`${checkOutDate}T00:00:00`) <= new Date(`${nextCheckIn}T00:00:00`)) {
      setCheckOutDate(addDays(nextCheckIn, 1));
    }
  };

  const handleSearch = () => {
    const payload = {
      city: city.trim() || "Goa",
      checkInDate,
      checkOutDate,
      adults,
      children,
      priceRange,
    };

    writeStoredSearch(HOMESTAY_SEARCH_STORAGE_KEY, payload);

    const searchParams = new URLSearchParams({
      city: payload.city,
      checkIn: payload.checkInDate,
      checkOut: payload.checkOutDate,
      adults: String(payload.adults),
      children: String(payload.children),
      price: payload.priceRange,
    });

    navigate(`/hstaypge2?${searchParams.toString()}`, {
      state: {
        searchPayload: payload,
      },
    });
  };

  return (
    <div className="vh-wrapper">
      <p className="vh-subtitle">
        Book your ideal Homestay - Villas, Apartments & more.
      </p>

      <div className="vh-searchbox">
        <div className="vh-field large">
          <label>City, Property Name Or Location</label>
          <input
            className="vh-control vh-city-input"
            list="homestay-city-options"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Search city"
          />
          <datalist id="homestay-city-options">
            {HOMESTAY_CITY_OPTIONS.map((option) => (
              <option key={option} value={option} />
            ))}
          </datalist>
          <span>India</span>
        </div>

        <div className="vh-field">
          <label>
            Check-In <FaChevronDown />
          </label>
          <input
            className="vh-control"
            type="date"
            value={checkInDate}
            onChange={handleCheckInChange}
          />
        </div>

        <div className="vh-field">
          <label>
            Check-Out <FaChevronDown />
          </label>
          <input
            className="vh-control"
            type="date"
            min={addDays(checkInDate, 1)}
            value={checkOutDate}
            onChange={(event) => setCheckOutDate(event.target.value)}
          />
        </div>

        <div className="vh-field">
          <label>
            Guests <FaChevronDown />
          </label>
          <div className="vh-guest-row">
            <select
              className="vh-control"
              value={adults}
              onChange={(event) => setAdults(parseInteger(event.target.value, adults, 1, 10))}
            >
              {Array.from({ length: 10 }).map((_, index) => (
                <option key={`adult-${index + 1}`} value={index + 1}>
                  {index + 1} Adult{index > 0 ? "s" : ""}
                </option>
              ))}
            </select>
            <select
              className="vh-control"
              value={children}
              onChange={(event) =>
                setChildren(parseInteger(event.target.value, children, 0, 8))
              }
            >
              {Array.from({ length: 9 }).map((_, index) => (
                <option key={`child-${index}`} value={index}>
                  {index} Child{index === 1 ? "" : "ren"}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="vh-field">
          <label>
            Price Per Night <FaChevronDown />
          </label>
          <select
            className="vh-control"
            value={priceRange}
            onChange={(event) => setPriceRange(event.target.value)}
          >
            {HOMESTAY_PRICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="homestay-search-btn" onClick={handleSearch}>
        SEARCH
      </button>
    </div>
  );
}
