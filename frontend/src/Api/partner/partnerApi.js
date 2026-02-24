const BASE_URL = "http://localhost:8082";

const getAuthToken = () => localStorage.getItem("authToken");

const getAuthHeaders = () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Authentication token missing. Please log in again.");
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

export const getPartnerProfile = async () => {
  const response = await fetch(`${BASE_URL}/api/partner`, {
    headers: getAuthHeaders(),
  });
  const payload = await parseResponse(response);
  return payload.data;
};

export const updatePartnerProfile = async (profile) => {
  const response = await fetch(`${BASE_URL}/api/partner`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(profile),
  });
  const payload = await parseResponse(response);
  return payload.data;
};

export const getPartnerHotels = async () => {
  const response = await fetch(`${BASE_URL}/api/partner/hotels`, {
    headers: getAuthHeaders(),
  });
  const payload = await parseResponse(response);
  return payload.data || [];
};

export const createHotel = async (hotel) => {
  const response = await fetch(`${BASE_URL}/api/partner/hotels`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(hotel),
  });
  const payload = await parseResponse(response);
  return payload.data;
};

export const updateHotel = async (hotelId, hotel) => {
  const response = await fetch(`${BASE_URL}/api/partner/hotels/${hotelId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(hotel),
  });
  const payload = await parseResponse(response);
  return payload.data;
};

export const getHotelDetails = async (hotelId) => {
  const response = await fetch(
    `${BASE_URL}/api/partner/hotels/${hotelId}/details`,
    {
      headers: getAuthHeaders(),
    }
  );
  const payload = await parseResponse(response);
  return payload.data;
};

export const addRoomType = async (hotelId, roomType) => {
  const response = await fetch(
    `${BASE_URL}/api/partner/hotels/${hotelId}/room-types`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(roomType),
    }
  );
  const payload = await parseResponse(response);
  return payload.data;
};

export const updateRoomType = async (hotelId, roomTypeId, roomType) => {
  const response = await fetch(
    `${BASE_URL}/api/partner/hotels/${hotelId}/room-types/${roomTypeId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(roomType),
    }
  );
  const payload = await parseResponse(response);
  return payload.data;
};

export const deleteRoomType = async (hotelId, roomTypeId) => {
  const response = await fetch(
    `${BASE_URL}/api/partner/hotels/${hotelId}/room-types/${roomTypeId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );
  await parseResponse(response);
};

export const listHotelPhotos = async (hotelId, roomTypeId) => {
  const params = new URLSearchParams();
  if (roomTypeId) params.set("roomTypeId", roomTypeId);

  const url = params.toString()
    ? `${BASE_URL}/api/partner/hotels/${hotelId}/photos?${params}`
    : `${BASE_URL}/api/partner/hotels/${hotelId}/photos`;

  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });
  const payload = await parseResponse(response);
  return payload.data || [];
};

export const uploadHotelPhoto = async (
  hotelId,
  file,
  { type, roomTypeId, isPrimary } = {}
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type || "HOTEL");
  if (roomTypeId) formData.append("roomTypeId", roomTypeId);
  if (typeof isPrimary === "boolean") {
    formData.append("isPrimary", String(isPrimary));
  }

  const response = await fetch(`${BASE_URL}/api/partner/hotels/${hotelId}/photos`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });
  const payload = await parseResponse(response);
  return payload.data;
};

export const fetchHotelPhotoBlobUrl = async (fileId) => {
  if (!fileId) return null;

  const response = await fetch(`${BASE_URL}/api/partner/hotels/photos/${fileId}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to load photo");
  }

  const blob = await response.blob();
  return URL.createObjectURL(blob);
};
