const BASE_URL = "http://localhost:8081";

export const loginApi = async (email, password) => {
  console.log("Sending:", email, password);
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data);
  }

  return data; 
};

export const registerApi = async (name, email, password, role = "TRAVELER") => {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      password,
      role
    })
  });

  const data = await response.text();

  if (!response.ok) {
    throw new Error(data);
  }

  return data;
};

export const changePasswordApi = async (currentPassword, newPassword) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("Authentication token missing. Please log in again.");
  }

  const response = await fetch(`${BASE_URL}/api/auth/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  const data = await response.text();

  if (!response.ok) {
    throw new Error(data || "Failed to update password");
  }

  return data;
};
