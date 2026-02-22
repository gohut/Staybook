export const HOTEL_SEARCH_STORAGE_KEY = "staybook_hotel_search";
export const HOMESTAY_SEARCH_STORAGE_KEY = "staybook_homestay_search";
export const HOLIDAY_SEARCH_STORAGE_KEY = "staybook_holiday_search";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const addDays = (isoDate, days) => {
  const base = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(base.getTime())) {
    return isoDate;
  }

  const next = new Date(base.getTime() + days * ONE_DAY_MS);
  return next.toISOString().slice(0, 10);
};

export const todayIso = () => new Date().toISOString().slice(0, 10);

export const normalizeIsoDate = (value, fallback) => {
  if (!value) {
    return fallback;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return fallback;
  }

  return parsed.toISOString().slice(0, 10);
};

export const formatDisplayDate = (isoDate) => {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const weekDay = date.toLocaleDateString("en-US", { weekday: "short" });
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${weekDay}, ${day} ${month} ${year}`;
};

export const parseInteger = (value, fallback, min = 0, max = Number.POSITIVE_INFINITY) => {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    return fallback;
  }

  return Math.max(min, Math.min(max, parsed));
};

export const formatRoomGuestSummary = ({ rooms, adults, children = 0 }) => {
  const roomLabel = `${rooms} Room${rooms > 1 ? "s" : ""}`;
  const adultLabel = `${adults} Adult${adults > 1 ? "s" : ""}`;
  if (children > 0) {
    return `${roomLabel}, ${adultLabel}, ${children} Child${children > 1 ? "ren" : ""}`;
  }
  return `${roomLabel}, ${adultLabel}`;
};

export const formatAdultSummary = ({ adults, children = 0 }) => {
  if (children > 0) {
    return `${adults} Adult${adults > 1 ? "s" : ""}, ${children} Child${children > 1 ? "ren" : ""}`;
  }
  return `${adults} Adult${adults > 1 ? "s" : ""}`;
};

export const safeJsonParse = (value, fallback = null) => {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export const readStoredSearch = (storageKey) => {
  if (typeof window === "undefined") {
    return null;
  }

  return safeJsonParse(window.localStorage.getItem(storageKey));
};

export const writeStoredSearch = (storageKey, value) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(value));
};

export const buildMapEmbedUrl = (query) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(
    query
  )}&t=&z=11&ie=UTF8&iwloc=&output=embed`;

export const parsePriceValue = (value) => {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value !== "string") {
    return 0;
  }

  const normalized = value.replace(/[^0-9]/g, "");
  return Number.parseInt(normalized, 10) || 0;
};

export const isDateAfter = (firstIso, secondIso) => {
  const first = new Date(`${firstIso}T00:00:00`).getTime();
  const second = new Date(`${secondIso}T00:00:00`).getTime();

  return first > second;
};
