import { useState, useEffect } from "react";
import axios from "axios";
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
  const [alert, setAlert] = useState({ type: "", message: "" });
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  // Load cart + fetch bulls
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
        setAlert({
          type: "danger",
          message: "Failed to load bulls. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBulls();
  }, [BASE_URL]);

  // Auto-hide alert after 2 seconds
  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        setAlert({ type: "", message: "" });
      }, 2000); // 2 seconds

      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setAlert({ type: "", message: "" });

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

      setAlert({ type: "success", message: "Order submitted successfully!" });
      localStorage.removeItem("cart");
      localStorage.setItem("user_email", formData.email);
      setCart([]);
      setBulls([]);
      setFormData({ name: "", phone: "", email: "", address: "" });
    } catch (err) {
      console.error("Order submission failed:", err);
      setAlert({
        type: "danger",
        message: "Failed to submit order. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading checkout...</p>
      </div>
    );

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

  return (
    <div className="container py-5" style={{ fontFamily: "Poppins" }}>
      <h2 className="mb-4">Checkout</h2>

      {alert.message && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          {alert.message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setAlert({ type: "", message: "" })}
          ></button>
        </div>
      )}

      <div className="row">
        {/* Customer Form */}
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
              <button
                type="submit"
                className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <div
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                    ></div>
                    <span>Submitting...</span>
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

        {/* Order Summary */}
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
