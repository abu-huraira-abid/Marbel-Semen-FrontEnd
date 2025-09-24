import { useState, useEffect } from "react";
import axios from "axios";

export default function BullCard({ id }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [bull, setBull] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alert, setAlert] = useState(""); // 🔹 state for alert message

  useEffect(() => {
    const fetchBull = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/bulls/${id}/`);
        setBull(res.data.data);
      } catch (err) {
        console.error("Error fetching bull:", err);
      }
    };
    if (id) fetchBull();
  }, [id, BASE_URL]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex((item) => item.id === bull.id);
    if (existingIndex !== -1) {
      // update qty if already in cart
      cart[existingIndex].qty += quantity;
    } else {
      // add new item
      cart.push({ id: bull.id, qty: quantity });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));

    // 🔹 show success alert
    setAlert(`${bull.name} added to cart successfully!`);

    // remove alert after 3 sec
    setTimeout(() => setAlert(""), 3000);
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
        {/* ✅ Bootstrap Alert */}
        {alert && (
          <div className="alert alert-success alert-dismissible fade show " role="alert">
            {alert}
            <button
              type="button"
              className="btn-close"
              onClick={() => setAlert("")}
            ></button>
          </div>
        )}

        <div className="row">
          {/* Image */}
          <div className="col-12 col-lg-6">
            <img
              src={bull.image}
              alt={bull.name}
              className="img-fluid rounded-3"
            />
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

            {/* Quantity + Add to Cart */}
            <div className="d-flex align-items-center gap-2 mt-3">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="form-control text-center w-25 py-2"
              />
              <button
                className="btn btn-success rounded-1"
                onClick={handleAddToCart}
              >
                <i className="bi bi-cart-plus me-1"></i> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
