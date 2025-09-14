import { useState } from "react";
import { FaSave, FaTimes, FaUpload } from "react-icons/fa";

export default function AddBullModal({ show, onClose, onSave }) {
  const [newBull, setNewBull] = useState({
    name: "",
    breed: "",
    reg: "",
    status: "Active",
    image: "",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBull({ ...newBull, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // preview for UI
        setNewBull({ ...newBull, image: reader.result }); // save as base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!newBull.name || !newBull.breed || !newBull.reg) {
      alert("Please fill all required fields!");
      return;
    }
    onSave(newBull);
    setNewBull({ name: "", breed: "", reg: "", status: "Active", image: "" });
    setPreview(null);
    onClose();
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

            <div className="mb-3">
              <label className="form-label">Registration #</label>
              <input
                type="text"
                name="reg"
                className="form-control"
                value={newBull.reg}
                onChange={handleChange}
                required
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

            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                name="status"
                className="form-select"
                value={newBull.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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
