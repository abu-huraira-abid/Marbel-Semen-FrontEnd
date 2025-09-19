import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function PricePackages() {
  const { id } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("access_token");

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch packages on mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/bulls/${id}/price-packages/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        setPackages(data);
      } catch (err) {
        toast.error("Failed to load price packages");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [id]);

  // Add a new (unsaved) package
  const addPackage = () => {
    setPackages((prev) => [...prev, { min_units: "", max_units: "", price_per_unit: "" }]);
  };

  // Update a package in state
  const updatePackage = (index, field, value) => {
    setPackages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Save all packages (create/update)
  const savePackages = async () => {
    try {
      setLoading(true);
      for (const pkg of packages) {
        if (pkg.id) {
          // Existing package → update
          await axios.patch(
            `${BASE_URL}/bulls/${id}/price-packages/${pkg.id}/`,
            {
              min_units: pkg.min_units,
              max_units: pkg.max_units,
              price_per_unit: pkg.price_per_unit,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } else {
          // New package → create
          await axios.post(
            `${BASE_URL}/bulls/${id}/price-packages/`,
            {
              min_units: pkg.min_units,
              max_units: pkg.max_units,
              price_per_unit: pkg.price_per_unit,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      }
      toast.success("Price packages saved successfully");
    } catch (err) {
      toast.error("Failed to save price packages");
    } finally {
      setLoading(false);
    }
  };

  // Remove package (delete from API if it exists)
  const removePackage = async (index, pkg) => {
    if (pkg.id) {
      try {
        await axios.delete(`${BASE_URL}/bulls/${id}/price-packages/${pkg.id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Package deleted");
      } catch (err) {
        toast.error("Failed to delete package");
        return; // don’t remove from UI if API failed
      }
    } else {
      toast.info("New package removed");
    }

    // Update state
    setPackages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="my-4">
      <h1 className="mb-3" style={{ fontFamily: "Syne" }}>
        Price Packages
      </h1>

      {loading && <div className="text-muted mb-2">Loading...</div>}

      {packages.length === 0 && !loading && (
        <div className="text-muted mb-2">No packages yet. Add one below.</div>
      )}

      {packages.map((pkg, idx) => (
        <div key={pkg.id || idx} className="d-flex align-items-center gap-2 mb-2 w-75">
          <input
            type="number"
            min="0"
            className="form-control rounded-0"
            placeholder="Min Qty"
            value={pkg.min_units ?? ""}
            onChange={(e) => updatePackage(idx, "min_units", e.target.value)}
          />
          <input
            type="number"
            min="0"
            className="form-control rounded-0"
            placeholder="Max Qty"
            value={pkg.max_units ?? ""}
            onChange={(e) => updatePackage(idx, "max_units", e.target.value)}
          />
          <input
            type="number"
            min="0"
            className="form-control rounded-0"
            placeholder="Price ($)"
            value={pkg.price_per_unit ?? ""}
            onChange={(e) => updatePackage(idx, "price_per_unit", e.target.value)}
          />
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => removePackage(idx, pkg)}
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-3 d-flex gap-2">
        <button type="button" className="btn btn-outline-primary btn-sm" onClick={addPackage}>
          + Add Package
        </button>
        <button
          type="button"
          className="btn btn-success btn-sm"
          onClick={savePackages}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Packages"}
        </button>
      </div>
    </div>
  );
}
