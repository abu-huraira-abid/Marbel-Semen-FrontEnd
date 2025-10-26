import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaTimes, FaSave } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

export default function AnimalData() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const entityType = location.pathname.includes("semens")
    ? "semens"
    : location.pathname.includes("embryos")
    ? "embryos"
    : "bulls";

  const title = entityType.charAt(0).toUpperCase() + entityType.slice(1) + " Details";

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [maleBulls, setMaleBulls] = useState([]);
  const [femaleBulls, setFemaleBulls] = useState([]);

  const fieldConfig = {
    bulls: [
      { name: "name", label: "Name", type: "text" },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        options: [
          { label: "Sire (Male)", value: "male" },
          { label: "Dam (Female)", value: "female" },
        ],
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
    semens: [
      { name: "bull", label: "Bull", type: "select-bull" },
      { name: "code", label: "Code", type: "text" },
      { name: "batch_number", label: "Batch Number", type: "text" },
      { name: "collection_date", label: "Collection Date", type: "date" },
      { name: "quantity", label: "Quantity", type: "number" },
      {
        name: "availability",
        label: "Status",
        type: "select",
        options: ["available", "unavailable"],
      },
      {
        name: "quality_grade",
        label: "Quality Grade",
        type: "select",
        options: ["A", "B", "C", "Rejected"],
      },
      { name: "description", label: "Description", type: "textarea" },
    ],
    embryos: [
      { name: "name", label: "Embryo Name", type: "text" },
      { name: "sire_id", label: "Sire (Male)", type: "text" },
      { name: "dam_id", label: "Dam (Female)", type: "text" },
      {
        name: "availability",
        label: "Status",
        type: "select",
        options: ["Available", "Unavailable"],
      },
      { name: "description", label: "Description", type: "textarea" },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");

        // Fetch entity details
        const resEntity = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/${entityType}/${id}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const item = resEntity.data.data || resEntity.data;

        // For embryos, store IDs and names
        if (entityType === "embryos") {
          item.sire_name = item.sire?.name || "N/A";
          item.sire_id = item.sire?.id || "";
          item.dam_name = item.dam?.name || "N/A";
          item.dam_id = item.dam?.id || "";
          item.availability = item.availability ? "Available" : "Unavailable";
        }

        // For semens, convert boolean availability to string
        if (entityType === "semens") {
          item.availability = item.availability ? "available" : "unavailable";
        }

        setFormData(item);

        // Fetch bulls for embryos and semens
        if (entityType === "embryos" || entityType === "semens") {
          const resBulls = await axios.get(`${import.meta.env.VITE_BASE_URL}/bulls/`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          let bulls = [];
          if (Array.isArray(resBulls.data.results)) bulls = resBulls.data.results;
          else if (Array.isArray(resBulls.data)) bulls = resBulls.data;

          setMaleBulls(bulls.filter((b) => b.gender?.toLowerCase() === "male"));
          setFemaleBulls(bulls.filter((b) => b.gender?.toLowerCase() === "female"));
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load data.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, entityType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData((prev) => ({ ...prev, new_image: file }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const confirm = await Swal.fire({
      title: "Save Changes?",
      text: `Update ${entityType} details?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Save",
    });
    if (!confirm.isConfirmed) return;

    try {
      setSaving(true);
      const token = localStorage.getItem("access_token");
      const formDataToSend = new FormData();

      // Append fields
      Object.entries(formData).forEach(([key, value]) => {
        if (entityType !== "semens" && key === "image") return;

        // Convert semens availability string back to boolean
        if (key === "availability" && entityType === "semens") {
          formDataToSend.append(key, value === "available");
          return;
        }

        if (value !== null && value !== undefined) formDataToSend.append(key, value);
      });

      if (formData.new_image) formDataToSend.append("image", formData.new_image);

      // Convert availability to boolean for embryos
      if (entityType === "embryos") {
        formDataToSend.set("availability", formData.availability === "Available");
      }

      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/${entityType}/${id}/`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire("Success", `${title} updated successfully!`, "success");
      setTimeout(() => navigate(`/account/bulls`), 1000);
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire("Error", `Failed to update ${entityType}.`, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center py-5">Loading {entityType} details...</p>;
  if (!formData) return <p className="text-center py-5">{entityType} not found</p>;

  return (
    <div className="container py-4">
      <h1 className="fw-bold mb-4">{title}</h1>

      <form onSubmit={handleSave}>
        <div className="row">
          {fieldConfig[entityType].map((field, i) => {
            // Embryos: show sire/dam name read-only
            if (entityType === "embryos" && (field.name === "sire_id" || field.name === "dam_id")) {
              const bullName =
                field.name === "sire_id"
                  ? maleBulls.find((b) => b.id === formData.sire_id)?.name || formData.sire_name || "N/A"
                  : femaleBulls.find((b) => b.id === formData.dam_id)?.name || formData.dam_name || "N/A";

              return (
                <div key={i} className="col-md-6 mb-3">
                  <label className="form-label">{field.label}</label>
                  <input type="text" className="form-control" value={bullName} readOnly />
                </div>
              );
            }

            // Regular fields
            return (
              <div key={i} className={`${field.name === "description" ? "col-12" : "col-md-6"} mb-3`}>
                <label className="form-label">{field.label}</label>

                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    className="form-control"
                    rows="3"
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                  />
                ) : field.type === "select" ? (
                  <select
                    name={field.name}
                    className="form-select"
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                  >
                    <option value="">-- Select --</option>
                    {field.options.map((opt) => {
                      const value = typeof opt === "object" ? opt.value : opt;
                      const label =
                        typeof opt === "object" ? opt.label : opt.charAt(0).toUpperCase() + opt.slice(1);
                      return (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    className="form-control"
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                  />
                )}
              </div>
            );
          })}

          {/* Image Upload */}
          {entityType !== "semens" && (
            <div className="col-12 mb-3">
              <label className="form-label">Image</label>
              <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} />
            </div>
          )}

          {entityType !== "semens" && (formData.image || formData.new_image) && (
            <div className="col-12 mb-3 text-center">
              <img
                src={formData.new_image ? URL.createObjectURL(formData.new_image) : formData.image}
                alt="preview"
                className="rounded border"
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
            </div>
          )}
        </div>

        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-secondary me-2" onClick={() => navigate(`/account/bulls`)}>
            <FaTimes /> Cancel
          </button>
          <button type="submit" className="btn btn-dark" disabled={saving}>
            {saving ? "Saving..." : <><FaSave /> Save</>}
          </button>
        </div>
      </form>
    </div>
  );
}
