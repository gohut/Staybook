// TourPkpge2.jsx
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopNavbar from "../../Top_Navbar/TopNavbar";
import HeaderSearch from "./Header_search/HeaderSearch";
import FiltersSidebar2 from "./Filter_sidebar/FiltersSidebar2";
import PackageCard from "./Package_card/PackageCard";
import {
  HOLIDAY_SEARCH_STORAGE_KEY,
  addDays,
  normalizeIsoDate,
  parseInteger,
  readStoredSearch,
  todayIso,
  writeStoredSearch,
} from "../../common/searchState";
import "./TourPkpge2.scss";

const PACKAGES = [
  {
    id: "kerala-1",
    title: "Lakeside Wayanad - Terrace Resorts",
    duration: "2N/3D",
    itinerary: "2N Wayanad",
    destination: "Kerala",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    hotelCategory: "4 Star Hotel",
    meals: "Selected Meals",
    activities: "2 Activities",
    freebies: ["Complimentary Hi-Tea", "Complimentary Trekking"],
    bookOffer: "Book this package @ Rs2,000",
    emi: "Rs1,203/month",
    pricePerPerson: 4660,
    totalPrice: 9320,
  },
  {
    id: "goa-1",
    title: "Goa Beach Escape - Candolim Stay",
    duration: "3N/4D",
    itinerary: "3N Goa",
    destination: "Goa",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    hotelCategory: "4 Star Hotel",
    meals: "Breakfast Included",
    activities: "3 Activities",
    freebies: ["Sunset Cruise", "Airport Pickup"],
    bookOffer: "Book this package @ Rs2,500",
    emi: "Rs1,540/month",
    pricePerPerson: 5980,
    totalPrice: 11960,
  },
  {
    id: "jaipur-1",
    title: "Royal Jaipur Heritage Trail",
    duration: "4N/5D",
    itinerary: "2N Jaipur + 2N Udaipur",
    destination: "Jaipur",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245",
    hotelCategory: "5 Star Hotel",
    meals: "Breakfast + Dinner",
    activities: "4 Activities",
    freebies: ["City Tour", "Cultural Show"],
    bookOffer: "Book this package @ Rs3,000",
    emi: "Rs2,180/month",
    pricePerPerson: 8420,
    totalPrice: 16840,
  },
];

const getInitialSearchValues = (location) => {
  const stored = readStoredSearch(HOLIDAY_SEARCH_STORAGE_KEY) || {};
  const params = new URLSearchParams(location.search);
  const routePayload = location.state?.searchPayload || {};
  const defaultDate = addDays(todayIso(), 14);

  const adults = parseInteger(
    routePayload.adults || params.get("adults") || stored.adults,
    2,
    1,
    10
  );
  const rooms = parseInteger(
    routePayload.rooms || params.get("rooms") || stored.rooms,
    1,
    1,
    4
  );

  return {
    fromCity: routePayload.fromCity || params.get("from") || stored.fromCity || "New Delhi",
    toCity: routePayload.toCity || params.get("to") || stored.toCity || "Goa",
    departureDate: normalizeIsoDate(
      routePayload.departureDate || params.get("date") || stored.departureDate,
      defaultDate
    ),
    adults,
    rooms,
    budget: routePayload.budget || params.get("budget") || stored.budget || "Any Budget",
    guestSummary: `${adults} Adult${adults > 1 ? "s" : ""}, ${rooms} Room${
      rooms > 1 ? "s" : ""
    }`,
  };
};

const parseGuestSummary = (summary) => {
  const adultsMatch = summary.match(/(\d+)\s*adult/i);
  const roomsMatch = summary.match(/(\d+)\s*room/i);

  return {
    adults: parseInteger(adultsMatch?.[1], 2, 1, 10),
    rooms: parseInteger(roomsMatch?.[1], 1, 1, 4),
  };
};

export default function TourPkpge2() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchValues, setSearchValues] = useState(() => getInitialSearchValues(location));

  const filteredPackages = useMemo(() => {
    const destinationQuery = searchValues.toCity.trim().toLowerCase();
    if (!destinationQuery) {
      return PACKAGES;
    }

    return PACKAGES.filter((pkg) =>
      pkg.destination.toLowerCase().includes(destinationQuery)
    );
  }, [searchValues.toCity]);

  const persistAndSyncUrl = (nextValues) => {
    const parsedGuest = parseGuestSummary(nextValues.guestSummary);
    const payload = {
      fromCity: nextValues.fromCity.trim() || "New Delhi",
      toCity: nextValues.toCity.trim() || "Goa",
      departureDate: nextValues.departureDate,
      adults: parsedGuest.adults,
      rooms: parsedGuest.rooms,
      budget: nextValues.budget || "Any Budget",
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
      replace: true,
      state: {
        searchPayload: payload,
      },
    });
  };

  const handleSearchFieldChange = (field, value) => {
    setSearchValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    persistAndSyncUrl(searchValues);
  };

  return (
    <div className="tour-page">
      <TopNavbar />

      <div className="header-search-wrapper">
        <HeaderSearch
          values={searchValues}
          onFieldChange={handleSearchFieldChange}
          onSearch={handleSearch}
        />
      </div>

      <div className="tour-content">
        <FiltersSidebar2 />

        <div className="packages-area">
          <div className="packages-tabs">
            ALL PACKAGES ({filteredPackages.length}) for {searchValues.toCity}
          </div>

          <div className="packages-grid">
            {filteredPackages.length > 0 ? (
              filteredPackages.map((pkg) => <PackageCard key={pkg.id} data={pkg} />)
            ) : (
              <div className="tour-empty-state">
                No packages found for {searchValues.toCity}. Try another destination.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
