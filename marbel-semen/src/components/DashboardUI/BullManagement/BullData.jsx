import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaTimes, FaSave } from "react-icons/fa";
import initialBulls from "./Data";

export default function BullData() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const bull = initialBulls.find((b) => b.id === parseInt(id, 10));
    if (bull) {
      // ensure pricePackages exists and is an array
      setFormData({
        ...bull,
        pricePackages: Array.isArray(bull.pricePackages) ? bull.pricePackages : [],
      });
    } else {
      setFormData(null);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Basic validation for packages (optional)
    const pkgs = formData.pricePackages ?? [];
    for (let i = 0; i < pkgs.length; i++) {
      const p = pkgs[i];
      if (p.min === "" || p.max === "" || p.price === "") {
        alert("Please fill min/max/price for all packages or remove empty packages.");
        return;
      }
      if (Number(p.min) > Number(p.max)) {
        alert("Package min must be <= max.");
        return;
      }
    }

    // For now we only log the updated object (backend will handle persisting)
    console.log("Updated bull:", formData);

    // TODO: call API to save updated bull here.

    navigate("/account/bulls");
  };

  // --- PACKAGE HANDLERS (safe, use prev state) ---
  const addPackage = () =>
    setFormData((prev) => {
      const current = prev ?? { pricePackages: [] };
      const updated = [...(current.pricePackages ?? []), { min: "", max: "", price: "" }];
      return { ...current, pricePackages: updated };
    });

  const updatePackage = (index, field, value) =>
    setFormData((prev) => {
      const current = prev ?? { pricePackages: [] };
      const pkgs = Array.isArray(current.pricePackages) ? [...current.pricePackages] : [];
      pkgs[index] = { ...pkgs[index], [field]: value };
      return { ...current, pricePackages: pkgs };
    });

  const removePackage = (index) =>
    setFormData((prev) => {
      const current = prev ?? { pricePackages: [] };
      const pkgs = (current.pricePackages ?? []).filter((_, i) => i !== index);
      return { ...current, pricePackages: pkgs };
    });

  if (!formData) return <p className="text-center py-5">Bull not found</p>;

  return (
    <div className="container py-4">
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
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Breed</label>
            <input
              type="text"
              className="form-control rounded-0"
              name="breed"
              value={formData.breed}
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
              name="reg"
              value={formData.reg}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Status</label>
            <select
              className="form-select rounded-0"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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
              name="semenStraws"
              value={formData.semenStraws ?? ""}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Health Status & Notes */}
        <div className="mb-3">
          <label className="form-label">Health Status</label>
          <input
            type="text"
            className="form-control rounded-0"
            name="healthStatus"
            value={formData.healthStatus ?? ""}
            onChange={handleChange}
          />
        </div>

        {/* Price Packages (dynamic) */}
        <div className="mb-4">
          <label className="form-label fw-bold">Price Packages</label>

          {(formData.pricePackages ?? []).length === 0 && (
            <div className="text-muted mb-2">No packages yet. Add one below.</div>
          )}

          {(formData.pricePackages ?? []).map((pkg, idx) => (
            <div key={idx} className="d-flex align-items-center gap-2 mb-2">
              <input
                type="number"
                min="0"
                className="form-control rounded-0"
                placeholder="Min Qty"
                value={pkg.min ?? ""}
                onChange={(e) => updatePackage(idx, "min", e.target.value)}
              />
              <input
                type="number"
                min="0"
                className="form-control rounded-0"
                placeholder="Max Qty (optional)"
                value={pkg.max ?? ""}
                onChange={(e) => updatePackage(idx, "max", e.target.value)}
              />
              <input
                type="number"
                min="0"
                className="form-control rounded-0"
                placeholder="Price ($)"
                value={pkg.price ?? ""}
                onChange={(e) => updatePackage(idx, "price", e.target.value)}
              />
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removePackage(idx)}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-outline-primary btn-sm mt-2"
            onClick={addPackage}
          >
            + Add Package
          </button>
        </div>
        
        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea
            className="form-control rounded-0"
            name="notes"
            rows="3"
            value={formData.notes ?? ""}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Image */}
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control rounded-0"
            name="image"
            value={formData.image ?? ""}
            onChange={handleChange}
          />
        </div>

        {formData.image && (
          <div className="mb-3">
            <img
              src={formData.image}
              alt="Bull"
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
