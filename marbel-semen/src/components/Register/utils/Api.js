// src/api/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, 
});

// Request interceptor: attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle 401 and refresh
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh_token")
    ) {
      originalRequest._retry = true;
      try {
        const refresh = localStorage.getItem("refresh_token");
        const res = await axios.post(import.meta.env.VITE_REFRESH, { refresh });

        localStorage.setItem("access_token", res.data.access);
        API.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;
        originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;

        return API(originalRequest); // retry request with new token
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/account"; // redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default API;
