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

const FARE_OPTIONS = [
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

const TIME_BLOCKS = [
  { id: "before6", label: "Before\n6 AM" },
  { id: "6to12", label: "6 AM to\n12 PM" },
  { id: "12to6", label: "12 PM to\n6 PM" },
  { id: "after6", label: "After\n6 PM" },
];

const POPULAR_FILTERS = [
  { id: "nonstop", label: "Non Stop" },
  { id: "nearby", label: "Hide Nearby Airports" },
  { id: "refundable", label: "Refundable Fares" },
  { id: "1stop", label: "1 Stop" },
];

const STOP_FILTERS = [
  { id: "nonstop", label: "Non Stop" },
  { id: "1stop", label: "1 Stop" },
];

const SORT_MODES = [
  { id: "cheapest", label: "CHEAPEST" },
  { id: "nonstop", label: "NONSTOP FIRST" },
  { id: "prefer", label: "YOU MAY PREFER" },
  { id: "other", label: "Other Sort" },
];

const AIRLINE_LIBRARY = [
  {
    id: "akasa",
    name: "Akasa Air",
    codePrefix: "QP",
    basePrice: 6500,
    aircraftId: "smallmid",
    fareTags: ["Regular", "Student", "Travelling for work?"],
    refundable: false,
    zeroCancellation: true,
  },
  {
    id: "aix",
    name: "Air India Express",
    codePrefix: "IX",
    basePrice: 6800,
    aircraftId: "smallmid",
    fareTags: ["Regular", "Senior Citizen", "Armed Forces"],
    refundable: false,
    zeroCancellation: true,
  },
  {
    id: "airindia",
    name: "Air India",
    codePrefix: "AI",
    basePrice: 7400,
    aircraftId: "large",
    fareTags: [
      "Regular",
      "Travelling for work?",
      "Senior Citizen",
      "Doctor and Nurses",
    ],
    refundable: true,
    zeroCancellation: true,
  },
  {
    id: "indigo",
    name: "IndiGo",
    codePrefix: "6E",
    basePrice: 7100,
    aircraftId: "smallmid",
    fareTags: ["Regular", "Student", "Travelling for work?"],
    refundable: false,
    zeroCancellation: false,
  },
  {
    id: "spicejet",
    name: "SpiceJet",
    codePrefix: "SG",
    basePrice: 7000,
    aircraftId: "smallmid",
    fareTags: ["Regular", "Student"],
    refundable: false,
    zeroCancellation: false,
  },
  {
    id: "vistara",
    name: "Vistara",
    codePrefix: "UK",
    basePrice: 7600,
    aircraftId: "large",
    fareTags: ["Regular", "Travelling for work?", "Doctor and Nurses"],
    refundable: true,
    zeroCancellation: true,
  },
];

const FLIGHT_TEMPLATES = [
  { minuteOfDay: 320, duration: 165, airlineId: "indigo", stops: 0, airport: "secondary" },
  { minuteOfDay: 380, duration: 170, airlineId: "akasa", stops: 0, airport: "primary" },
  { minuteOfDay: 455, duration: 180, airlineId: "spicejet", stops: 1, airport: "primary" },
  { minuteOfDay: 530, duration: 175, airlineId: "aix", stops: 0, airport: "secondary" },
  { minuteOfDay: 610, duration: 185, airlineId: "airindia", stops: 0, airport: "primary" },
  { minuteOfDay: 760, duration: 195, airlineId: "vistara", stops: 1, airport: "primary" },
  { minuteOfDay: 825, duration: 170, airlineId: "akasa", stops: 0, airport: "primary" },
  { minuteOfDay: 905, duration: 178, airlineId: "indigo", stops: 0, airport: "secondary" },
  { minuteOfDay: 1065, duration: 190, airlineId: "airindia", stops: 0, airport: "primary" },
  { minuteOfDay: 1160, duration: 170, airlineId: "aix", stops: 0, airport: "primary" },
  { minuteOfDay: 1260, duration: 180, airlineId: "akasa", stops: 0, airport: "primary" },
  { minuteOfDay: 1340, duration: 200, airlineId: "spicejet", stops: 1, airport: "secondary" },
];

const SECONDARY_AIRPORT_BY_CODE = {
  DEL: { id: "hindon", name: "Hindon Airport (32Km)" },
  BOM: { id: "navi", name: "Navi Mumbai Airport (42Km)" },
  BLR: { id: "hsl", name: "HAL Airport (16Km)" },
};

const CLASS_MULTIPLIERS = {
  "Economy/Premium Economy": 1,
  "Premium Economy": 1.18,
  Business: 1.72,
  "First Class": 2.15,
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const pad = (value) => String(value).padStart(2, "0");

const normalizeDateInput = (value) => {
  if (!value) {
    return "";
  }
  const next = new Date(value);
  if (Number.isNaN(next.getTime())) {
    return "";
  }
  return `${next.getFullYear()}-${pad(next.getMonth() + 1)}-${pad(next.getDate())}`;
};

const addDays = (baseDate, days) => {
  const next = new Date(baseDate);
  next.setDate(next.getDate() + days);
  return next;
};

const getAirportByCode = (code) =>
  AIRPORTS.find((airport) => airport.code === code) || AIRPORTS[0];

const getRouteFactor = (fromCode, toCode) => {
  const joined = `${fromCode}${toCode}`;
  return [...joined].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 7;
};

const minutesToTime = (minutes) => {
  const normalized = ((minutes % 1440) + 1440) % 1440;
  const hrs = Math.floor(normalized / 60);
  const mins = normalized % 60;
  return `${pad(hrs)}:${pad(mins)}`;
};

const minutesToDuration = (minutes) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${pad(hrs)} h${mins ? ` ${pad(mins)} m` : ""}`;
};

const minutesToBucket = (minutes) => {
  const hour = Math.floor((((minutes % 1440) + 1440) % 1440) / 60);
  if (hour < 6) {
    return "before6";
  }
  if (hour < 12) {
    return "6to12";
  }
  if (hour < 18) {
    return "12to6";
  }
  return "after6";
};

const formatDateTitle = (dateValue) => {
  const date = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

const resolveDepartureAirports = (fromAirport) => {
  const primary = {
    id: `${fromAirport.code.toLowerCase()}-primary`,
    label: fromAirport.airport,
    isNearby: false,
  };
  const secondary = SECONDARY_AIRPORT_BY_CODE[fromAirport.code];
  if (!secondary) {
    return [primary];
  }
  return [
    { id: "igi", label: fromAirport.airport, isNearby: false },
    { id: secondary.id, label: secondary.name, isNearby: true },
  ];
};

const buildFlightCode = (prefix, index, routeFactor) =>
  `${prefix} ${1300 + index * 37 + routeFactor * 11}`;

const formatPrice = (price) => `Rs ${Math.round(price).toLocaleString("en-IN")}`;

const getCarrier = (airlineId) =>
  AIRLINE_LIBRARY.find((airline) => airline.id === airlineId) || AIRLINE_LIBRARY[0];

const getSortComparator = (mode) => {
  if (mode === "nonstop") {
    return (a, b) =>
      a.stops - b.stops ||
      a.durationMinutes - b.durationMinutes ||
      a.priceValue - b.priceValue;
  }

  if (mode === "prefer") {
    return (a, b) =>
      Number(b.refundable) - Number(a.refundable) ||
      Number(b.zeroCancellation) - Number(a.zeroCancellation) ||
      a.priceValue - b.priceValue;
  }

  if (mode === "other") {
    return (a, b) => a.departMinutes - b.departMinutes || a.priceValue - b.priceValue;
  }

  return (a, b) => a.priceValue - b.priceValue || a.durationMinutes - b.durationMinutes;
};

const sanitizeSet = (value) => (value instanceof Set ? value : new Set(value || []));

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const buildTravellersFromState = (travellers = {}) => ({
  adults: clamp(toNumber(travellers.adults, 1), 1, 9),
  children: clamp(toNumber(travellers.children, 0), 0, 8),
  infants: clamp(toNumber(travellers.infants, 0), 0, 4),
  travelClass: TRAVEL_CLASSES.includes(travellers.travelClass)
    ? travellers.travelClass
    : TRAVEL_CLASSES[0],
});

const getTodayInput = () => normalizeDateInput(new Date());

const normalizeSearchState = (inputState = {}) => {
  const tripType = TRIP_OPTIONS.some((option) => option.key === inputState.tripType)
    ? inputState.tripType
    : "one_way";

  const fromCode = getAirportByCode(inputState.fromCode || "DEL").code;
  const toCandidate = getAirportByCode(inputState.toCode || "BLR").code;
  const toCode = fromCode === toCandidate ? "BLR" : toCandidate;

  const departureDate = normalizeDateInput(inputState.departureDate) || getTodayInput();
  const tentativeReturn = normalizeDateInput(inputState.returnDate);
  const returnDate =
    tripType === "round_trip"
      ? tentativeReturn && tentativeReturn > departureDate
        ? tentativeReturn
        : normalizeDateInput(addDays(new Date(`${departureDate}T00:00:00`), 3))
      : "";

  const travellers = buildTravellersFromState(inputState);
  const fareType = FARE_OPTIONS.includes(inputState.fareType)
    ? inputState.fareType
    : FARE_OPTIONS[0];

  return {
    tripType,
    fromCode,
    toCode,
    departureDate,
    returnDate,
    adults: travellers.adults,
    children: travellers.children,
    infants: travellers.infants,
    travelClass: travellers.travelClass,
    fareType,
    zeroCancellation: Boolean(inputState.zeroCancellation),
  };
};

const buildInitialSearchState = (routeState) => {
  const baseDate = addDays(new Date(), 7);
  const fallback = {
    tripType: "one_way",
    fromCode: "DEL",
    toCode: "BLR",
    departureDate: normalizeDateInput(baseDate),
    returnDate: "",
    adults: 1,
    children: 0,
    infants: 0,
    travelClass: TRAVEL_CLASSES[0],
    fareType: FARE_OPTIONS[0],
    zeroCancellation: false,
  };

  if (!routeState) {
    return fallback;
  }

  return normalizeSearchState({
    ...fallback,
    tripType: routeState.tripType,
    fromCode: routeState.from?.code,
    toCode: routeState.to?.code,
    departureDate: routeState.departureDate || fallback.departureDate,
    returnDate: routeState.returnDate || "",
    ...buildTravellersFromState(routeState.travellers),
    fareType: routeState.fareType,
    zeroCancellation: routeState.zeroCancellation,
  });
};

const createInitialFilters = () => ({
  popular: new Set(["nonstop"]),
  departureAirports: new Set([]),
  stops: new Set(["nonstop"]),
  maxPrice: null,
  depTime: new Set([]),
  arrTime: new Set([]),
  airlines: new Set([]),
  aircraft: new Set([]),
  sortMode: "cheapest",
});

const buildFlightsForSearch = (searchState) => {
  const query = normalizeSearchState(searchState);
  const fromAirport = getAirportByCode(query.fromCode);
  const toAirport = getAirportByCode(query.toCode);
  const routeFactor = getRouteFactor(fromAirport.code, toAirport.code);
  const daySeed = Number(query.departureDate?.slice(-2) || "1");
  const dateLift = (daySeed % 5) * 55;
  const classMultiplier = CLASS_MULTIPLIERS[query.travelClass] || 1;
  const departureAirports = resolveDepartureAirports(fromAirport);
  const totalTravellers = query.adults + query.children + query.infants;

  return FLIGHT_TEMPLATES.map((template, index) => {
    const airline = getCarrier(template.airlineId);
    const hasSecondary = departureAirports.length > 1;
    const useSecondary = hasSecondary && template.airport === "secondary";
    const departureAirport = useSecondary ? departureAirports[1] : departureAirports[0];
    const layoverMinutes = template.stops ? 55 + routeFactor * 3 : 0;
    const durationMinutes = template.duration + routeFactor * 6 + layoverMinutes;
    const departMinutes = template.minuteOfDay + routeFactor * 4;
    const arriveMinutes = departMinutes + durationMinutes;
    const basePrice =
      airline.basePrice +
      routeFactor * 190 +
      template.stops * 500 +
      index * 65 +
      dateLift;
    const priceValue = Math.round(basePrice * classMultiplier);
    const code = buildFlightCode(airline.codePrefix, index, routeFactor);
    const stopKey = template.stops === 0 ? "nonstop" : "1stop";
    const stopLabel = template.stops === 0 ? "Non stop" : "1 Stop";
    const fareEligible = airline.fareTags.includes(query.fareType) || query.fareType === "Regular";

    return {
      id: `${fromAirport.code}-${toAirport.code}-${index + 1}`,
      airlineId: airline.id,
      airline: airline.name,
      code,
      departTime: minutesToTime(departMinutes),
      departMinutes,
      departCity: fromAirport.city,
      departAirportLabel: departureAirport.label,
      departAirportId: departureAirport.id,
      duration: minutesToDuration(durationMinutes),
      durationMinutes,
      stop: stopLabel,
      stopKey,
      stops: template.stops,
      arriveTime: minutesToTime(arriveMinutes),
      arriveMinutes,
      arriveCity: toAirport.city,
      price: formatPrice(priceValue),
      priceValue,
      lock: `Lock this price @ ${formatPrice(priceValue * 0.06)} ->`,
      promo:
        query.fareType === "Regular"
          ? `Extra deal for ${totalTravellers} traveller${totalTravellers > 1 ? "s" : ""} on this route.`
          : `${query.fareType} fare available on this flight.`,
      refundable: airline.refundable || template.stops === 1,
      zeroCancellation: airline.zeroCancellation,
      nearbyAirport: departureAirport.isNearby,
      depTimeBucket: minutesToBucket(departMinutes),
      arrTimeBucket: minutesToBucket(arriveMinutes),
      aircraftId: airline.aircraftId,
      fareEligible,
    };
  });
};

const applyFlightFilters = (flights, filters, searchState) => {
  const currentFilters = {
    popular: sanitizeSet(filters.popular),
    departureAirports: sanitizeSet(filters.departureAirports),
    stops: sanitizeSet(filters.stops),
    depTime: sanitizeSet(filters.depTime),
    arrTime: sanitizeSet(filters.arrTime),
    airlines: sanitizeSet(filters.airlines),
    aircraft: sanitizeSet(filters.aircraft),
    maxPrice: filters.maxPrice,
  };

  const stopSelection = new Set(currentFilters.stops);
  if (currentFilters.popular.has("nonstop")) {
    stopSelection.add("nonstop");
  }
  if (currentFilters.popular.has("1stop")) {
    stopSelection.add("1stop");
  }

  const filtered = flights.filter((flight) => {
    if (!flight.fareEligible) {
      return false;
    }

    if (searchState.zeroCancellation && !flight.zeroCancellation) {
      return false;
    }

    if (
      currentFilters.departureAirports.size > 0 &&
      !currentFilters.departureAirports.has(flight.departAirportId)
    ) {
      return false;
    }

    if (stopSelection.size > 0 && !stopSelection.has(flight.stopKey)) {
      return false;
    }

    if (
      typeof currentFilters.maxPrice === "number" &&
      flight.priceValue > currentFilters.maxPrice
    ) {
      return false;
    }

    if (currentFilters.depTime.size > 0 && !currentFilters.depTime.has(flight.depTimeBucket)) {
      return false;
    }

    if (currentFilters.arrTime.size > 0 && !currentFilters.arrTime.has(flight.arrTimeBucket)) {
      return false;
    }

    if (currentFilters.airlines.size > 0 && !currentFilters.airlines.has(flight.airlineId)) {
      return false;
    }

    if (currentFilters.aircraft.size > 0 && !currentFilters.aircraft.has(flight.aircraftId)) {
      return false;
    }

    if (currentFilters.popular.has("nearby") && flight.nearbyAirport) {
      return false;
    }

    if (currentFilters.popular.has("refundable") && !flight.refundable) {
      return false;
    }

    return true;
  });

  const sortMode = SORT_MODES.some((mode) => mode.id === filters.sortMode)
    ? filters.sortMode
    : "cheapest";

  return [...filtered].sort(getSortComparator(sortMode));
};

const getFilterMeta = (flights) => {
  const departureMap = new Map();
  const airlineMap = new Map();
  const aircraftMap = new Map([
    ["large", { id: "large", name: "Large Aircraft", price: Infinity }],
    ["smallmid", { id: "smallmid", name: "Small / Mid-size Aircraft", price: Infinity }],
  ]);

  let minPrice = Infinity;
  let maxPrice = 0;

  flights.forEach((flight) => {
    minPrice = Math.min(minPrice, flight.priceValue);
    maxPrice = Math.max(maxPrice, flight.priceValue);

    const departure = departureMap.get(flight.departAirportId);
    if (!departure) {
      departureMap.set(flight.departAirportId, {
        id: flight.departAirportId,
        label: flight.departAirportLabel,
        price: flight.priceValue,
      });
    } else {
      departure.price = Math.min(departure.price, flight.priceValue);
    }

    const airline = airlineMap.get(flight.airlineId);
    if (!airline) {
      airlineMap.set(flight.airlineId, {
        id: flight.airlineId,
        name: flight.airline,
        price: flight.priceValue,
      });
    } else {
      airline.price = Math.min(airline.price, flight.priceValue);
    }

    const aircraft = aircraftMap.get(flight.aircraftId);
    if (aircraft) {
      aircraft.price = Math.min(aircraft.price, flight.priceValue);
    }
  });

  return {
    departureAirports: [...departureMap.values()]
      .sort((a, b) => a.price - b.price)
      .map((item) => ({ ...item, priceLabel: formatPrice(item.price) })),
    airlines: [...airlineMap.values()]
      .sort((a, b) => a.price - b.price)
      .map((item) => ({ ...item, priceLabel: formatPrice(item.price) })),
    aircraft: [...aircraftMap.values()]
      .filter((item) => item.price < Infinity)
      .sort((a, b) => a.price - b.price)
      .map((item) => ({ ...item, priceLabel: formatPrice(item.price) })),
    minPrice: Number.isFinite(minPrice) ? minPrice : 0,
    maxPrice,
  };
};

const getSortSummary = (flights, modeId) => {
  if (!flights.length) {
    return "No fares";
  }
  const sorted = [...flights].sort(getSortComparator(modeId));
  const chosen = sorted[0];
  return `${formatPrice(chosen.priceValue)} | ${chosen.duration}`;
};

const sanitizeFiltersForMeta = (filters, meta) => {
  const next = {
    ...filters,
    popular: sanitizeSet(filters.popular),
    departureAirports: sanitizeSet(filters.departureAirports),
    stops: sanitizeSet(filters.stops),
    depTime: sanitizeSet(filters.depTime),
    arrTime: sanitizeSet(filters.arrTime),
    airlines: sanitizeSet(filters.airlines),
    aircraft: sanitizeSet(filters.aircraft),
  };

  const departureIds = new Set(meta.departureAirports.map((airport) => airport.id));
  const airlineIds = new Set(meta.airlines.map((airline) => airline.id));
  const aircraftIds = new Set(meta.aircraft.map((item) => item.id));

  next.departureAirports = new Set(
    [...next.departureAirports].filter((id) => departureIds.has(id))
  );
  next.airlines = new Set([...next.airlines].filter((id) => airlineIds.has(id)));
  next.aircraft = new Set([...next.aircraft].filter((id) => aircraftIds.has(id)));

  const minPrice = meta.minPrice || 0;
  const maxPrice = meta.maxPrice || minPrice;

  if (next.maxPrice == null) {
    next.maxPrice = maxPrice;
  } else {
    next.maxPrice = clamp(next.maxPrice, minPrice, maxPrice);
  }

  return next;
};

const getDateStrip = (searchState) => {
  const base = new Date(`${searchState.departureDate}T00:00:00`);
  if (Number.isNaN(base.getTime())) {
    return [];
  }

  const routeFactor = getRouteFactor(searchState.fromCode, searchState.toCode);
  const classMultiplier = CLASS_MULTIPLIERS[searchState.travelClass] || 1;
  const baseFare = Math.round((6400 + routeFactor * 180) * classMultiplier);

  return Array.from({ length: 8 }).map((_, index) => {
    const date = addDays(base, index - 1);
    const dateInput = normalizeDateInput(date);
    const dayOffset = Math.abs(index - 3);
    const priceValue = baseFare + dayOffset * 145 + ((index + routeFactor) % 3) * 95;
    return {
      dateValue: dateInput,
      label: formatDateTitle(dateInput),
      priceValue,
      priceLabel: formatPrice(priceValue),
    };
  });
};

const getAppliedFilterPills = (filters) => {
  const current = sanitizeSet(filters.popular);
  return POPULAR_FILTERS.filter((item) => current.has(item.id));
};

const getTravellersSummary = (searchState) => {
  const total = searchState.adults + searchState.children + searchState.infants;
  return `${total} Adult${total > 1 ? "s" : ""}, ${searchState.travelClass}`;
};

export {
  AIRPORTS,
  TRIP_OPTIONS,
  FARE_OPTIONS,
  TRAVEL_CLASSES,
  TIME_BLOCKS,
  POPULAR_FILTERS,
  STOP_FILTERS,
  SORT_MODES,
  buildInitialSearchState,
  normalizeSearchState,
  createInitialFilters,
  buildFlightsForSearch,
  applyFlightFilters,
  getFilterMeta,
  sanitizeFiltersForMeta,
  getDateStrip,
  getSortSummary,
  formatPrice,
  getAirportByCode,
  getAppliedFilterPills,
  getTravellersSummary,
};
