import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function EmbryoCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {}; // embryo id
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [embryo, setEmbryo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // ✅ SweetAlert Login Modal
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

  // ✅ Login Function
  const loginUser = async (email, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login/`, {
        email,
        password,
      });
      localStorage.setItem("accessToken", res.data.access);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You can now add embryos to your wishlist.",
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

  // 🧬 Fetch Embryo Details
  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/embryos/${id}/`)
        .then((res) => {
          const embryoData = res.data.data || res.data;
          // console.log("Fetched embryo:", embryoData);
          setEmbryo(embryoData);
        })

        .catch((err) => {
          console.error("Error fetching embryo:", err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to load embryo details. Please try again later.",
            confirmButtonColor: "#d33",
          });
        })
        .finally(() => setLoading(false));
    }
  }, [id, BASE_URL]);

  // 💛 Add to Wishlist
  const handleAddToWishlist = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      const result = await showLoginModal();
      if (result.isConfirmed) {
        const { email, password } = result.value;
        const success = await loginUser(email, password);
        if (success) handleAddToWishlist();
      }
      return;
    }

    try {
      setWishlistLoading(true);
      await axios.post(
        `${BASE_URL}/wishlist/`,
        {
          product_type: "embryo", 
          product_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Added to Wishlist!",
        text: `${embryo.name} has been added to your wishlist.`,
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        Swal.fire({
          icon: "warning",
          title: "Session Expired",
          text: "Please log in again to continue.",
          confirmButtonText: "Login Now",
          confirmButtonColor: "#3085d6",
        }).then(async () => {
          const result = await showLoginModal();
          if (result.isConfirmed) {
            const { email, password } = result.value;
            const success = await loginUser(email, password);
            if (success) handleAddToWishlist();
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text:
            error.response?.data?.embryo ||
            "Could not add to wishlist. Please try again.",
          confirmButtonColor: "#d33",
        });
      }
    } finally {
      setWishlistLoading(false);
    }
  };

  // 🧾 UI
  if (loading) {
    return (
      <div className="container text-center my-5">
        <h4>Loading Embryo Details...</h4>
      </div>
    );
  }

  if (!embryo) {
    return (
      <div className="container text-center my-5">
        <h4>No embryo found</h4>
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
          {/* 🧬 Embryo Image */}
          <div className="col-12 col-lg-6">
            <img
              src={embryo.image || "https://via.placeholder.com/500"}
              alt={embryo.name}
              className="img-fluid rounded-3"
            />
          </div>

          {/* 🧾 Embryo Details */}
          <div className="col-12 col-lg-6 d-flex flex-column justify-content-center mt-4 mt-lg-0">
            <div className="display-5 fw-light" style={{ fontFamily: "Syne" }}>
              {embryo.name}
            </div>

            <div className="my-2 fs-5">
              <span className="fs-3 text-success">Sire Breed: </span>
              {embryo.sire?.breed || "N/A"}
            </div>

            <div className="my-2 fs-5">
              <span className="fs-3 text-primary">Dam Breed: </span>
              {embryo.dam?.breed || "N/A"}
            </div>

            {/* <div className="my-2 fs-5 text-danger">
              REG # {embryo.registration_id || "N/A"}
            </div> */}

            <div className="my-2 fs-5">
              <span className="fs-3 text-dark">Quantity: </span>
              {embryo.quantity ?? "N/A"}
            </div>

            <div className="my-2 fs-5">
              <span className="fs-3 text-info">Status: </span>
              <span
                className={embryo.availability ? "text-success" : "text-danger"}
              >
                {embryo.availability ? "Available" : "Not Available"}
              </span>
            </div>

            <div className="my-2 fs-6 text-muted">

              <span className="fs-3 text-info">Description: </span>
              {embryo.description || "No description available."}
            </div>

            {/* 🛒 Add to Cart */}
            <button
              className="btn btn-success btn-lg rounded-1 my-2 w-50"
              onClick={() => navigate("/add-cart-embryo", { state: { id } })}
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
