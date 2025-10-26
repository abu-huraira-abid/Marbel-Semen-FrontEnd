import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function PricePackages() {
  const { id } = useParams();
  const location = useLocation();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("access_token");

  // Dynamically extract entity type from the route (e.g. /account/bulls/price/:id)
  const pathParts = location.pathname.split("/");
  const pluralType = pathParts.includes("bulls")
    ? "bulls"
    : pathParts.includes("semens")
    ? "semens"
    : pathParts.includes("embryos")
    ? "embryos"
    : pathParts.includes("batches")
    ? "batches"
    : "bulls"; // default fallback

  const entityName = pluralType.charAt(0).toUpperCase() + pluralType.slice(1);

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch price packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${BASE_URL}/${pluralType}/${id}/price-packages/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];
        setPackages(data);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Failed to Load",
          text: `Unable to load ${entityName} price packages.`,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [id, pluralType]);

  // 🔹 Add new package (unsaved)
  const addPackage = () => {
    setPackages((prev) => [
      ...prev,
      { min_units: "", max_units: "", price_per_unit: "" },
    ]);
  };

  // 🔹 Update package state
  const updatePackage = (index, field, value) => {
    setPackages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // 🔹 Save packages (create or update)
  const savePackages = async () => {
    if (packages.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Packages",
        text: "Please add at least one package before saving.",
      });
      return;
    }

    try {
      setLoading(true);
      for (const pkg of packages) {
        const payload = {
          min_units: pkg.min_units,
          max_units: pkg.max_units,
          price_per_unit: pkg.price_per_unit,
        };

        if (pkg.id) {
          // Update existing package
          await axios.patch(
            `${BASE_URL}/${pluralType}/${id}/price-packages/${pkg.id}/`,
            payload,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } else {
          // Create new package
          await axios.post(
            `${BASE_URL}/${pluralType}/${id}/price-packages/`,
            payload,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      }

      Swal.fire({
        icon: "success",
        title: "Saved Successfully!",
        text: `${entityName} price packages have been updated.`,
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: `An error occurred while saving ${entityName} packages.`,
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Remove package (delete if saved)
  const removePackage = async (index, pkg) => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This will permanently delete the package.",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    if (pkg.id) {
      try {
        await axios.delete(
          `${BASE_URL}/${pluralType}/${id}/price-packages/${pkg.id}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "Package deleted successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: "Could not delete package. Please try again.",
        });
        return;
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "Removed",
        text: "Unsaved package removed.",
        timer: 1200,
        showConfirmButton: false,
      });
    }

    setPackages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="my-4">
      <h1 className="mb-3" style={{ fontFamily: "Syne" }}>
        {entityName} Price Packages
      </h1>

      {loading && <div className="text-muted mb-2">Loading...</div>}

      {packages.length === 0 && !loading && (
        <div className="text-muted mb-2">
          No packages yet. Add one below.
        </div>
      )}

      {packages.map((pkg, idx) => (
        <div
          key={pkg.id || idx}
          className="d-flex align-items-center gap-2 mb-2 w-75"
        >
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
            onChange={(e) =>
              updatePackage(idx, "price_per_unit", e.target.value)
            }
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
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={addPackage}
        >
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
