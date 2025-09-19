  import { useState } from "react";
  import { FaSave, FaTimes, FaUpload } from "react-icons/fa";
  import { toast } from "react-toastify";
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
      image: null, // File object
    });

    const [preview, setPreview] = useState(null);

    // Handle text input
    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewBull({ ...newBull, [name]: value });
    };

    // Handle file upload (store File, not Base64)
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setNewBull({ ...newBull, image: file });
        setPreview(URL.createObjectURL(file));
      }
    };

    // Handle submit with FormData
    const handleSubmit = async () => {
      if (!newBull.name || !newBull.breed || !newBull.registration_id) {
        toast.error("Please fill all required fields!");
        return;
      }

      try {
        const token = localStorage.getItem("access_token");

        const formData = new FormData();
        formData.append("name", newBull.name);
        formData.append("breed", newBull.breed);
        formData.append("registration_id", newBull.registration_id);
        formData.append("status", newBull.status);
        if (newBull.age) formData.append("age", newBull.age);
        if (newBull.weight) formData.append("weight", newBull.weight);
        if (newBull.health_status) formData.append("health_status", newBull.health_status);
        if (newBull.description) formData.append("description", newBull.description);
        if (newBull.image) formData.append("image", newBull.image);

        const response = await API.post(API_URL, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        onSave(response.data);

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
        toast.success("Bull added successfully!");
        onClose();
      } catch (error) {
        console.error("Error saving bull:", error.response?.data || error.message);
        toast.error("Failed to save bull. Please try again.");
      }
    };

    return (
      <div
        className={`modal fade ${show ? "show d-block" : ""}`}
        tabIndex="-1"
        style={{ background: show ? "rgba(0,0,0,0.5)" : "transparent" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title">Add New Bull</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            {/* Body */}
            <div className="modal-body">
              {/* Name */}
              <div className="mb-3">
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

              {/* Breed */}
              <div className="mb-3">
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

              {/* Registration ID */}
              <div className="mb-3">
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

              {/* Age */}
              <div className="mb-3">
                <label className="form-label">Age (Years)</label>
                <input
                  type="number"
                  name="age"
                  className="form-control"
                  value={newBull.age}
                  onChange={handleChange}
                />
              </div>

              {/* Weight */}
              <div className="mb-3">
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

              {/* Health Status */}
              <div className="mb-3">
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

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  value={newBull.description}
                  onChange={handleChange}
                />
              </div>

              {/* File Upload */}
              <div className="mb-3">
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
                  <div className="mt-2 text-center">
                    <img
                      src={preview}
                      alt="Preview"
                      width="100"
                      height="100"
                      className="rounded border"
                    />
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="mb-3">
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
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                <FaTimes className="me-1" /> Cancel
              </button>
              <button type="button" className="btn btn-success" onClick={handleSubmit}>
                <FaSave className="me-1" /> Save Bull
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
