import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [passwordsMatch, setPasswordsMatch] = useState(false);

  useEffect(() => {
    setPasswordsMatch(
      formData.new_password.length > 0 &&
        formData.new_password === formData.confirm_password
    );
  }, [formData.new_password, formData.confirm_password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordsMatch) {
      toast.error("New password and confirm password do not match!");
      return;
    }

    // 🔹 Confirmation before updating password
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to change your password?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      await axios.post(
        `${BASE_URL}/accounts/change-password/`,
        {
          old_password: formData.old_password,
          new_password: formData.new_password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Password Updated!",
        text: "Your password has been changed successfully.",
        confirmButtonColor: "#3085d6",
      });

      setFormData({ old_password: "", new_password: "", confirm_password: "" });
    } catch (error) {
      console.error("Error changing password:", error);

      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: data.error || "Old password is incorrect.",
            confirmButtonColor: "#d33",
          });
        } else if (status === 401) {
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "Please log in again.",
            confirmButtonColor: "#d33",
          });
        } else if (status === 500) {
          Swal.fire({
            icon: "error",
            title: "Server Error",
            text: "Something went wrong. Please try again later.",
            confirmButtonColor: "#d33",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An unexpected error occurred.",
            confirmButtonColor: "#d33",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Please check your internet connection.",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  return (
    <div className="container mt-5 p-4 m-4 border rounded-4 bg-light shadow-lg">
      <h3 className="mb-4">Change Password</h3>
      <form onSubmit={handleSubmit}>
        {/* Old Password */}
        <div className="mb-3 position-relative">
          <label htmlFor="old_password" className="form-label">
            Old Password
          </label>
          <div className="input-group">
            <input
              type={showPassword.old ? "text" : "password"}
              id="old_password"
              name="old_password"
              className="form-control"
              value={formData.old_password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => togglePasswordVisibility("old")}
            >
              {showPassword.old ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="mb-3 position-relative">
          <label htmlFor="new_password" className="form-label">
            New Password
          </label>
          <div className="input-group">
            <input
              type={showPassword.new ? "text" : "password"}
              id="new_password"
              name="new_password"
              className="form-control"
              value={formData.new_password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => togglePasswordVisibility("new")}
            >
              {showPassword.new ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-3 position-relative">
          <label htmlFor="confirm_password" className="form-label">
            Confirm New Password
          </label>
          <div className="input-group">
            <input
              type={showPassword.confirm ? "text" : "password"}
              id="confirm_password"
              name="confirm_password"
              className="form-control"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => togglePasswordVisibility("confirm")}
            >
              {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {formData.confirm_password && (
            <small
              className={`d-block mt-2 ${
                passwordsMatch ? "text-success" : "text-danger"
              }`}
            >
              {passwordsMatch
                ? "Passwords match ✅"
                : "Passwords do not match ❌"}
            </small>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary rounded-1 px-4"
          disabled={!passwordsMatch}
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
