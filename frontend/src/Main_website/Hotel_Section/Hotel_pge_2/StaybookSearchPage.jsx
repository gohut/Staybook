import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopNavbar from "../../Top_Navbar/TopNavbar";
import SearchBar from "./Search_Bar/SearchBar";
import ListingsHeader from "./Listing_header/ListingsHeader";
import PropertyCard from "./Property_Cards/PropertyCard";
import FiltersSidebar from "./Side_Barfilter/FiltersSidebar";
import { HOTEL_PRICE_OPTIONS } from "./Side_Barfilter/filterOptions";
import {
  HOTEL_SEARCH_STORAGE_KEY,
  addDays,
  buildMapEmbedUrl,
  normalizeIsoDate,
  parseInteger,
  readStoredSearch,
  writeStoredSearch,
  todayIso,
} from "../../common/searchState";
import "./StaybookSrh.scss";

const DEFAULT_CITY = "Goa";

const HOTEL_PROPERTIES = [
  {
    id: "goa-1",
    city: "Goa",
    locality: "Calangute",
    name: "Summit Calangute Resort & Spa",
    starRating: 4,
    location: "Calangute | 2.2 km drive to Calangute Beach",
    badge: "Couple Friendly",
    offer: "15% off on spa session",
    highlights: [
      "Calm location near beaches",
      "Exceptional food quality",
      "Spacious rooms with ambiance",
    ],
    reviewLabel: "Very Good",
    reviewScore: 3.9,
    totalRatings: 520,
    originalPrice: 3933,
    discountedPrice: 3146,
    taxes: 157,
    ctaText: "Login to Book Now & Pay Later!",
    propertyType: "Resort",
    suggested: {
      rushDeal: true,
      lastMinuteDeals: false,
      freeCancellation: true,
      coupleFriendly: true,
    },
    images: {
      main: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      thumbs: [
        "https://images.unsplash.com/photo-1501117716987-c8e1ecb210c7",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      ],
    },
  },
  {
    id: "goa-2",
    city: "Goa",
    locality: "Candolim",
    name: "Sea Crest Candolim Suites",
    starRating: 5,
    location: "Candolim | 1.1 km drive to Candolim Beach",
    badge: "Luxury Pick",
    offer: "Complimentary breakfast",
    highlights: [
      "Infinity pool and ocean views",
      "Premium suite categories",
      "In-house seafood restaurant",
    ],
    reviewLabel: "Excellent",
    reviewScore: 4.5,
    totalRatings: 683,
    originalPrice: 9800,
    discountedPrice: 8450,
    taxes: 560,
    ctaText: "Free cancellation till check-in",
    propertyType: "Hotel",
    suggested: {
      rushDeal: false,
      lastMinuteDeals: true,
      freeCancellation: true,
      coupleFriendly: true,
    },
    images: {
      main: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c",
      thumbs: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9",
      ],
    },
  },
  {
    id: "goa-3",
    city: "Goa",
    locality: "Baga",
    name: "Baga Palm Residency",
    starRating: 3,
    location: "Baga | 0.8 km walk to Baga Beach",
    badge: "Budget Friendly",
    offer: "Flat 10% weekend discount",
    highlights: [
      "Close to nightlife hubs",
      "Airport shuttle available",
      "Family-friendly rooms",
    ],
    reviewLabel: "Good",
    reviewScore: 3.4,
    totalRatings: 310,
    originalPrice: 3300,
    discountedPrice: 2599,
    taxes: 122,
    ctaText: "Login & unlock member rates",
    propertyType: "Hotel",
    suggested: {
      rushDeal: true,
      lastMinuteDeals: true,
      freeCancellation: false,
      coupleFriendly: true,
    },
    images: {
      main: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1",
      thumbs: [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427",
        "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa",
      ],
    },
  },
  {
    id: "goa-4",
    city: "Goa",
    locality: "Panjim",
    name: "Panjim Bayview Hotel",
    starRating: 4,
    location: "Panjim | 3.0 km drive to Miramar Beach",
    badge: "Business Stay",
    offer: "Airport transfer at Rs 499",
    highlights: [
      "Riverside rooms",
      "Conference hall",
      "Early check-in on request",
    ],
    reviewLabel: "Very Good",
    reviewScore: 4.1,
    totalRatings: 442,
    originalPrice: 6200,
    discountedPrice: 4990,
    taxes: 320,
    ctaText: "Book now and pay at hotel",
    propertyType: "Hotel",
    suggested: {
      rushDeal: false,
      lastMinuteDeals: false,
      freeCancellation: true,
      coupleFriendly: false,
    },
    images: {
      main: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      thumbs: [
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
      ],
    },
  },
  {
    id: "goa-5",
    city: "Goa",
    locality: "Anjuna",
    name: "Anjuna Cliff Villas",
    starRating: 4,
    location: "Anjuna | 1.6 km drive to Anjuna Beach",
    badge: "Villa Collection",
    offer: "20% off for 2+ nights",
    highlights: [
      "Private plunge pool",
      "Sunset deck access",
      "Kitchenette in all villas",
    ],
    reviewLabel: "Excellent",
    reviewScore: 4.4,
    totalRatings: 278,
    originalPrice: 12400,
    discountedPrice: 10800,
    taxes: 690,
    ctaText: "Limited period villa offer",
    propertyType: "Villa",
    suggested: {
      rushDeal: false,
      lastMinuteDeals: false,
      freeCancellation: false,
      coupleFriendly: true,
    },
    images: {
      main: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
      thumbs: [
        "https://images.unsplash.com/photo-1484154218962-a197022b5858",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
      ],
    },
  },
  {
    id: "mumbai-1",
    city: "Mumbai",
    locality: "Khar",
    name: "Harborline Suites Khar",
    starRating: 4,
    location: "Khar | 2.7 km drive to Juhu Beach",
    badge: "City Stay",
    offer: "Early bird deal 18% off",
    highlights: [
      "Metro connectivity",
      "Rooftop dining",
      "Co-working lounge",
    ],
    reviewLabel: "Excellent",
    reviewScore: 4.3,
    totalRatings: 390,
    originalPrice: 7800,
    discountedPrice: 6390,
    taxes: 411,
    ctaText: "Book with free breakfast",
    propertyType: "Apartment",
    suggested: {
      rushDeal: true,
      lastMinuteDeals: false,
      freeCancellation: true,
      coupleFriendly: true,
    },
    images: {
      main: "https://images.unsplash.com/photo-1559599101-f09722fb4948",
      thumbs: [
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f",
      ],
    },
  },
  {
    id: "delhi-1",
    city: "New Delhi",
    locality: "Connaught Place",
    name: "Imperial Connaught Hotel",
    starRating: 5,
    location: "Connaught Place | 0.6 km to Metro Station",
    badge: "Premium Central Stay",
    offer: "Free airport pickup",
    highlights: [
      "Prime CBD location",
      "Panoramic skyline view",
      "Luxury concierge services",
    ],
    reviewLabel: "Excellent",
    reviewScore: 4.7,
    totalRatings: 850,
    originalPrice: 14500,
    discountedPrice: 12900,
    taxes: 890,
    ctaText: "Limited luxury rates",
    propertyType: "Hotel",
    suggested: {
      rushDeal: false,
      lastMinuteDeals: true,
      freeCancellation: true,
      coupleFriendly: true,
    },
    images: {
      main: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      thumbs: [
        "https://images.unsplash.com/photo-1578775887804-699de7086ff9",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      ],
    },
  },
  {
    id: "blr-1",
    city: "Bengaluru",
    locality: "Whitefield",
    name: "Whitefield Urban Resort",
    starRating: 4,
    location: "Whitefield | 4.0 km from ITPL",
    badge: "Corporate Favourite",
    offer: "Stay 3 nights pay for 2.5",
    highlights: [
      "Large outdoor pool",
      "Business lounge",
      "Complimentary evening tea",
    ],
    reviewLabel: "Very Good",
    reviewScore: 4.0,
    totalRatings: 265,
    originalPrice: 6900,
    discountedPrice: 5600,
    taxes: 295,
    ctaText: "Corporate special rates available",
    propertyType: "Resort",
    suggested: {
      rushDeal: false,
      lastMinuteDeals: true,
      freeCancellation: false,
      coupleFriendly: false,
    },
    images: {
      main: "https://images.unsplash.com/photo-1505692952047-1a78307da8f2",
      thumbs: [
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
        "https://images.unsplash.com/photo-1494526585095-c41746248156",
      ],
    },
  },
];

