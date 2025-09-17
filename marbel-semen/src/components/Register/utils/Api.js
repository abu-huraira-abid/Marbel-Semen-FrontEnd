// src/api/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Request interceptor: attach access token
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

        // ✅ Refresh endpoint (from .env)
        const res = await axios.post(
          import.meta.env.VITE_REFRESH,
          { refresh }, // send refresh in body
          { headers: { "Content-Type": "application/json" } }
        );

        // Save new access token
        localStorage.setItem("access_token", res.data.access);

        // Save rotated refresh token if backend provides
        if (res.data.refresh) {
          localStorage.setItem("refresh_token", res.data.refresh);
        }

        // Update headers
        API.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;
        originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;

        // Retry the failed request
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError.response?.data || refreshError.message);

        // Clear all tokens and redirect to login
        localStorage.clear();
        window.location.href = "/account";
      }
    }

    return Promise.reject(error);
  }
);

export default API;
