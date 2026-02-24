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

export const fetchAdminCoupons = async () => {
  const response = await fetch(`${BASE_URL}/api/admin/coupons`, {
    headers: getAuthHeaders(),
  });
  const payload = await parseResponse(response);
  return payload.data || [];
};

export const createAdminCoupon = async (coupon) => {
  const response = await fetch(`${BASE_URL}/api/admin/coupons`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(coupon),
  });
  const payload = await parseResponse(response);
  return payload.data;
};

export const fetchAdminSettings = async () => {
  const response = await fetch(`${BASE_URL}/api/admin/settings`, {
    headers: getAuthHeaders(),
  });
  const payload = await parseResponse(response);
  return payload.data;
};

export const updateAdminSettings = async (settings) => {
  const response = await fetch(`${BASE_URL}/api/admin/settings`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(settings),
  });
  const payload = await parseResponse(response);
  return payload.data;
};

export const createSubPartner = async ({ email, parentAdminEmail, name }) => {
  const response = await fetch(`${BASE_URL}/api/admin/sub-partners`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ email, parentAdminEmail, name }),
  });
  const payload = await parseResponse(response);
  return payload.data;
};

export const fetchAdminNotifications = async ({ page = 0, size = 10 } = {}) => {
  const response = await fetch(
    `${BASE_URL}/api/admin/notifications?page=${page}&size=${size}`,
    {
      headers: getAuthHeaders(),
    }
  );
  const payload = await parseResponse(response);
  return payload.data;
};

export const fetchAdminUnreadCount = async () => {
  const response = await fetch(`${BASE_URL}/api/admin/notifications/unread-count`, {
    headers: getAuthHeaders(),
  });
  const payload = await parseResponse(response);
  return payload.data;
};

export const markAdminNotificationRead = async (id) => {
  const response = await fetch(`${BASE_URL}/api/admin/notifications/${id}/read`, {
    method: "PUT",
    headers: getAuthHeaders(),
  });
  const payload = await parseResponse(response);
  return payload.data;
};

export const sendAdminMessage = async (message) => {
  const response = await fetch(`${BASE_URL}/api/admin/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(message),
  });
  const payload = await parseResponse(response);
  return payload.data;
};

export const fetchCommissionSummaries = async (category) => {
  const url = category
    ? `${BASE_URL}/api/admin/commissions?category=${encodeURIComponent(category)}`
    : `${BASE_URL}/api/admin/commissions`;
  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });
  const payload = await parseResponse(response);
  return payload.data || [];
};

export const fetchCommissionDetails = async (hotelId) => {
  const response = await fetch(`${BASE_URL}/api/admin/commissions/${hotelId}`, {
    headers: getAuthHeaders(),
  });
  const payload = await parseResponse(response);
  return payload.data;
};

export const updateCommission = async (hotelId, separateCommissionRate) => {
  const response = await fetch(`${BASE_URL}/api/admin/commissions/${hotelId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ separateCommissionRate }),
  });
  const payload = await parseResponse(response);
  return payload.data;
};

export const fetchPartners = async (category) => {
  const url = category
    ? `${BASE_URL}/api/admin/partners?category=${encodeURIComponent(category)}`
    : `${BASE_URL}/api/admin/partners`;
  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });
  const payload = await parseResponse(response);
  return payload.data || [];
};

export const fetchPartnerDetail = async (partnerId) => {
  const response = await fetch(`${BASE_URL}/api/admin/partners/${partnerId}`, {
    headers: getAuthHeaders(),
  });
  const payload = await parseResponse(response);
  return payload.data;
};

export const deletePartner = async (partnerId) => {
  const response = await fetch(`${BASE_URL}/api/admin/partners/${partnerId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  const payload = await parseResponse(response);
  return payload.data;
};
