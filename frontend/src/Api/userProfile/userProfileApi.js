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

export const getProfile = async () => {
  const response = await fetch(`${BASE_URL}/api/traveler`, {
    headers: getAuthHeaders(),
  });
  const payload = await parseResponse(response);
  return payload.data;
};

export const createProfile = async (profile, avatarFile) => {
  const formData = new FormData();
  formData.append("firstName", profile.firstName);
  formData.append("lastName", profile.lastName);
  formData.append("phone", profile.phone);
  formData.append("dob", profile.dob);
  formData.append("nationality", profile.nationality);
  if (avatarFile) {
    formData.append("avatar", avatarFile);
  }

  const response = await fetch(`${BASE_URL}/api/traveler`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });

  const payload = await parseResponse(response);
  return payload.data;
};

export const updateProfile = async (profile) => {
  const response = await fetch(`${BASE_URL}/api/traveler`, {
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

export const fetchTrips = async ({ status, page = 0, size = 10 } = {}) => {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  params.set("page", page);
  params.set("size", size);

  const response = await fetch(`${BASE_URL}/api/traveler/trips?${params}`, {
    headers: getAuthHeaders(),
  });
  const payload = await parseResponse(response);
  return payload.data?.content || [];
};

export const fetchVouchers = async ({ status } = {}) => {
  const params = new URLSearchParams();
  if (status) params.set("status", status);

  const url = params.toString()
    ? `${BASE_URL}/api/traveler/vouchers?${params}`
    : `${BASE_URL}/api/traveler/vouchers`;

  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });
  const payload = await parseResponse(response);
  return payload.data || [];
};

export const fetchNotifications = async ({ page = 0, size = 10 } = {}) => {
  const params = new URLSearchParams({ page, size });

  const response = await fetch(
    `${BASE_URL}/api/traveler/notifications?${params}`,
    {
      headers: getAuthHeaders(),
    }
  );

  const payload = await parseResponse(response);
  return payload.data?.content || [];
};

export const markNotificationRead = async (id) => {
  const response = await fetch(
    `${BASE_URL}/api/traveler/notifications/${id}/read`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
    }
  );

  await parseResponse(response);
};

export const createNotification = async ({ title, message, from, type }) => {
  const response = await fetch(`${BASE_URL}/api/traveler/notifications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({
      title,
      message,
      from,
      type,
    }),
  });

  const payload = await parseResponse(response);
  return payload.data;
};

export const createAdminNotification = async ({
  email,
  title,
  message,
  from,
  type,
}) => {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/api/traveler/admin/notifications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      email,
      title,
      message,
      from,
      type,
    }),
  });

  const payload = await parseResponse(response);
  return payload.data;
};

export const fetchAvatarUrl = async (fileId) => {
  if (!fileId) return null;

  const response = await fetch(`${BASE_URL}/api/traveler/avatar/${fileId}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to load avatar");
  }

  const blob = await response.blob();
  return URL.createObjectURL(blob);
};
