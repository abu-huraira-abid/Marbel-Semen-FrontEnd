import { useState } from "react";
import { FaSave, FaTimes, FaUpload } from "react-icons/fa";
import Swal from "sweetalert2";
import API from "../../Register/utils/Api";

const API_URL = `${import.meta.env.VITE_BASE_URL}/bulls/`;

export default function AddBullModal({ show, onClose, onSave }) {
  const [newBull, setNewBull] = useState({
    name: "",
    breed: "",
    registration_id: "",
    status: "available",
    age: "",
    weight: "",
    health_status: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBull({ ...newBull, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBull({ ...newBull, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!newBull.name || !newBull.breed || !newBull.registration_id) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill all required fields!",
        confirmButtonColor: "#d33",
      });
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");

      const formData = new FormData();
      Object.entries(newBull).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const response = await API.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      onSave(response.data);

      Swal.fire({
        icon: "success",
        title: "Bull Added!",
        text: "Your bull has been added successfully.",
        showConfirmButton: false,
        timer: 2000,
      });

      // Reset form
      setNewBull({
        name: "",
        breed: "",
        registration_id: "",
        status: "available",
        age: "",
        weight: "",
        health_status: "",
        description: "",
        image: null,
      });
      setPreview(null);

      setTimeout(() => onClose(), 2200);
    } catch (error) {
      console.error("Error saving bull:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to save bull. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{ background: show ? "rgba(0,0,0,0.5)" : "transparent" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">Add New Bull</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Bull Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={newBull.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Breed</label>
                <input
                  type="text"
                  name="breed"
                  className="form-control"
                  value={newBull.breed}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Registration ID</label>
                <input
                  type="text"
                  name="registration_id"
                  className="form-control"
                  value={newBull.registration_id}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Age (Years)</label>
                <input
                  type="number"
                  name="age"
                  className="form-control"
                  value={newBull.age}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Weight (Kg)</label>
                <input
                  type="number"
                  step="0.01"
                  name="weight"
                  className="form-control"
                  value={newBull.weight}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Health Status</label>
                <select
                  name="health_status"
                  className="form-select"
                  value={newBull.health_status}
                  onChange={handleChange}
                >
                  <option value="">-- Select Health Status --</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                  <option value="under_treatment">Under Treatment</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  className="form-select"
                  value={newBull.status}
                  onChange={handleChange}
                >
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                  <option value="sold">Sold</option>
                  <option value="retired">Retired</option>
                </select>
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  value={newBull.description}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Bull Image</label>
                <div className="input-group">
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                  <span className="input-group-text">
                    <FaUpload />
                  </span>
                </div>
                {preview && (
                  <div className="mt-3 text-center">
                    <img
                      src={preview}
                      alt="Preview"
                      width="120"
                      height="120"
                      className="rounded border"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              <FaTimes className="me-1" /> Cancel
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmit}
              disabled={loading}
            >
              <FaSave className="me-1" /> {loading ? "Saving..." : "Save Bull"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
