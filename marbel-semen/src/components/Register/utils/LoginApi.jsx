import axios from "axios";

export default async function LoginApi(data) {
  try {
    const response = await axios.post(import.meta.env.VITE_LOGIN, {
      email: data.email,
      password: data.password,
    });

    // console.log(response.data)
    // Save tokens & email in localStorage
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    localStorage.setItem("userId", response.data.user.id);
    localStorage.setItem("userEmail", response.data.user.email);
    localStorage.setItem("username", response.data.user.username);
    localStorage.setItem("userRole", response.data.user.role);

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Login failed. Try again.",
    };
  }
}
