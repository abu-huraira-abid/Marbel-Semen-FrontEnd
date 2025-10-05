import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCreditCard,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [cart, setCart] = useState([]);
  const [bulls, setBulls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  // ✅ Load cart and fetch bull details
  useEffect(() => {
    const fetchBulls = async () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);

      try {
        const responses = await Promise.all(
          storedCart.map((item) => axios.get(`${BASE_URL}/bulls/${item.id}/`))
        );

        const bullData = responses.map((res, i) => ({
          ...res.data.data,
          qty: storedCart[i].qty,
        }));

        setBulls(bullData);
      } catch (err) {
        console.error("Error fetching bull data:", err);
        Swal.fire({
          icon: "error",
          title: "Failed to Load Bulls",
          text: "Unable to load bulls. Please try again.",
          confirmButtonColor: "#d33",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBulls();
  }, [BASE_URL]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Calculate unit price based on quantity and package
  const getPricePerUnit = (bull) => {
    if (!bull.price_packages || bull.price_packages.length === 0) return 0;

    const qty = bull.qty;
    const pkg = bull.price_packages.find(
      (p) => qty >= p.min_units && qty <= p.max_units
    );
    if (pkg) return parseFloat(pkg.price_per_unit);

    const lastPkg = bull.price_packages.reduce((max, p) =>
      p.max_units > max.max_units ? p : max
    );
    return parseFloat(lastPkg.price_per_unit);
  };

  const calculateSubtotal = (bull) => getPricePerUnit(bull) * bull.qty;
  const total = bulls.reduce((sum, bull) => sum + calculateSubtotal(bull), 0);

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await Promise.all(
        bulls.map((bull) => {
          const unitPrice = getPricePerUnit(bull);
          const payload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            quantity: bull.qty,
            unit_price: unitPrice.toFixed(2),
            total_price: (unitPrice * bull.qty).toFixed(2),
          };

          return axios.post(`${BASE_URL}/bulls/${bull.id}/orders/`, payload, {
            headers: { "Content-Type": "application/json" },
          });
        })
      );

      Swal.fire({
        icon: "success",
        title: "Order Submitted",
        text: "Your order has been placed successfully!",
        showConfirmButton: false,
        timer: 2000,
      });

      localStorage.removeItem("cart");
      localStorage.setItem("user_email", formData.email);
      setCart([]);
      setBulls([]);
      setFormData({ name: "", phone: "", email: "", address: "" });
    } catch (err) {
      console.error("Order submission failed:", err);

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an error submitting your order. Please try again.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Loading state
  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading checkout...</p>
      </div>
    );

  // ✅ Empty cart
  if (bulls.length === 0) {
    return (
      <div className="text-center py-5">
        <h3>Your cart is empty 🛒</h3>
        <button
          className="btn btn-primary mt-3 rounded-1 px-3"
          onClick={() => navigate("/order-history")}
        >
          View Order History
        </button>
      </div>
    );
  }

  // ✅ Checkout Page
  return (
    <div className="container py-5" style={{ fontFamily: "Poppins" }}>
      <h2 className="mb-4">Checkout</h2>

      <div className="row">
        {/* 🧾 Customer Form */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm p-4">
            <h5 className="mb-3">Customer Details</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 input-group">
                <span className="input-group-text bg-light">
                  <FaUser />
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control rounded-0"
                  placeholder="Name"
                  required
                  disabled={submitting}
                />
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text bg-light">
                  <FaPhone />
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control rounded-0"
                  placeholder="Phone"
                  required
                  disabled={submitting}
                />
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text bg-light">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control rounded-0"
                  placeholder="Email"
                  required
                  disabled={submitting}
                />
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text bg-light">
                  <FaMapMarkerAlt />
                </span>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control rounded-0"
                  rows="3"
                  placeholder="Address"
                  required
                  disabled={submitting}
                ></textarea>
              </div>

              {/* ✅ Spinner in Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                disabled={submitting}
                style={{ height: "45px" }}
              >
                {submitting ? (
                  <>
                    <div
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                    ></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <FaCreditCard /> Submit Order
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* 💳 Order Summary */}
        <div className="col-lg-6">
          <div className="card shadow-sm p-4">
            <h5 className="mb-3">Order Summary</h5>
            {bulls.map((bull) => (
              <div
                key={bull.id}
                className="d-flex align-items-center justify-content-between mb-3"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={bull.image}
                    alt={bull.name}
                    className="rounded me-3"
                    style={{
                      width: "60px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <strong>{bull.name}</strong>
                    <div className="text-muted small">Qty: {bull.qty}</div>
                  </div>
                </div>
                <div className="fw-bold">
                  ${(getPricePerUnit(bull) * bull.qty).toFixed(2)}
                </div>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between">
              <strong>Total:</strong>
              <strong className="text-success">${total.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
