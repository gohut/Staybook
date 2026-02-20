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

export const registerApi = async (name, email, password) => {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      password,
      role: "TRAVELER"
    })
  });

  const data = await response.text();

  if (!response.ok) {
    throw new Error(data);
  }

  return data;
};
