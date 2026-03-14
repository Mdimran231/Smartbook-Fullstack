import axios from "axios";

const api = axios.create({
  // Localhost hata kar Render wala URL daal diya
  baseURL: "https://smartbook-backend-e3wr.onrender.com"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;