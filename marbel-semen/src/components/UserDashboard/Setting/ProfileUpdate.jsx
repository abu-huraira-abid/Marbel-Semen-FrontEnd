import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileUpdate = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/accounts/users/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to Load Profile",
          text: "Please try again.",
          confirmButtonColor: "#3085d6",
        });
      });
  }, [BASE_URL, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Ask for confirmation before updating
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update your profile details?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (!result.isConfirmed) return; // Stop if user cancels

    axios
      .patch(`${BASE_URL}/accounts/users/profile/`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your profile has been successfully updated.",
          confirmButtonColor: "#3085d6",
        });
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Something went wrong. Please try again.",
          confirmButtonColor: "#d33",
        });
      });
  };

  return (
    <div className="container mt-5 m-3 border p-4 rounded-4 bg-light shadow-lg">
      <h3 className="mb-4">Update Profile</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            className="form-control"
            value={userData.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            className="form-control"
            value={userData.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary rounded-1 px-4">
          Update
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
