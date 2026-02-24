const BASE_URL = "http://localhost:8082";

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

export const listPublicHotels = async () => {
  const response = await fetch(`${BASE_URL}/api/public/hotels`);
  const payload = await parseResponse(response);
  return payload.data || [];
};

export const getPublicHotel = async (hotelId) => {
  const response = await fetch(`${BASE_URL}/api/public/hotels/${hotelId}`);
  const payload = await parseResponse(response);
  return payload.data;
};

export const listPublicHotelPhotos = async (hotelId, roomTypeId) => {
  const params = new URLSearchParams();
  if (roomTypeId) params.set("roomTypeId", roomTypeId);
  const url = params.toString()
    ? `${BASE_URL}/api/public/hotels/${hotelId}/photos?${params}`
    : `${BASE_URL}/api/public/hotels/${hotelId}/photos`;
  const response = await fetch(url);
  const payload = await parseResponse(response);
  return payload.data || [];
};

export const getPublicHotelPhotoUrl = (fileId) =>
  `${BASE_URL}/api/public/hotels/photos/${fileId}`;
