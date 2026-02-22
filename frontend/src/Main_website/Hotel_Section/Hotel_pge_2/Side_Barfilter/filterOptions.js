export const HOTEL_SUGGESTED_OPTIONS = [
  { key: "rushDeal", label: "Rush Deal" },
  { key: "lastMinuteDeals", label: "Last Minute Deals" },
  { key: "freeCancellation", label: "Free Cancellation" },
  { key: "coupleFriendly", label: "Couple Friendly" },
];

export const HOTEL_PRICE_OPTIONS = [
  { key: "0-2500", label: "Rs 0 - Rs 2500", min: 0, max: 2500 },
  { key: "2500-5500", label: "Rs 2500 - Rs 5500", min: 2500, max: 5500 },
  { key: "5500-8000", label: "Rs 5500 - Rs 8000", min: 5500, max: 8000 },
  { key: "8000-15000", label: "Rs 8000 - Rs 15000", min: 8000, max: 15000 },
  { key: "15000-30000", label: "Rs 15000 - Rs 30000", min: 15000, max: 30000 },
  { key: "30000+", label: "Rs 30000+", min: 30000, max: Number.POSITIVE_INFINITY },
];

export const HOTEL_STAR_OPTIONS = [
  { key: "3", label: "3 Star", value: 3 },
  { key: "4", label: "4 Star", value: 4 },
  { key: "5", label: "5 Star", value: 5 },
];

export const HOTEL_RATING_OPTIONS = [
  { key: "4.2", label: "Excellent: 4.2+", min: 4.2 },
  { key: "3.5", label: "Very Good: 3.5+", min: 3.5 },
  { key: "3", label: "Good: 3+", min: 3 },
];

export const HOTEL_PROPERTY_TYPES = [
  "Hotel",
  "Apartment",
  "Villa",
  "Resort",
  "Homestay",
  "Cottage",
  "Hostel",
];

export const HOTEL_LOCATION_OPTIONS = [
  "North Goa",
  "South Goa",
  "Calangute",
  "Candolim",
  "Baga",
  "Anjuna",
  "Panjim",
  "Vagator",
  "Palolem",
];