const createDefaultFilters = () => ({
  searchText: "",
  suggested: {
    rushDeal: false,
    lastMinuteDeals: false,
    freeCancellation: false,
    coupleFriendly: false,
  },
  selectedPriceRanges: [],
  minBudget: "",
  maxBudget: "",
  appliedMinBudget: "",
  appliedMaxBudget: "",
  selectedStars: [],
  selectedRatings: [],
  selectedPropertyTypes: [],
  selectedLocations: [],
});

const parseGuestSummary = (summary) => {
  const roomMatch = summary.match(/(\d+)\s*room/i);
  const adultMatch = summary.match(/(\d+)\s*adult/i);
  const childMatch = summary.match(/(\d+)\s*child/i);

  const rooms = parseInteger(roomMatch?.[1], 1, 1, 8);
  const adults = parseInteger(adultMatch?.[1], 2, 1, 12);
  const children = parseInteger(childMatch?.[1], 0, 0, 8);

  return { rooms, adults, children };
};

const formatGuestSummary = ({ rooms, adults, children }) => {
  if (children > 0) {
    return `${rooms} Room${rooms > 1 ? "s" : ""}, ${adults} Adults, ${children} Child${
      children > 1 ? "ren" : ""
    }`;
  }
  return `${rooms} Room${rooms > 1 ? "s" : ""}, ${adults} Adults`;
};

