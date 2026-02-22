// Hmstaypge2.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopNavbar from "../../Top_Navbar/TopNavbar";
import SearchHeader from "./SearchBar/SearchHeader";
import FilterSidebar from "./FilterBar/FilterSidebar";
import { HOMESTAY_PRICE_OPTIONS } from "./FilterBar/filterOptions";
import ResultsHeader from "./ResultHeader/ResultsHeader";
import PropertyCard from "./PropertyCard/PropertyCard";
import {
  HOMESTAY_SEARCH_STORAGE_KEY,
  addDays,
  buildMapEmbedUrl,
  normalizeIsoDate,
  parseInteger,
  readStoredSearch,
  todayIso,
  writeStoredSearch,
} from "../../common/searchState";
import "./hmstaypge2.scss";

const DEFAULT_CITY = "Goa";

const HOMESTAY_PROPERTIES = [
  {
    id: "hs-goa-1",
    city: "Goa",
    locality: "Candolim",
    locationDetail: "1.8 km drive to Candolim Beach",
    name: "Candolim Cove Villa Residences",
    propertyType: "Villa",
    starRating: 4.5,
    reviewLabel: "Excellent",
    reviewScore: 4.6,
    totalRatings: 120,
    price: 11200,
    taxes: 1800,
    ctaText: "Login & unlock a secret deal!",
    suggested: {
      earlyBirdDeals: true,
      entireHomes: true,
      topRated: true,
      pool: true,
      kitchen: true,
    },
    images: {
      main: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      thumbs: [
        "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
      ],
    },
  },
  {
    id: "hs-goa-2",
    city: "Goa",
    locality: "Calangute",
    locationDetail: "2.4 km drive to Calangute Beach",
    name: "Azure Coast Serviced Apartments",
    propertyType: "Apartment",
    starRating: 4,
    reviewLabel: "Very Good",
    reviewScore: 4.1,
    totalRatings: 240,
    price: 7800,
    taxes: 1200,
    ctaText: "Breakfast included for selected rooms",
    suggested: {
      earlyBirdDeals: false,
      entireHomes: true,
      topRated: false,
      pool: false,
      kitchen: true,
    },
    images: {
      main: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      thumbs: [
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
        "https://images.unsplash.com/photo-1599423300746-b62533397364",
      ],
    },
  },
  {
    id: "hs-goa-3",
    city: "Goa",
    locality: "Anjuna",
    locationDetail: "1.1 km drive to Anjuna Beach",
    name: "Anjuna Cliff Cottage Retreat",
    propertyType: "Cottage",
    starRating: 4,
    reviewLabel: "Very Good",
    reviewScore: 4.0,
    totalRatings: 96,
    price: 5400,
    taxes: 800,
    ctaText: "Get 10% off for 2-night stay",
    suggested: {
      earlyBirdDeals: true,
      entireHomes: false,
      topRated: false,
      pool: false,
      kitchen: false,
    },
    images: {
      main: "https://images.unsplash.com/photo-1464890100898-a385f744067f",
      thumbs: [
        "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9",
        "https://images.unsplash.com/photo-1494526585095-c41746248156",
        "https://images.unsplash.com/photo-1430285561322-7808604715df",
      ],
    },
  },
  {
    id: "hs-goa-4",
    city: "Goa",
    locality: "North Goa",
    locationDetail: "4.2 km drive to Baga Beach",
    name: "Palm Grove Farm House",
    propertyType: "Farm House",
    starRating: 3.5,
    reviewLabel: "Good",
    reviewScore: 3.7,
    totalRatings: 70,
    price: 4300,
    taxes: 650,
    ctaText: "Long-stay discounts available",
    suggested: {
      earlyBirdDeals: false,
      entireHomes: true,
      topRated: false,
      pool: true,
      kitchen: true,
    },
    images: {
      main: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      thumbs: [
        "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d58",
        "https://images.unsplash.com/photo-1475855581690-80accde3a8a0",
        "https://images.unsplash.com/photo-1549497538-303791108f95",
      ],
    },
  },
  {
    id: "hs-mumbai-1",
    city: "Mumbai",
    locality: "Khar",
    locationDetail: "2.7 km drive to Juhu Beach",
    name: "Orbit Serviced Apartments",
    propertyType: "Apartment",
    starRating: 4,
    reviewLabel: "Excellent",
    reviewScore: 4.6,
    totalRatings: 200,
    price: 20000,
    taxes: 3600,
    ctaText: "Login & unlock a secret deal!",
    suggested: {
      earlyBirdDeals: true,
      entireHomes: true,
      topRated: true,
      pool: false,
      kitchen: true,
    },
    images: {
      main: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      thumbs: [
        "https://images.unsplash.com/photo-1560448075-bb485b067938",
        "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d58",
        "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09",
      ],
    },
  },
  {
    id: "hs-delhi-1",
    city: "Delhi",
    locality: "South Delhi",
    locationDetail: "3.3 km drive to Hauz Khas Village",
    name: "Magnolia Urban Homestay",
    propertyType: "Homestay",
    starRating: 4,
    reviewLabel: "Very Good",
    reviewScore: 4.2,
    totalRatings: 118,
    price: 6100,
    taxes: 980,
    ctaText: "Book now, pay later",
    suggested: {
      earlyBirdDeals: false,
      entireHomes: false,
      topRated: true,
      pool: false,
      kitchen: true,
    },
    images: {
      main: "https://images.unsplash.com/photo-1505692952047-1a78307da8f2",
      thumbs: [
        "https://images.unsplash.com/photo-1494526585095-c41746248156",
        "https://images.unsplash.com/photo-1501183638710-841dd1904471",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f",
      ],
    },
  },
];

