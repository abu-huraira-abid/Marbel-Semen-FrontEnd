import React, { useState } from "react";
import { FaTimes, FaSave } from "react-icons/fa";
import Swal from "sweetalert2";
import API from "../../Register/utils/Api";

export default function UserModal({ show, handleClose,forceReducer }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [loading, setLoading] = useState(false);

  if (!show) return null;

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post(
        `${import.meta.env.VITE_BASE_URL}/accounts/register/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User created successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      // Reset form after success
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "customer",
      });

      forceReducer()
      handleClose(); 
    } catch (error) {
      console.error("Error creating user:", error.response?.data || error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.detail ||
          "Failed to create user. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1050,
          overflowY: "auto",
        }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content shadow-lg">
            <div className="modal-header">
              <h5 className="modal-title">Add New User</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {/* Username */}
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter username"
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter email"
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter password"
                    required
                  />
                </div>

                {/* Role */}
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={handleClose}
                disabled={loading}
              >
                <FaTimes className="me-2" /> Cancel
              </button>
              <button
                className="btn btn-dark"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="me-2" /> Save User
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1040 }}
        onClick={handleClose}
      ></div>
    </>
  );
}
