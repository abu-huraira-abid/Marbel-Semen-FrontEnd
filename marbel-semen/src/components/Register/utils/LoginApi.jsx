import axios from "axios";

export default async function LoginApi(data) {
  try {
    const response = await axios.post(import.meta.env.VITE_LOGIN, {
      email: data.email,
      password: data.password,
    });

    // Save tokens & email in localStorage
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    localStorage.setItem("userEmail", data.email);

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Login failed. Try again.",
    };
  }
}
