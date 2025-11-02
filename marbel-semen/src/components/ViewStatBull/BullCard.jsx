import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function BullCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {}; // bull id from state
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [bull, setBull] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // ✅ Reusable Login Modal
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
        <p style="margin-top: 10px; font-size: 14px;">
          Don't have an account?
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

  // ✅ Login Function (Reusable)
  const loginUser = async (email, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login/`, { email, password });
      localStorage.setItem("accessToken", res.data.access);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You can now add bulls to your wishlist.",
        timer: 2000,
        showConfirmButton: false,
      });
      return true;
    } catch {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password.",
        confirmButtonColor: "#d33",
      });
      return false;
    }
  };

  // 🐂 Fetch Bull Details
  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/bulls/${id}/`)
        .then((res) => setBull(res.data.data))
        .catch((err) => {
          console.error("Error fetching bull:", err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to load bull details. Please try again later.",
            confirmButtonColor: "#d33",
          });
        })
        .finally(() => setLoading(false));
    }
  }, [id, BASE_URL]);

  // 💛 Handle Add to Wishlist (UPDATED)
  const handleAddToWishlist = async () => {
    const token = localStorage.getItem("accessToken");

    // 🧱 CASE 1: User Not Logged In
    if (!token) {
      const result = await showLoginModal();
      if (result.isConfirmed) {
        const { email, password } = result.value;
        const success = await loginUser(email, password);
        if (success) handleAddToWishlist(); // retry after login
      }
      return;
    }

    // 🧱 CASE 2: Logged In
    try {
      setWishlistLoading(true);
      console.log(id)
      await axios.post(
        `${BASE_URL}/wishlist/`,
        {
          product_type: "bull", 
          product_id: id,
        },
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

      // 🧠 Handle Expired Token
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        Swal.fire({
          icon: "warning",
          title: "Session Expired",
          text: "Your login session has expired. Please log in again.",
          confirmButtonText: "Login Now",
          confirmButtonColor: "#3085d6",
        }).then(async () => {
          const result = await showLoginModal();
          if (result.isConfirmed) {
            const { email, password } = result.value;
            const success = await loginUser(email, password);
            if (success) handleAddToWishlist(); // retry wishlist
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text:
            error.response?.data?.detail ||
            "Could not add to wishlist. Please try again.",
          confirmButtonColor: "#d33",
        });
      }
    } finally {
      setWishlistLoading(false);
    }
  };

  // 🧾 Render Section
  if (loading) {
    return (
      <div className="container text-center my-5">
        <h4>Loading Bull Details...</h4>
      </div>
    );
  }

  if (!bull) {
    return (
      <div className="container text-center my-5">
        <h4>No bull found</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-light py-5" style={{ fontFamily: "Poppins" }}>
      <div className="container">
        <div className="row">
          {/* 🐂 Bull Image */}
          <div className="col-12 col-lg-6">
            <img
              src={bull.image || "https://via.placeholder.com/500"}
              alt={bull.name}
              className="img-fluid rounded-3"
            />
          </div>

          {/* 🧾 Bull Details */}
          <div className="col-12 col-lg-6 d-flex flex-column justify-content-center mt-4 mt-lg-0">
            <div className="display-5 fw-light" style={{ fontFamily: "Syne" }}>
              {bull.name}
            </div>

            <div className="my-2 fs-5">
              <span className="fs-3 text-success">Breed: </span>
              {bull.breed}
            </div>

            <div className="my-2 fs-5">
              <span className="fs-3 text-primary">Price Packages: </span>
              {bull.price_packages && bull.price_packages.length > 0 ? (
                bull.price_packages.map((p) => (
                  <div className="mx-5" key={p.id}>
                    <strong>
                      {p.min_units} - {p.max_units || "∞"}
                    </strong>{" "}
                    : ${p.price_per_unit}
                  </div>
                ))
              ) : (
                <span className="text-muted">No price packages available</span>
              )}
            </div>

            <div className="my-2 fs-5 text-danger">
              REG # {bull.registration_id || "N/A"}
            </div>

            {/* 🛒 Add to Cart */}
            <button
              className="btn btn-success btn-lg rounded-1 my-2 w-50"
              onClick={() => navigate("/add-cart", { state: { id } })}
            >
              <i className="bi bi-cart-plus me-1"></i> Add to Cart
            </button>

            {/* 💛 Add to Wishlist */}
            <button
              className="btn btn-warning btn-lg rounded-1 my-2 w-50"
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
        </div>
      </div>
    </div>
  );
}
