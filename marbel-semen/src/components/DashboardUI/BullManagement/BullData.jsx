import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaTimes, FaSave } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BullData() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch bull details
  useEffect(() => {
    const fetchBull = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/bulls/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          const bull = response.data.data;
          setFormData({
            ...bull,
            price_packages: Array.isArray(bull.price_packages)
              ? bull.price_packages
              : [],
          });
        }
      } catch (error) {
        console.error("Error fetching bull:", error);
        setFormData(null);
        toast.error("Failed to load bull details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBull();
  }, [id]);

  // Handle simple field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save
  const handleSave = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");
    const formPayload = new FormData();

    // Append fields except image + packages
    const fieldsToSend = [
      "name",
      "breed",
      "registration_id",
      "status",
      "age",
      "weight",
      "semen_straws",
      "health_status",
    ];

    fieldsToSend.forEach((field) => {
      if (formData[field] !== undefined) {
        formPayload.append(field, formData[field]);
      }
    });

    // Append packages
    formPayload.append(
      "price_packages",
      JSON.stringify(formData.price_packages ?? [])
    );

    // Append new image if exists
    if (formData.new_image) {
      formPayload.append("image", formData.new_image);
    }

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/bulls/${id}/`,
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Bull updated successfully!");
        setTimeout(() => {
          navigate("/account/bulls");
        }, 1500);
      }
    } catch (error) {
      console.error("Error updating bull:", error);
      toast.error("Failed to update bull.");
    }
  };

  if (loading)
    return <p className="text-center py-5">Loading bull details...</p>;
  if (!formData) return <p className="text-center py-5">Bull not found</p>;

  return (
    <div className="container py-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="fw-bold mb-4" style={{ fontFamily: "Syne" }}>
        BULL DETAILS
      </h1>

      <form onSubmit={handleSave}>
        {/* Name & Breed */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control rounded-0"
              name="name"
              value={formData.name ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Breed</label>
            <input
              type="text"
              className="form-control rounded-0"
              name="breed"
              value={formData.breed ?? ""}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Registration & Status */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Registration #</label>
            <input
              type="text"
              className="form-control rounded-0"
              name="registration_id"
              value={formData.registration_id ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Status</label>
            <select
              name="status"
              className="form-select"
              value={formData.status ?? ""}
              onChange={handleChange}
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
              <option value="sold">Sold</option>
              <option value="retired">Retired</option>
            </select>
          </div>
        </div>

        {/* Age, Weight, Semen */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control rounded-0"
              name="age"
              value={formData.age ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Weight (kg)</label>
            <input
              type="number"
              className="form-control rounded-0"
              name="weight"
              value={formData.weight ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Semen Straws</label>
            <input
              type="number"
              className="form-control rounded-0"
              name="semen_straws"
              value={formData.semen_straws ?? ""}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Health Status */}
        <div className="mb-3 w-50">
          <label className="form-label">Health Status</label>
          <select
            name="health_status"
            className="form-select"
            value={formData.health_status ?? ""}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Health Status --</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
            <option value="under_treatment">Under Treatment</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) setFormData((prev) => ({ ...prev, new_image: file }));
            }}
          />
        </div>

        {/* Current image preview */}
        {formData.image && !formData.new_image && (
          <div className="mb-3">
            <img
              src={formData.image}
              alt="Bull"
              className="img-thumbnail"
              style={{ maxWidth: "200px" }}
            />
          </div>
        )}

        {/* New image preview */}
        {formData.new_image && (
          <div className="mb-3">
            <img
              src={URL.createObjectURL(formData.new_image)}
              alt="New Bull"
              className="img-thumbnail"
              style={{ maxWidth: "200px" }}
            />
          </div>
        )}

        {/* Buttons */}
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary me-2 rounded-1 px-4 d-flex align-items-center gap-2"
            onClick={() => navigate("/account/bulls")}
          >
            <FaTimes /> Cancel
          </button>
          <button
            type="submit"
            className="btn btn-dark rounded-1 px-4 d-flex align-items-center gap-2"
          >
            <FaSave /> Save
          </button>
        </div>
      </form>
    </div>
  );
}
