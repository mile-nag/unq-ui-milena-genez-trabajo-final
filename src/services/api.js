import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
});

export const validateWord = async (word) => {
  const response = await api.get("/api/validate", { params: { word } });
  return response.data.exists;
};