import apiClient from "./apiClient";

export const loginUser = (data) => {
  return apiClient.post("/auth/login", data);
};
