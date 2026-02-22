// HolidayNavbar.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HOLIDAY_SEARCH_STORAGE_KEY,
  addDays,
  normalizeIsoDate,
  parseInteger,
  readStoredSearch,
  todayIso,
  writeStoredSearch,
} from "../../../common/searchState";
import "./HolidayNavbar.scss";

const tabs = [
  "Search",
  "Honeymoon",
  "Visa Free Packages",
  "Group Tour Packages",
  "Last Minute Deals",
];

const CITY_OPTIONS = [
  "New Delhi",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Goa",
  "Kerala",
  "Jaipur",
  "Thailand",
  "Bali",
];

const BUDGET_OPTIONS = [
  "Any Budget",
  "Below Rs 15000",
  "Rs 15000 - Rs 30000",
  "Rs 30000 - Rs 60000",
  "Above Rs 60000",
];

export default function HolidayNavbar() {
  const navigate = useNavigate();
  const storedHolidaySearch = useMemo(
    () => readStoredSearch(HOLIDAY_SEARCH_STORAGE_KEY),
    []
  );

  const defaultDate = addDays(todayIso(), 14);
  const [activeTab, setActiveTab] = useState("Search");
  const [fromCity, setFromCity] = useState(storedHolidaySearch?.fromCity || "New Delhi");
  const [toCity, setToCity] = useState(storedHolidaySearch?.toCity || "Goa");
  const [departureDate, setDepartureDate] = useState(
    normalizeIsoDate(storedHolidaySearch?.departureDate, defaultDate)
  );
  const [adults, setAdults] = useState(
    parseInteger(storedHolidaySearch?.adults, 2, 1, 10)
  );
  const [rooms, setRooms] = useState(
    parseInteger(storedHolidaySearch?.rooms, 1, 1, 4)
  );
  const [budget, setBudget] = useState(
    storedHolidaySearch?.budget || BUDGET_OPTIONS[0]
  );

  const handleSearch = () => {
    const payload = {
      fromCity: fromCity.trim() || "New Delhi",
      toCity: toCity.trim() || "Goa",
      departureDate,
      adults,
      rooms,
      budget,
    };

    writeStoredSearch(HOLIDAY_SEARCH_STORAGE_KEY, payload);

    const searchParams = new URLSearchParams({
      from: payload.fromCity,
      to: payload.toCity,
      date: payload.departureDate,
      adults: String(payload.adults),
      rooms: String(payload.rooms),
      budget: payload.budget,
    });

    navigate(`/tourpkge2?${searchParams.toString()}`, {
      state: {
        searchPayload: payload,
      },
    });
  };

  return (
    <div className="holiday-wrapper">
      <div className="holiday-tab-nav">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`holiday-tab-item ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="holiday-tab-content">
        {activeTab === "Search" && (
          <div className="holiday-search-box">
            <div className="holiday-field">
              <span>From City</span>
              <input
                className="holiday-control"
                list="holiday-from-city-options"
                value={fromCity}
                onChange={(event) => setFromCity(event.target.value)}
                placeholder="Starting city"
              />
            </div>

            <div className="holiday-field">
              <span>To City</span>
              <input
                className="holiday-control"
                list="holiday-to-city-options"
                value={toCity}
                onChange={(event) => setToCity(event.target.value)}
                placeholder="Destination"
              />
            </div>

            <div className="holiday-field">
              <span>Departure</span>
              <input
                className="holiday-control"
                type="date"
                value={departureDate}
                min={todayIso()}
                onChange={(event) => setDepartureDate(event.target.value)}
              />
            </div>

            <div className="holiday-field">
              <span>Guests</span>
              <div className="holiday-guest-row">
                <select
                  className="holiday-control"
                  value={adults}
                  onChange={(event) =>
                    setAdults(parseInteger(event.target.value, adults, 1, 10))
                  }
                >
                  {Array.from({ length: 10 }).map((_, index) => (
                    <option key={`holiday-adult-${index + 1}`} value={index + 1}>
                      {index + 1} Adult{index > 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
                <select
                  className="holiday-control"
                  value={rooms}
                  onChange={(event) =>
                    setRooms(parseInteger(event.target.value, rooms, 1, 4))
                  }
                >
                  {Array.from({ length: 4 }).map((_, index) => (
                    <option key={`holiday-room-${index + 1}`} value={index + 1}>
                      {index + 1} Room{index > 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="holiday-field">
              <span>Budget</span>
              <select
                className="holiday-control"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
              >
                {BUDGET_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <datalist id="holiday-from-city-options">
              {CITY_OPTIONS.map((city) => (
                <option key={`from-${city}`} value={city} />
              ))}
            </datalist>
            <datalist id="holiday-to-city-options">
              {CITY_OPTIONS.map((city) => (
                <option key={`to-${city}`} value={city} />
              ))}
            </datalist>
          </div>
        )}

        {activeTab === "Honeymoon" && (
          <div className="holiday-dropdown">
            <div className="holiday-dropdown-left">
              <h4>MakeMyTrip Honeymoon Packages</h4>
              <ul>
                <li>Maldives</li>
                <li>Bali</li>
                <li>Thailand</li>
                <li>Goa</li>
                <li>Kerala</li>
              </ul>
            </div>
            <div className="holiday-dropdown-right">
              <div className="holiday-card">Trending</div>
              <div className="holiday-card">Bucket List</div>
              <div className="holiday-card">Trip Finder</div>
              <div className="holiday-card">View All</div>
            </div>
          </div>
        )}

        {activeTab === "Visa Free Packages" && (
          <div className="holiday-dropdown">
            <div className="holiday-dropdown-left">
              <h4>Dream Destinations</h4>
              <ul>
                <li>Malaysia</li>
                <li>Hong Kong</li>
                <li>Bhutan</li>
                <li>Mauritius</li>
                <li>Seychelles</li>
              </ul>
            </div>
            <div className="holiday-dropdown-right">
              <div className="holiday-card">Maldives</div>
              <div className="holiday-card">Thailand</div>
              <div className="holiday-card">Sri Lanka</div>
            </div>
          </div>
        )}

        {activeTab === "Group Tour Packages" && (
          <div className="holiday-dropdown">
            <div className="holiday-dropdown-left">
              <h4>Expertly Planned Tours</h4>
              <ul>
                <li>Europe</li>
                <li>Japan</li>
                <li>Australia</li>
                <li>South Africa</li>
                <li>Singapore</li>
              </ul>
            </div>
            <div className="holiday-dropdown-right">
              <div className="holiday-card">Domestic</div>
              <div className="holiday-card">Quick Fly</div>
              <div className="holiday-card">Bucket List</div>
              <div className="holiday-card">View All</div>
            </div>
          </div>
        )}

        {activeTab === "Last Minute Deals" && (
          <div className="holiday-dropdown">
            <div className="holiday-dropdown-left">
              <h4>Best Trips, Last Minute</h4>
              <ul>
                <li>Goa</li>
                <li>Kerala</li>
                <li>Rajasthan</li>
                <li>Andaman</li>
                <li>North East</li>
              </ul>
            </div>
            <div className="holiday-dropdown-right">
              <div className="holiday-card">Jet Set Easy</div>
              <div className="holiday-card">Mini Moon</div>
              <div className="holiday-card">Staycations</div>
              <div className="holiday-card">View All</div>
            </div>
          </div>
        )}
      </div>

      <button className="holiday-search-btn" onClick={handleSearch}>
        SEARCH
      </button>
    </div>
  );
}
