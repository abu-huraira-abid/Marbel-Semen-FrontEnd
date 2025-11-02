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
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [bulls, setBulls] = useState([]);
  const [embryos, setEmbryos] = useState([]);
  const [semens, setSemens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  // Load cart from localStorage and fetch API data
  useEffect(() => {
    const fetchItems = async () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);

      if (storedCart.length === 0) {
        setBulls([]);
        setEmbryos([]);
        setSemens([]);
        setLoading(false);
        return;
      }

      const bullItems = storedCart.filter((i) => i.item_type === "bull");
      const embryoItems = storedCart.filter((i) => i.item_type === "embryo");
      const semenItems = storedCart.filter((i) => i.item_type === "semen");

      try {
        const [bullRes, embryoRes, semenRes] = await Promise.all([
          Promise.all(
            bullItems.map((i) => axios.get(`${BASE_URL}/bulls/${i.id}/`))
          ),
          Promise.all(
            embryoItems.map((i) => axios.get(`${BASE_URL}/embryos/${i.id}/`))
          ),
          Promise.all(
            semenItems.map((i) => axios.get(`${BASE_URL}/semens/${i.id}/`))
          ),
        ]);

        setBulls(
          bullRes.map((res, i) => ({
            ...res.data.data,
            qty: bullItems[i].qty,
            item_type: "bull",
            price_packages: bullItems[i].price_packages || [],
          }))
        );

        setEmbryos(
          embryoRes.map((res, i) => ({
            ...res.data,
            qty: embryoItems[i].qty,
            item_type: "embryo",
            price_packages: embryoItems[i].price_packages || [],
          }))
        );

        setSemens(
          semenRes.map((res, i) => ({
            ...res.data,
            qty: semenItems[i].qty,
            item_type: "semen",
            price_packages: semenItems[i].price_packages || [],
          }))
        );
      } catch (err) {
        console.error("Error fetching items:", err);
        Swal.fire({
          icon: "error",
          title: "Failed to load items",
          text: "Unable to fetch cart items. Try again.",
          confirmButtonColor: "#d33",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [BASE_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Price calculation using localStorage price_packages
  const getPricePackage = (item) => {
    if (!item.price_packages || item.price_packages.length === 0) return null;
    const pkg = item.price_packages.find(
      (p) => item.qty >= p.min_units && item.qty <= p.max_units
    );
    return (
      pkg ||
      item.price_packages.reduce((max, p) =>
        p.max_units > max.max_units ? p : max
      )
    );
  };

  const getPricePerUnit = (item) => {
    const pkg = getPricePackage(item);
    return pkg ? parseFloat(pkg.price_per_unit) : 0;
  };

  const calculateSubtotal = (item) => getPricePerUnit(item) * item.qty;
  const total = [...bulls, ...embryos, ...semens].reduce(
    (sum, item) => sum + calculateSubtotal(item),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const allItems = [...bulls, ...embryos, ...semens];

      await Promise.all(
        allItems.map((item) => {
          const pkg = getPricePackage(item);
          if (!pkg) return null;

          const payload = {
            price_package_id: pkg.id,
            quantity: item.qty,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
          };

          return axios.post(
            `${BASE_URL}/${item.item_type}s/${item.id}/orders/`,
            payload,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
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
      setEmbryos([]);
      setSemens([]);
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

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading checkout...</p>
      </div>
    );

  if (bulls.length === 0 && embryos.length === 0 && semens.length === 0) {
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

  const allItems = [...bulls, ...embryos, ...semens];

  return (
    <div className="container py-5" style={{ fontFamily: "Poppins" }}>
      <h2 className="mb-4">Checkout</h2>

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

        {/* Order Summary */}
        {/* Order Summary */}
        <div className="col-lg-6">
          <div className="card shadow-sm p-4">
            <h5 className="mb-3">Order Summary</h5>
            {allItems.map((item) => {
              if (item.item_type === "semen") {
                return (
                  <div
                    key={item.id + item.item_type}
                    className="d-flex align-items-center justify-content-between mb-3"
                  >
                    <div>
                      <strong>Batch: {item.batch_number}</strong>
                      <div className="text-muted small">
                        Bull: {item.bull_name || "N/A"}
                      </div>
                      <div className="text-muted small">
                        Code: {item.code || "N/A"}
                      </div>
                      <div className="text-muted small">
                        Collection: {item.collection_date || "N/A"}
                      </div>
                      <div className="text-muted small">Qty: {item.qty}</div>
                    </div>
                    <div className="fw-bold">
                      ${(getPricePerUnit(item) * item.qty).toFixed(2)}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={item.id + item.item_type}
                    className="d-flex align-items-center justify-content-between mb-3"
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="rounded me-3"
                        style={{
                          width: "60px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <strong>{item.name}</strong>
                        <div className="text-muted small">Qty: {item.qty}</div>
                      </div>
                    </div>
                    <div className="fw-bold">
                      ${(getPricePerUnit(item) * item.qty).toFixed(2)}
                    </div>
                  </div>
                );
              }
            })}
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
