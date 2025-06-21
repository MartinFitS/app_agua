import axios from "../api/axiosInstance";

export const registerUserService = async (formData:FormData) => {
  const response = await axios.post("/users/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
