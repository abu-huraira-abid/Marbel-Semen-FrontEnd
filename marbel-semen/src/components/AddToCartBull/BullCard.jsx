import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function BullCard({ id }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const [bull, setBull] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    const fetchBull = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/bulls/${id}/`);
        // console.log(res.data)
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

  // ✅ Reusable SWAL login form
  const showLoginModal = async () => {
    return Swal.fire({
      title: "Login Required",
      html: `
        <style>
          .swal2-input {
            width: 90% !important;
            padding: 8px 10px !important;
            font-size: 15px !important;
          }
        </style>
        <input type="email" id="email" class="swal2-input" placeholder="Enter your email">
        <input type="password" id="password" class="swal2-input" placeholder="Enter your password">
        <p style="margin-top: 10px; font-size: 14px;">Don't have an account? 
          <a id="registerLink" href="#" style="color:#3085d6; text-decoration: underline;">Register</a>
        </p>
      `,
      confirmButtonText: "Login",
      focusConfirm: false,
      didOpen: () => {
        const registerLink = document.getElementById("registerLink");
        if (registerLink) {
          registerLink.addEventListener("click", (e) => {
            e.preventDefault();
            Swal.close();
            navigate("/account");
          });
        }
      },
      preConfirm: () => {
        const email = Swal.getPopup().querySelector("#email").value;
        const password = Swal.getPopup().querySelector("#password").value;
        if (!email || !password) {
          Swal.showValidationMessage(`Please enter both email and password`);
        }
        return { email, password };
      },
    });
  };

  // ✅ Login via SWAL and store new token
  const handleLoginAndRetry = async (callback) => {
    const result = await showLoginModal();
    if (result.isConfirmed) {
      try {
        const { email, password } = result.value;
        const res = await axios.post(`${BASE_URL}/auth/login/`, {
          email,
          password,
        });
        localStorage.setItem("accessToken", res.data.access);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You can now continue your action.",
          timer: 1500,
          showConfirmButton: false,
        });

        if (callback) callback(); // retry wishlist addition automatically
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password.",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  // ✅ Add to Cart (localStorage)
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
      cart.push({
        id: bull.id,
        qty: quantity,
        item_type: "bull",
        name: bull.name,
        price_packages: bull.price_packages,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${bull.name} added to cart successfully!`,
      showConfirmButton: false,
      timer: 2000,
    });

    setError("");
  };

  // ✅ Add to Wishlist (with re-login if token invalid)
  const handleAddToWishlist = async () => {
    let token = localStorage.getItem("accessToken");

    if (!token) {
      await handleLoginAndRetry(() => handleAddToWishlist());
      return;
    }

    try {
      setWishlistLoading(true);
      await axios.post(
        `${BASE_URL}/wishlist/`,
        { bull: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Added to Wishlist!",
        text: `${bull.name} has been added to your wishlist.`,
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error("Error adding to wishlist:", error);

      // 🔁 If token expired or invalid → remove & re-login via SWAL
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        await handleLoginAndRetry(() => handleAddToWishlist());
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text:
            error.response?.data?.bull ||
            "Could not add to wishlist. Please try again.",
          confirmButtonColor: "#d33",
        });
      }
    } finally {
      setWishlistLoading(false);
    }
  };

  // 🧾 Stock Badge Renderer
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
          <i className="bi bi-exclamation-triangle"></i> Limited Stock (
          {bull.quantity})
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
    <div
      className="container-fluid bg-light py-5"
      style={{ fontFamily: "Poppins" }}
    >
      <div className="container">
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

            <div className="my-2 fs-5 text-danger">
              REG # {bull.registration_id}
            </div>
            <div className="my-2">{renderStockBadge()}</div>

            {/* Quantity + Buttons */}
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
                className={`form-control text-center w-25 py-2 ${
                  error ? "is-invalid" : ""
                }`}
              />
              <button
                className="btn btn-success rounded-1"
                onClick={handleAddToCart}
                disabled={bull.quantity === 0}
              >
                <i className="bi bi-cart-plus me-1"></i> Add
              </button>
              <button
                className="btn btn-warning rounded-1 text-nowrap"
                onClick={handleAddToWishlist}
                disabled={wishlistLoading}
              >
                {wishlistLoading ? (
                  <>
                    <i className="bi bi-heart me-1"></i> Adding...
                  </>
                ) : (
                  <>
                    <i className="bi bi-heart me-1"></i> Add to Wishlist
                  </>
                )}
              </button>
            </div>

            {error && <div className="invalid-feedback d-block">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
