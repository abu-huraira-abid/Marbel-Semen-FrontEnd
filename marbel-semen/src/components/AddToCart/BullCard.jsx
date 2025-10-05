import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function BullCard({ id }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [bull, setBull] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBull = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/bulls/${id}/`);
        setBull(res.data.data);
      } catch (err) {
        console.error("Error fetching bull:", err);
        Swal.fire({
          icon: "error",
          title: "Failed to Load Bull",
          text: "Something went wrong while fetching bull details.",
          confirmButtonColor: "#d33",
        });
      }
    };
    if (id) fetchBull();
  }, [id, BASE_URL]);

  const handleAddToCart = () => {
    if (quantity > bull.quantity) {
      setError(`Only ${bull.quantity} units available!`);
      Swal.fire({
        icon: "warning",
        title: "Limited Stock",
        text: `Only ${bull.quantity} units are available.`,
        confirmButtonColor: "#f0ad4e",
      });
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex((item) => item.id === bull.id);

    if (existingIndex !== -1) {
      cart[existingIndex].qty += quantity;
    } else {
      cart.push({ id: bull.id, qty: quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // ✅ SweetAlert success popup
    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${bull.name} added to cart successfully!`,
      showConfirmButton: false,
      timer: 2000,
    });

    setError("");
  };

  const renderStockBadge = () => {
    if (bull.quantity === 0) {
      return (
        <span className="badge bg-danger fs-6 d-inline-flex align-items-center gap-1 rounded-0 py-3 px-5">
          <i className="bi bi-x-circle"></i> Out of Stock
        </span>
      );
    } else if (bull.quantity > 0 && bull.quantity < 6) {
      return (
        <span className="badge bg-warning text-dark fs-6 d-inline-flex align-items-center gap-1 rounded-0 py-3 px-5">
          <i className="bi bi-exclamation-triangle"></i> Limited Stock ({bull.quantity})
        </span>
      );
    } else {
      return (
        <span className="badge bg-success fs-6 d-inline-flex align-items-center gap-1 rounded-0 py-3 px-5">
          <i className="bi bi-check-circle"></i> In Stock ({bull.quantity})
        </span>
      );
    }
  };

  if (!bull) {
    return (
      <div className="text-center py-5">
        <p>Loading bull...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-light py-5" style={{ fontFamily: "Poppins" }}>
      <div className="container">
        <div className="row">
          {/* Image */}
          <div className="col-12 col-lg-6">
            <img src={bull.image} alt={bull.name} className="img-fluid rounded-3" />
          </div>

          {/* Details */}
          <div className="col-12 col-lg-6 d-flex flex-column justify-content-center mt-4 mt-lg-0">
            <div className="display-5 fw-light" style={{ fontFamily: "Syne" }}>
              {bull.name}
            </div>
            <div className="my-2 fs-5">
              <span className="fs-3 text-success">Breed: </span>
              {bull.breed}
            </div>

            {/* Price Packages */}
            <div className="my-2 fs-5">
              <span className="fs-3 text-primary">Price: </span>
              {bull.price_packages && bull.price_packages.length > 0 ? (
                bull.price_packages.map((pkg) => (
                  <div className="mx-5" key={pkg.id}>
                    <strong>
                      {pkg.min_units} - {pkg.max_units} units:
                    </strong>{" "}
                    ${pkg.price_per_unit}
                  </div>
                ))
              ) : (
                <div className="mx-5">No price packages available</div>
              )}
            </div>

            <div className="my-2 fs-5 text-danger">REG # {bull.registration_id}</div>

            {/* Stock Status */}
            <div className="my-2">{renderStockBadge()}</div>

            {/* Quantity + Add to Cart */}
            <div className="d-flex align-items-center gap-2 mt-3">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setQuantity(val);
                  if (val > bull.quantity) {
                    setError(`Only ${bull.quantity} units available!`);
                  } else {
                    setError("");
                  }
                }}
                className={`form-control text-center w-25 py-2 ${error ? "is-invalid" : ""}`}
              />
              <button
                className="btn btn-success rounded-1"
                onClick={handleAddToCart}
                disabled={bull.quantity === 0}
              >
                <i className="bi bi-cart-plus me-1"></i> Add
              </button>
            </div>

            {/* Input error message */}
            {error && <div className="invalid-feedback d-block">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
