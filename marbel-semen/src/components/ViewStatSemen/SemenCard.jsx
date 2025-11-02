import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function SemenCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [semen, setSemen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [pricePackages, setPricePackages] = useState([]);

  const showLoginModal = async () => {
    return Swal.fire({
      title: "Login Required",
      html: `
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

  const loginUser = async (email, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login/`, { email, password });
      localStorage.setItem("accessToken", res.data.access);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You can now add semens to your wishlist.",
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

  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/semens/${id}/`)
        .then((res) => {
          const semenData = res.data.data || res.data;
          setSemen(semenData);
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to load semen details. Please try again later.",
          });
        })
        .finally(() => setLoading(false));

      axios
        .get(`${BASE_URL}/semens/${id}/price-packages/`)
        .then((res) => {
          setPricePackages(res.data.results || res.data || []);
        })
        .catch(() => setPricePackages([]));
    }
  }, [id, BASE_URL]);

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
        { product_type: "semen", product_id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire({
        icon: "success",
        title: "Added to Wishlist!",
        text: `${semen.batch_number || "Semen"} added successfully.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.semen || "Could not add to wishlist.",
      });
    } finally {
      setWishlistLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container text-center my-5">
        <h4>Loading Semen Details...</h4>
      </div>
    );
  }

  if (!semen) {
    return (
      <div className="container text-center my-5">
        <h4>No semen found</h4>
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center align-items-center py-5">
      <div
        className="card shadow-lg border-0 rounded-4 p-4"
        style={{ maxWidth: "650px", width: "100%" }}
      >
        <div className="card-body text-center">
          {/* Batch & Bull Info */}
          <h2 className="fw-bold text-primary mb-2">
            Batch: {semen.batch_number}
          </h2>
          <h5 className="text-secondary mb-3">
            Bull: {semen.bull_name || "N/A"}
          </h5>

          {/* Key Attributes */}
          <div className="row text-start mb-3">
            <div className="col-6 mb-2">
              <strong>Code:</strong> {semen.code || "N/A"}
            </div>
            <div className="col-6 mb-2">
              <strong>Quality Grade:</strong> {semen.quality_grade || "N/A"}
            </div>
            <div className="col-6 mb-2">
              <strong>Collection Date:</strong> {semen.collection_date || "N/A"}
            </div>
            <div className="col-6 mb-2">
              <strong>Quantity:</strong> {semen.quantity ?? "N/A"}
            </div>
            <div className="col-6 mb-2">
              <strong>Status:</strong>{" "}
              <span
                className={
                  semen.availability
                    ? "text-success fw-semibold"
                    : "text-danger fw-semibold"
                }
              >
                {semen.availability ? "Available" : "Not Available"}
              </span>
            </div>
          </div>

          {/* ✅ Price Packages Section */}
          {pricePackages.length > 0 && (
            <div className="mt-4 border-top pt-3">
              <h5 className="fw-bold text-dark mb-3">Price Packages</h5>
              <div className="list-group">
                {pricePackages.map((pkg, index) => (
                  <div
                    key={pkg.id || index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {pkg.min_units} - {pkg.max_units} units
                    </span>
                    <strong className="text-success">
                      ${pkg.price_per_unit} / unit
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ✅ Description moved below price packages */}
          <p className="text-muted mt-4 border-top pt-3">
            <h5 className="fw-bold text-dark mb-3">Description</h5>
            {semen.description || "No description provided."}
          </p>

          {/* Action Buttons */}
          <div className="d-flex justify-content-center gap-3 mt-4">
            <button
              className="btn btn-success px-4 py-2 rounded-3"
              onClick={() => navigate("/add-cart-semen", { state: { id } })}
            >
              <i className="bi bi-cart-plus me-2"></i> Add to Cart
            </button>

            <button
              className="btn btn-outline-warning px-4 py-2 rounded-3"
              onClick={handleAddToWishlist}
              disabled={wishlistLoading}
            >
              {wishlistLoading ? (
                <>
                  <i className="bi bi-heart me-2"></i> Adding...
                </>
              ) : (
                <>
                  <i className="bi bi-heart me-2"></i> Add to Wishlist
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
