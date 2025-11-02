import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function EmbryoCard({ id }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const [embryo, setEmbryo] = useState(null);
  const [pricePackages, setPricePackages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    const fetchEmbryo = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/embryos/${id}/`);
        setEmbryo(res.data);
      } catch (err) {
        console.error("Error fetching embryo:", err);
        Swal.fire({
          icon: "error",
          title: "Failed to Load Embryo",
          text: "Something went wrong while fetching embryo details.",
          confirmButtonColor: "#d33",
        });
      }
    };

    const fetchPricePackages = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/embryos/${id}/price-packages/`
        );
        setPricePackages(res.data.results);
      } catch (err) {
        console.error("Error fetching price packages:", err);
      }
    };

    if (id) {
      fetchEmbryo();
      fetchPricePackages();
    }
  }, [id, BASE_URL]);

  // 🔹 SWAL Login Modal
  const showLoginModal = async () => {
    return Swal.fire({
      title: "Login Required",
      html: `
        <style>
          .swal2-input { width: 90% !important; padding: 8px 10px !important; font-size: 15px !important; }
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
        if (!email || !password)
          Swal.showValidationMessage("Please enter both email and password");
        return { email, password };
      },
    });
  };

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
          timer: 1500,
          showConfirmButton: false,
        });
        if (callback) callback();
      } catch {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password.",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  // 🔹 Add to Cart (like BullCard)
  const handleAddToCart = () => {
    if (quantity > embryo.quantity) {
      setError(`Only ${embryo.quantity} units available!`);
      Swal.fire({
        icon: "warning",
        title: "Limited Stock",
        text: `Only ${embryo.quantity} units are available.`,
        confirmButtonColor: "#f0ad4e",
      });
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex((item) => item.id === embryo.id);

    if (existingIndex !== -1) cart[existingIndex].qty += quantity;
    else
      cart.push({
        id: embryo.id,
        qty: quantity,
        item_type: "embryo",
        name: embryo.name,
        price_packages: pricePackages,
      });

    localStorage.setItem("cart", JSON.stringify(cart));

    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${embryo.name} added to cart successfully!`,
      showConfirmButton: false,
      timer: 2000,
    });
    setError("");
  };

  // 🔹 Add to Wishlist
  const handleAddToWishlist = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return handleLoginAndRetry(() => handleAddToWishlist());

    try {
      setWishlistLoading(true);
      await axios.post(
        `${BASE_URL}/wishlist/`,
        { embryo: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire({
        icon: "success",
        title: "Added to Wishlist!",
        text: `${embryo.name} has been added to your wishlist.`,
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("accessToken");
        return handleLoginAndRetry(() => handleAddToWishlist());
      }
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.embryo || "Could not add to wishlist.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setWishlistLoading(false);
    }
  };

  // 🔹 Stock Badge
  const renderStockBadge = () => {
    if (embryo.status === "sold" || embryo.quantity === 0)
      return <span className="badge bg-danger fs-5 p-3">Sold Out</span>;
    if (embryo.quantity < 6)
      return (
        <span className="badge bg-warning text-dark fs-5 p-3">
          Limited Stock ({embryo.quantity})
        </span>
      );
    return (
      <span className="badge bg-success fs-5 p-3">
        Available ({embryo.quantity})
      </span>
    );
  };

  if (!embryo)
    return (
      <div className="text-center py-5">
        <p>Loading embryo...</p>
      </div>
    );

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
              src={embryo.image}
              alt={embryo.name}
              className="img-fluid rounded-3"
            />
          </div>

          {/* Details */}
          <div className="col-12 col-lg-6 d-flex flex-column justify-content-center mt-4 mt-lg-0">
            <div className="display-5 fw-light">{embryo.name}</div>

            <div className="my-2 fs-5">
              <span className="fs-3 text-success">Sire Breed: </span>{" "}
              {embryo.sire?.breed || "N/A"}
            </div>
            <div className="my-2 fs-5">
              <span className="fs-3 text-success">Dam Breed: </span>{" "}
              {embryo.dam?.breed || "N/A"}
            </div>

            <div className="my-2 fs-5">
              <span className="fs-3 text-primary">Price Packages: </span>
              {pricePackages.length > 0 ? (
                pricePackages.map((pkg) => (
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
                  setError(
                    val > embryo.quantity
                      ? `Only ${embryo.quantity} units available!`
                      : ""
                  );
                }}
                className={`form-control text-center w-25 py-2 ${
                  error ? "is-invalid" : ""
                }`}
              />
              <button
                className="btn btn-success rounded-1"
                onClick={handleAddToCart}
                disabled={embryo.quantity === 0 || embryo.status === "sold"}
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