const createDefaultFilters = () => ({
  searchText: "",
  suggested: {
    earlyBirdDeals: false,
    entireHomes: false,
    topRated: false,
    pool: false,
    kitchen: false,
  },
  selectedPriceRanges: [],
  minBudget: "",
  maxBudget: "",
  appliedMinBudget: "",
  appliedMaxBudget: "",
  selectedRatings: [],
  selectedTypes: [],
  selectedLocations: [],
});

const toggleInArray = (items, value) =>
  items.includes(value) ? items.filter((item) => item !== value) : [...items, value];

const matchesAnyPriceRange = (price, selectedPriceRanges) => {
  if (!selectedPriceRanges.length) {
    return true;
  }

  return selectedPriceRanges.some((rangeKey) => {
    const range = HOMESTAY_PRICE_OPTIONS.find((item) => item.key === rangeKey);
    if (!range) {
      return false;
    }
    return price >= range.min && price <= range.max;
  });
};

const parseGuestSummary = (summary) => {
  const adultMatch = summary.match(/(\d+)\s*adult/i);
  const childMatch = summary.match(/(\d+)\s*child/i);
  const adults = parseInteger(adultMatch?.[1], 2, 1, 12);
  const children = parseInteger(childMatch?.[1], 0, 0, 8);
  return { adults, children };
};

const formatGuestSummary = ({ adults, children }) => {
  if (children > 0) {
    return `${adults} Adults, ${children} Child${children > 1 ? "ren" : ""}`;
  }
  return `${adults} Adults`;
};

const ensureCheckoutDate = (checkInDate, checkOutDate) => {
  if (new Date(`${checkOutDate}T00:00:00`) > new Date(`${checkInDate}T00:00:00`)) {
    return checkOutDate;
  }
  return addDays(checkInDate, 1);
};

const getInitialSearchValues = (location) => {
  const stored = readStoredSearch(HOMESTAY_SEARCH_STORAGE_KEY) || {};
  const params = new URLSearchParams(location.search);
  const routePayload = location.state?.searchPayload || {};

  const defaultCheckIn = addDays(todayIso(), 7);
  const defaultCheckOut = addDays(defaultCheckIn, 2);

  const checkInDate = normalizeIsoDate(
    routePayload.checkInDate || params.get("checkIn") || stored.checkInDate,
    defaultCheckIn
  );
  const checkOutDate = ensureCheckoutDate(
    checkInDate,
    normalizeIsoDate(
      routePayload.checkOutDate || params.get("checkOut") || stored.checkOutDate,
      defaultCheckOut
    )
  );

  const adults = parseInteger(
    routePayload.adults || params.get("adults") || stored.adults,
    2,
    1,
    12
  );
  const children = parseInteger(
    routePayload.children || params.get("children") || stored.children,
    0,
    0,
    8
  );

  return {
    city: routePayload.city || params.get("city") || stored.city || DEFAULT_CITY,
    checkInDate,
    checkOutDate,
    guestSummary: formatGuestSummary({ adults, children }),
    priceRange:
      routePayload.priceRange || params.get("price") || stored.priceRange || "Rs0-Rs4000",
  };
};

