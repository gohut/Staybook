import axios from "axios";

const BASE_URL = "http://localhost:8085/test";

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