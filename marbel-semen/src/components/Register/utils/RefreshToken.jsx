// src/api/RefreshApi.js
import axios from "axios";

const REFRESH_URL = import.meta.env.VITE_REFRESH;

export default async function RefreshTokenApi() {
  try {
    const refresh = localStorage.getItem("refresh_token");

    if (!refresh) {
      throw new Error("No refresh token found");
    }

    const response = await axios.post(
      REFRESH_URL,
      { refresh : refresh },
      { headers: { "Content-Type": "application/json" } }
    );

    // Save new tokens
    localStorage.setItem("access_token", response.data.access);

    if (response.data.refresh) {
      // ⚡ important when ROTATE_REFRESH_TOKENS=True
      localStorage.setItem("refresh_token", response.data.refresh);
    }

    return response.data;
  } catch (error) {
    console.error("Refresh token error:", error.response?.data || error.message);

    // If refresh fails → logout user
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("userEmail");

    throw error.response?.data || { detail: error.message };
  }
}
