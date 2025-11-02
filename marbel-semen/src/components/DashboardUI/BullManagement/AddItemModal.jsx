import { useState, useEffect } from "react";
import axios from "axios";
import { FaSave, FaTimes, FaUpload } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AddItemModal({ show, onClose, onSave, type = "bull" }) {
  const API_URL = `${import.meta.env.VITE_BASE_URL}/${type}s/`;

  const [newItem, setNewItem] = useState({});
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [maleBulls, setMaleBulls] = useState([]);
  const [femaleBulls, setFemaleBulls] = useState([]);

  // ✅ Fetch bulls based on type using axios (robust parsing)
  useEffect(() => {
    if ((type === "semen" || type === "embryo") && show) {
      const token = localStorage.getItem("access_token");
      const url = `${import.meta.env.VITE_BASE_URL}/bulls/`;

      axios
        .get(url, {
          headers: { Authorization: token ? `Bearer ${token}` : undefined },
        })
        .then((res) => {
          let bulls = [];
          if (Array.isArray(res.data)) bulls = res.data;
          else if (Array.isArray(res.data.data)) bulls = res.data.data;
          else if (res.data.results && Array.isArray(res.data.results.data))
            bulls = res.data.results.data;
          else if (Array.isArray(res.data.results)) bulls = res.data.results;
          else bulls = [];

          const males = bulls.filter(
            (b) => (b.gender || "").toString().toLowerCase() === "male"
          );
          const females = bulls.filter(
            (b) => (b.gender || "").toString().toLowerCase() === "female"
          );
          setMaleBulls(males);
          setFemaleBulls(females);
        })
        .catch((err) => {
          console.error("Error fetching bulls:", err);
          setMaleBulls([]);
          setFemaleBulls([]);
        });
    }
  }, [type, show]);

  // ✅ Field configurations (availability now boolean)
  const fieldConfig = {
    bull: [
      { name: "name", label: "Bull Name", type: "text", required: true },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        options: ["Sire (Male)", "Dam (Female)"],
        required: true,
      },
      { name: "breed", label: "Breed", type: "text" },
      { name: "registration_id", label: "Registration ID", type: "text" },
      { name: "age", label: "Age (Years)", type: "number" },
      { name: "weight", label: "Weight (Kg)", type: "number" },
      {
        name: "health_status",
        label: "Health Status",
        type: "select",
        options: ["excellent", "good", "fair", "poor", "under_treatment"],
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["available", "unavailable", "sold", "retired"],
      },
      { name: "description", label: "Description", type: "textarea" },
    ],

    semen: [
      {
        name: "bull",
        label: "Select Bull (Male)",
        type: "select-bull",
        required: true,
      },
      { name: "code", label: "Code", type: "text", required: true },
      { name: "batch_number", label: "Batch Number", type: "text" },
      { name: "collection_date", label: "Collection Date", type: "date" },
      // { name: "quantity", label: "Quantity", type: "number" },
      {
        name: "availability",
        label: "Availability",
        type: "boolean", // ✅ Changed to boolean
      },
      {
        name: "quality_grade",
        label: "Quality Grade",
        type: "select",
        options: ["A", "B", "C", "Rejected"],
      },
      { name: "description", label: "Description", type: "textarea" },
    ],

    embryo: [
      { name: "name", label: "Embryo Name", type: "text", required: true },
      {
        name: "sire_id",
        label: "Select Sire (Male)",
        type: "select-sire",
        required: true,
      },
      {
        name: "dam_id",
        label: "Select Dam (Female)",
        type: "select-dam",
        required: true,
      },
      {
        name: "availability",
        label: "Availability",
        type: "boolean", // ✅ Changed to boolean
      },
      { name: "description", label: "Description", type: "textarea" },
    ],
  };

  // ✅ Reset form on modal open
  useEffect(() => {
    if (show) {
      const empty = {};
      (fieldConfig[type] || []).forEach((f) => (empty[f.name] = ""));
      empty.image = null;

      // ✅ Automatically set quantity = 0 for semen
      if (type === "semen") {
        empty.quantity = 0;
      }

      setNewItem(empty);
      setPreview(null);
    }
  }, [show, type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // ✅ Convert "true"/"false" strings to booleans
    if (value === "true" || value === "false") {
      setNewItem((prev) => ({ ...prev, [name]: value === "true" }));
    } else {
      setNewItem((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewItem((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const requiredFields = (fieldConfig[type] || []).filter((f) => f.required);
    for (const field of requiredFields) {
      if (!newItem[field.name]) {
        Swal.fire({
          icon: "warning",
          title: "Incomplete Form",
          text: `Please fill in ${field.label}.`,
        });
        return;
      }
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const formData = new FormData();

      const finalItem = { ...newItem };
      if (finalItem.gender === "Sire (Male)") finalItem.gender = "male";
      if (finalItem.gender === "Dam (Female)") finalItem.gender = "female";

      Object.entries(finalItem).forEach(([key, value]) => {
        if (value !== null && value !== "") formData.append(key, value);
      });

      const res = await axios.post(API_URL, formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "Content-Type": "multipart/form-data",
        },
      });

      onSave(res.data);
      Swal.fire({
        icon: "success",
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Added!`,
        text: `New ${type} added successfully.`,
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => onClose(), 2200);
    } catch (error) {
      console.error("Error saving:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: `Failed to save ${type}. Please try again.`,
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
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">
              Add New {type.charAt(0).toUpperCase() + type.slice(1)}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <div className="row">
              {(fieldConfig[type] || []).map((field, i) => (
                <div
                  className={`${
                    field.name === "description" ? "col-12" : "col-md-6"
                  } mb-3`}
                  key={i}
                >
                  <label className="form-label">{field.label}</label>

                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      className="form-control"
                      rows="3"
                      value={newItem[field.name] || ""}
                      onChange={handleChange}
                    />
                  ) : field.type === "select" ? (
                    <select
                      name={field.name}
                      className="form-select"
                      value={newItem[field.name] || ""}
                      onChange={handleChange}
                    >
                      <option value="">-- Select --</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt.charAt(0).toUpperCase() + opt.slice(1)}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "select-bull" ? (
                    <select
                      name={field.name}
                      className="form-select"
                      value={newItem[field.name] || ""}
                      onChange={handleChange}
                    >
                      <option value="">-- Select Bull (Male) --</option>
                      {maleBulls.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name} ({b.breed})
                        </option>
                      ))}
                    </select>
                  ) : field.type === "select-sire" ? (
                    <select
                      name={field.name}
                      className="form-select"
                      value={newItem[field.name] || ""}
                      onChange={handleChange}
                    >
                      <option value="">-- Select Sire (Male) --</option>
                      {maleBulls.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name} ({b.breed})
                        </option>
                      ))}
                    </select>
                  ) : field.type === "select-dam" ? (
                    <select
                      name={field.name}
                      className="form-select"
                      value={newItem[field.name] || ""}
                      onChange={handleChange}
                    >
                      <option value="">-- Select Dam (Female) --</option>
                      {femaleBulls.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name} ({b.breed})
                        </option>
                      ))}
                    </select>
                  ) : field.type === "boolean" ? (
                    <select
                      name={field.name}
                      className="form-select"
                      value={String(newItem[field.name])}
                      onChange={handleChange}
                    >
                      <option value="">-- Select Availability --</option>
                      <option value="true">Available</option>
                      <option value="false">Unavailable</option>
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      className="form-control"
                      value={newItem[field.name] || ""}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
              {/* Image Upload */}
              {type !== "semen" && (
                <div className="col-12 mb-3">
                  <label className="form-label">Image</label>
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
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              <FaTimes className="me-1" /> Cancel
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmit}
              disabled={loading}
            >
              <FaSave className="me-1" />{" "}
              {loading ? "Saving..." : `Save ${type}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
