// src/api/RefreshApi.js
import axios from "axios";

const REFRESH_URL = import.meta.env.VITE_REFRESH;

export default async function RefreshTokenApi() {
  try {
    const refresh = localStorage.getItem("refresh_token");

    if (!refresh) {
      throw new Error("No refresh token found");
    }

    const response = await axios.post(REFRESH_URL, { refresh });

    // Save new access token
    localStorage.setItem("access_token", response.data.access);

    return response.data; // { access: "...new token..." }
  } catch (error) {
    // Normalize error
    throw error.response?.data || { detail: error.message };
  }
}