const Hmstaypge2 = () => {
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

    const base = HOMESTAY_PROPERTIES.filter((property) => {
      const matchesCity =
        !cityQuery ||
        property.city.toLowerCase().includes(cityQuery) ||
        property.locality.toLowerCase().includes(cityQuery);
      const matchesText =
        !filters.searchText.trim() ||
        `${property.name} ${property.locality} ${property.city}`
          .toLowerCase()
          .includes(filters.searchText.toLowerCase());
      const matchesSuggested = selectedSuggestedKeys.every(
        (key) => property.suggested[key]
      );
      const matchesPriceRange = matchesAnyPriceRange(
        property.price,
        filters.selectedPriceRanges
      );
      const matchesBudget = property.price >= minBudget && property.price <= maxBudget;
      const matchesRating =
        filters.selectedRatings.length === 0 ||
        filters.selectedRatings.some((rating) => property.reviewScore >= rating);
      const matchesType =
        filters.selectedTypes.length === 0 ||
        filters.selectedTypes.includes(property.propertyType);
      const matchesLocation =
        filters.selectedLocations.length === 0 ||
        filters.selectedLocations.some((locationName) =>
          property.locality.toLowerCase().includes(locationName.toLowerCase())
        );

      return (
        matchesCity &&
        matchesText &&
        matchesSuggested &&
        matchesPriceRange &&
        matchesBudget &&
        matchesRating &&
        matchesType &&
        matchesLocation
      );
    });

    const sorted = [...base];
    if (activeSort === "price_low_high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (activeSort === "price_high_low") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (activeSort === "rating_high") {
      sorted.sort((a, b) => b.reviewScore - a.reviewScore);
    } else if (activeSort === "best_value") {
      sorted.sort((a, b) => b.reviewScore / b.price - a.reviewScore / a.price);
    } else {
      sorted.sort((a, b) => b.totalRatings - a.totalRatings);
    }

    return sorted;
  }, [activeSort, filters, searchValues.city]);

  const generatedMapQuery = useMemo(() => {
    const localities =
      filters.selectedLocations.length > 0
        ? filters.selectedLocations.join(", ")
        : [...new Set(filteredProperties.slice(0, 4).map((item) => item.locality))].join(
            ", "
          );

    const priceHint =
      filters.appliedMinBudget || filters.appliedMaxBudget
        ? ` budget Rs${filters.appliedMinBudget || 0}-Rs${
            filters.appliedMaxBudget || "any"
          }`
        : "";

    return `Homestays in ${searchValues.city || DEFAULT_CITY} ${localities}${priceHint}`.trim();
  }, [
    filteredProperties,
    filters.appliedMaxBudget,
    filters.appliedMinBudget,
    filters.selectedLocations,
    searchValues.city,
  ]);

  const mapQuery = manualMapQuery || generatedMapQuery;
  const mapEmbedUrl = buildMapEmbedUrl(mapQuery);

  const persistSearchState = (nextSearchValues) => {
    const guests = parseGuestSummary(nextSearchValues.guestSummary);
    const payload = {
      city: nextSearchValues.city.trim() || DEFAULT_CITY,
      checkInDate: nextSearchValues.checkInDate,
      checkOutDate: ensureCheckoutDate(
        nextSearchValues.checkInDate,
        nextSearchValues.checkOutDate
      ),
      adults: guests.adults,
      children: guests.children,
      priceRange: nextSearchValues.priceRange,
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
    onToggleRating: (ratingMin) =>
      setFilters((prev) => ({
        ...prev,
        selectedRatings: toggleInArray(prev.selectedRatings, ratingMin),
      })),
    onToggleType: (typeName) =>
      setFilters((prev) => ({
        ...prev,
        selectedTypes: toggleInArray(prev.selectedTypes, typeName),
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
    <div className="hmstay-page">
      <TopNavbar />
      <SearchHeader
        values={searchValues}
        onFieldChange={handleSearchFieldChange}
        onSearch={handleSearchSubmit}
      />

      <div className="hmstay-body">
        <FilterSidebar {...sidebarProps} onExploreMap={() => setIsMapOpen(true)} />

        <div className="hmstay-content">
          <ResultsHeader
            city={searchValues.city || DEFAULT_CITY}
            count={filteredProperties.length}
            activeSort={activeSort}
            onSortChange={setActiveSort}
          />
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} data={property} />
            ))
          ) : (
            <div className="hm-empty-results">
              No homestays found for selected filters in {searchValues.city}.
            </div>
          )}
        </div>
      </div>

      {isMapOpen && (
        <div className="hmstay-map-overlay" role="dialog" aria-modal="true" aria-label="Map results">
          <div className="hmstay-map-sheet">
            <button
              type="button"
              className="hmstay-map-close"
              onClick={() => setIsMapOpen(false)}
              aria-label="Close map view"
            >
              X
            </button>

            <div className="hmstay-map-canvas">
              <div className="hmstay-map-search">
                <input
                  value={mapQuery}
                  onChange={(event) => setManualMapQuery(event.target.value)}
                  placeholder="Search in area, property or locality"
                />
              </div>
              <iframe
                title="Homestay map"
                className="hmstay-map-frame"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={mapEmbedUrl}
              />
            </div>

            <div className="hmstay-map-filters">
              <FilterSidebar {...sidebarProps} hideMapSection hideSearchBox />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hmstaypge2;
