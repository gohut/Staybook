import { jwtDecode } from "jwt-decode";

const INVENTORY_BASE_URL = "http://localhost:8085";
const PROFILE_BASE_URL = "http://localhost:8082";

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (!decoded?.exp) return false;
    return Date.now() >= decoded.exp * 1000;
  } catch {
    return true;
  }
};

const getAuthToken = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;
  if (isTokenExpired(token)) {
    localStorage.removeItem("authToken");
    return null;
  }
  return token;
};

export const hasValidAuthToken = () => Boolean(getAuthToken());

const getAuthHeaders = () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Session expired. Please log in again.");
  }
  return { Authorization: `Bearer ${token}` };
};

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = payload?.message || payload || "Request failed";
    throw new Error(message);
  }

  return payload;
};

export const createHotelBooking = async (payload) => {
  const response = await fetch(`${INVENTORY_BASE_URL}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return parseResponse(response);
};

export const markBookingPaid = async (bookingId) => {
  const response = await fetch(
    `${INVENTORY_BASE_URL}/api/bookings/${bookingId}/payment`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paymentStatus: "PAID" }),
    }
  );
  return parseResponse(response);
};

export const listHotelBookings = async () => {
  const response = await fetch(`${INVENTORY_BASE_URL}/api/bookings`);
  return parseResponse(response);
};

export const updateHotelBookingStatus = async (
  bookingId,
  { paymentStatus, bookingStatus }
) => {
  const response = await fetch(
    `${INVENTORY_BASE_URL}/api/bookings/${bookingId}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paymentStatus, bookingStatus }),
    }
  );
  return parseResponse(response);
};

export const createTravelerBooking = async (payload) => {
  const response = await fetch(`${PROFILE_BASE_URL}/api/traveler/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });
  const parsed = await parseResponse(response);
  return parsed.data;
};

export const updateTravelerBookingPayment = async (bookingId, payload) => {
  const response = await fetch(
    `${PROFILE_BASE_URL}/api/traveler/bookings/${bookingId}/payment`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    }
  );
  const parsed = await parseResponse(response);
  return parsed.data;
};