const ensureCheckoutDate = (checkInDate, checkOutDate) => {
  if (new Date(`${checkOutDate}T00:00:00`) > new Date(`${checkInDate}T00:00:00`)) {
    return checkOutDate;
  }
  return addDays(checkInDate, 1);
};

const getInitialSearchValues = (location) => {
  const stored = readStoredSearch(HOTEL_SEARCH_STORAGE_KEY) || {};
  const params = new URLSearchParams(location.search);
  const routeState = location.state || {};
  const routePayload = routeState.searchPayload || {};

  const routeCheckIn =
    routePayload.checkInDate ||
    (routeState.checkInDate instanceof Date
      ? routeState.checkInDate.toISOString().slice(0, 10)
      : routeState.checkInDate);
  const routeCheckOut =
    routePayload.checkOutDate ||
    (routeState.checkOutDate instanceof Date
      ? routeState.checkOutDate.toISOString().slice(0, 10)
      : routeState.checkOutDate);

  const defaultCheckIn = addDays(todayIso(), 7);
  const defaultCheckOut = addDays(defaultCheckIn, 2);

  const checkInDate = normalizeIsoDate(
    routeCheckIn || params.get("checkIn") || stored.checkInDate,
    defaultCheckIn
  );
  const checkOutDate = ensureCheckoutDate(
    checkInDate,
    normalizeIsoDate(
      routeCheckOut || params.get("checkOut") || stored.checkOutDate,
      defaultCheckOut
    )
  );

  const roomsGuests = routeState.roomsGuests || {};
  const rooms = parseInteger(
    routePayload.rooms || params.get("rooms") || roomsGuests.rooms || stored.rooms,
    1,
    1,
    8
  );
  const adults = parseInteger(
    routePayload.adults || params.get("adults") || roomsGuests.adults || stored.adults,
    2,
    1,
    12
  );
  const children = parseInteger(
    routePayload.children ||
      params.get("children") ||
      roomsGuests.children ||
      stored.children,
    0,
    0,
    8
  );

  return {
    city:
      routePayload.city ||
      routeState.location?.city ||
      params.get("city") ||
      stored.city ||
      DEFAULT_CITY,
    country:
      routePayload.country ||
      routeState.location?.country ||
      params.get("country") ||
      stored.country ||
      "India",
    checkInDate,
    checkOutDate,
    guestSummary: formatGuestSummary({ rooms, adults, children }),
    priceRange:
      routePayload.priceRange || params.get("price") || stored.priceRange || "Rs0-Rs1500",
  };
};

const toggleInArray = (items, value) =>
  items.includes(value) ? items.filter((item) => item !== value) : [...items, value];

const matchesAnyPriceRange = (price, selectedPriceRanges) => {
  if (!selectedPriceRanges.length) {
    return true;
  }

  return selectedPriceRanges.some((rangeKey) => {
    const range = HOTEL_PRICE_OPTIONS.find((item) => item.key === rangeKey);
    if (!range) {
      return false;
    }
    return price >= range.min && price <= range.max;
  });
};

const computeMapQuery = ({ city, visibleProperties, selectedLocations, priceHint }) => {
  const scopedCity = city || DEFAULT_CITY;
  const locationChunk =
    selectedLocations.length > 0
      ? selectedLocations.join(", ")
      : [
          ...new Set(visibleProperties.slice(0, 4).map((property) => property.locality)),
        ].join(", ");
  const priceChunk = priceHint ? ` ${priceHint}` : "";

  return `Hotels in ${scopedCity} ${locationChunk}${priceChunk}`.trim();
};

const StaybookSearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchValues, setSearchValues] = useState(() => getInitialSearchValues(location));
  const [filters, setFilters] = useState(createDefaultFilters);
  const [activeSort, setActiveSort] = useState("popularity");
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [manualMapQuery, setManualMapQuery] = useState("");

  useEffect(() => {
    if (!isMapOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMapOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMapOpen]);

  const filteredProperties = useMemo(() => {
    const cityQuery = searchValues.city.trim().toLowerCase();
    const selectedSuggestedKeys = Object.entries(filters.suggested)
      .filter(([, value]) => value)
      .map(([key]) => key);
    const minBudget = parseInteger(filters.appliedMinBudget, 0, 0, 1000000);
    const maxBudget =
      filters.appliedMaxBudget === ""
        ? Number.POSITIVE_INFINITY
        : parseInteger(filters.appliedMaxBudget, Number.POSITIVE_INFINITY, 0, 1000000);

    const base = HOTEL_PROPERTIES.filter((property) => {
      const matchesCity =
        !cityQuery ||
        property.city.toLowerCase().includes(cityQuery) ||
        property.locality.toLowerCase().includes(cityQuery);
      const matchesSearchText =
        !filters.searchText.trim() ||
        `${property.name} ${property.locality} ${property.city}`
          .toLowerCase()
          .includes(filters.searchText.toLowerCase());
      const matchesSuggested = selectedSuggestedKeys.every(
        (key) => property.suggested[key]
      );
      const matchesPriceRange = matchesAnyPriceRange(
        property.discountedPrice,
        filters.selectedPriceRanges
      );
      const matchesBudget =
        property.discountedPrice >= minBudget && property.discountedPrice <= maxBudget;
      const matchesStars =
        filters.selectedStars.length === 0 ||
        filters.selectedStars.includes(Math.floor(property.starRating));
      const matchesRating =
        filters.selectedRatings.length === 0 ||
        filters.selectedRatings.some((rating) => property.reviewScore >= rating);
      const matchesType =
        filters.selectedPropertyTypes.length === 0 ||
        filters.selectedPropertyTypes.includes(property.propertyType);
      const matchesLocation =
        filters.selectedLocations.length === 0 ||
        filters.selectedLocations.some((locationName) =>
          property.locality.toLowerCase().includes(locationName.toLowerCase())
        );

      return (
        matchesCity &&
        matchesSearchText &&
        matchesSuggested &&
        matchesPriceRange &&
        matchesBudget &&
        matchesStars &&
        matchesRating &&
        matchesType &&
        matchesLocation
      );
    });

    const sorted = [...base];
    if (activeSort === "price_low_high") {
      sorted.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (activeSort === "price_high_low") {
      sorted.sort((a, b) => b.discountedPrice - a.discountedPrice);
    } else if (activeSort === "rating_high") {
      sorted.sort((a, b) => b.reviewScore - a.reviewScore);
    } else if (activeSort === "best_value") {
      sorted.sort(
        (a, b) =>
          b.reviewScore / b.discountedPrice - a.reviewScore / a.discountedPrice
      );
    } else {
      sorted.sort((a, b) => b.totalRatings - a.totalRatings);
    }

    return sorted;
  }, [activeSort, filters, searchValues.city]);

  const generatedMapQuery = useMemo(() => {
    const priceHint =
      filters.appliedMinBudget || filters.appliedMaxBudget
        ? `budget Rs${filters.appliedMinBudget || 0}-Rs${
            filters.appliedMaxBudget || "any"
          }`
        : "";

    return computeMapQuery({
      city: searchValues.city.trim(),
      visibleProperties: filteredProperties,
      selectedLocations: filters.selectedLocations,
      priceHint,
    });
  }, [
    filters.appliedMaxBudget,
    filters.appliedMinBudget,
    filters.selectedLocations,
    filteredProperties,
    searchValues.city,
  ]);

  const mapQuery = manualMapQuery || generatedMapQuery;
  const mapEmbedUrl = buildMapEmbedUrl(mapQuery);

  const persistSearchState = (nextSearchValues) => {
    const { rooms, adults, children } = parseGuestSummary(nextSearchValues.guestSummary);
    const payload = {
      city: nextSearchValues.city.trim() || DEFAULT_CITY,
      country: nextSearchValues.country || "India",
      checkInDate: nextSearchValues.checkInDate,
      checkOutDate: ensureCheckoutDate(
        nextSearchValues.checkInDate,
        nextSearchValues.checkOutDate
      ),
      rooms,
      adults,
      children,
      priceRange: nextSearchValues.priceRange,
      stayOption: "upto_4_rooms",
    };

    writeStoredSearch(HOTEL_SEARCH_STORAGE_KEY, payload);

    const searchParams = new URLSearchParams({
      city: payload.city,
      country: payload.country,
      checkIn: payload.checkInDate,
      checkOut: payload.checkOutDate,
      rooms: String(payload.rooms),
      adults: String(payload.adults),
      children: String(payload.children),
      price: payload.priceRange,
    });

    navigate(`/hotel2?${searchParams.toString()}`, {
      replace: true,
      state: {
        searchPayload: payload,
      },
    });
  };

  const handleSearchFieldChange = (field, value) => {
    setSearchValues((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "checkInDate") {
        next.checkOutDate = ensureCheckoutDate(value, prev.checkOutDate);
      }
      return next;
    });
  };

  const handleSearchSubmit = () => {
    const parsedGuests = parseGuestSummary(searchValues.guestSummary);
    const normalized = {
      ...searchValues,
      city: searchValues.city.trim() || DEFAULT_CITY,
      checkOutDate: ensureCheckoutDate(searchValues.checkInDate, searchValues.checkOutDate),
      guestSummary: formatGuestSummary(parsedGuests),
    };

    setSearchValues(normalized);
    persistSearchState(normalized);
    setManualMapQuery("");
  };

  const sidebarProps = {
    mapEmbedUrl,
    filters,
    onSearchTextChange: (value) =>
      setFilters((prev) => ({ ...prev, searchText: value })),
    onToggleSuggested: (key) =>
      setFilters((prev) => ({
        ...prev,
        suggested: { ...prev.suggested, [key]: !prev.suggested[key] },
      })),
    onTogglePriceRange: (rangeKey) =>
      setFilters((prev) => ({
        ...prev,
        selectedPriceRanges: toggleInArray(prev.selectedPriceRanges, rangeKey),
      })),
    onToggleStar: (starValue) =>
      setFilters((prev) => ({
        ...prev,
        selectedStars: toggleInArray(prev.selectedStars, starValue),
      })),
    onToggleRating: (ratingMin) =>
      setFilters((prev) => ({
        ...prev,
        selectedRatings: toggleInArray(prev.selectedRatings, ratingMin),
      })),
    onTogglePropertyType: (propertyType) =>
      setFilters((prev) => ({
        ...prev,
        selectedPropertyTypes: toggleInArray(prev.selectedPropertyTypes, propertyType),
      })),
    onToggleLocation: (locationName) =>
      setFilters((prev) => ({
        ...prev,
        selectedLocations: toggleInArray(prev.selectedLocations, locationName),
      })),
    onBudgetChange: (field, value) =>
      setFilters((prev) => ({ ...prev, [field]: value.replace(/[^0-9]/g, "") })),
    onApplyBudget: () =>
      setFilters((prev) => ({
        ...prev,
        appliedMinBudget: prev.minBudget,
        appliedMaxBudget: prev.maxBudget,
      })),
    onClearFilters: () => setFilters(createDefaultFilters()),
  };

  return (
    <div className="staybook-layout">
      <TopNavbar />
      <SearchBar
        values={searchValues}
        onFieldChange={handleSearchFieldChange}
        onSearch={handleSearchSubmit}
      />

      <div
        style={{
          display: "flex",
          marginLeft: "120px",
          width: "fit-content",
          gap: "20px",
          padding: "20px 40px",
        }}
      >
        <FiltersSidebar {...sidebarProps} onExploreMap={() => setIsMapOpen(true)} />
        <div>
          <ListingsHeader
            city={searchValues.city || DEFAULT_CITY}
            count={filteredProperties.length}
            activeSort={activeSort}
            onSortChange={setActiveSort}
          />
          <div className="property-listings">
            <div className="property-listings-inner">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <PropertyCard key={property.id} data={property} />
                ))
              ) : (
                <div className="empty-results">
                  No properties found for selected filters in {searchValues.city}.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isMapOpen && (
        <div className="staybook-map-overlay" role="dialog" aria-modal="true" aria-label="Map results">
          <div className="staybook-map-sheet">
            <button
              type="button"
              className="staybook-map-close"
              onClick={() => setIsMapOpen(false)}
              aria-label="Close map view"
            >
              X
            </button>

            <div className="staybook-map-canvas">
              <div className="staybook-map-search">
                <input
                  value={mapQuery}
                  onChange={(event) => setManualMapQuery(event.target.value)}
                  placeholder="Search in area, property or locality"
                />
              </div>
              <iframe
                title="Hotel map"
                className="staybook-map-frame"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={mapEmbedUrl}
              />
            </div>

            <div className="staybook-map-filters">
              <FiltersSidebar {...sidebarProps} hideMapSection hideSearchBox />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaybookSearchPage;
