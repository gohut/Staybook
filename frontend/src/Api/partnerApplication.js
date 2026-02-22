import axios from "axios";

const BASE_URL = "http://localhost:8085/test";
const ADMIN_BASE_URL = "http://localhost:8085/api/partner-applications";

export const submitPartnerApplication = async (formData) => {
  const response = await axios.post(
    `${BASE_URL}/submit`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getPartnerApplicationStatus = async (applicationId) => {
  const response = await axios.get(`${BASE_URL}/status/${applicationId}`);
  return response.data;
};

export const listPartnerApplications = async (status) => {
  const url = status
    ? `${ADMIN_BASE_URL}?status=${encodeURIComponent(status)}`
    : ADMIN_BASE_URL;
  const response = await axios.get(url);
  return response.data;
};

export const getPartnerApplication = async (applicationId) => {
  const response = await axios.get(`${ADMIN_BASE_URL}/${applicationId}`);
  return response.data;
};

export const reviewPartnerApplication = async (applicationId) => {
  const response = await axios.put(`${ADMIN_BASE_URL}/${applicationId}/review`);
  return response.data;
};

export const approvePartnerApplication = async (applicationId) => {
  const response = await axios.put(`${ADMIN_BASE_URL}/${applicationId}/approve`);
  return response.data;
};

export const rejectPartnerApplication = async (applicationId) => {
  const response = await axios.put(`${ADMIN_BASE_URL}/${applicationId}/reject`);
  return response.data;
};

export const getPartnerApplicationFileUrl = (fileId) =>
  `${ADMIN_BASE_URL}/file/${fileId}`;
