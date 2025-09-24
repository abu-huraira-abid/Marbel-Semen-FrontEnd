import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function OrderHistory() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Prefill email from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("user_email");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  // ✅ Fetch orders
  const fetchOrders = async () => {
    if (!email) {
      toast.warning("⚠️ Please enter an email to view orders.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/bulls/orders/?email=${email}`);
      setOrders(res.data);
    } catch (err) {
      toast.error("❌ Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cancel order
  const cancelOrder = async (id) => {
    try {
      await axios.patch(`${BASE_URL}/bulls/orders/${id}/`, { status: "cancelled" });
      toast.success("✅ Order cancelled successfully!");
      fetchOrders(); // refresh list
    } catch (err) {
      toast.error("❌ Failed to cancel order.");
    }
  };

  return (
    <div className="container py-5">
        <h1 className="mb-4 text-uppercase" style={{fontFamily:"Syne"}}>Order History</h1>
      {/* 🔎 Email Search */}
      <div className="row mb-4 d-flex align-items-center">
        <div className="col-md-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="form-control form-control-lg"
          />
        </div>
        <div className="col-md-2">
          <button
            onClick={fetchOrders}
            className="btn btn-primary"
          >
            Search Orders History
          </button>
        </div>
      </div>

      {/* 📦 Orders Section */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="alert alert-info text-center">
          No orders found for this email.
        </div>
      ) : (
        <div className="row g-3">
          {orders.map((order) => (
            <div className="col-md-6" key={order.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="card-title">
                      🐂 Bull: {order.bull_name}
                    </h5>
                    <p className="card-text mb-1">
                      <strong>Qty:</strong> {order.quantity}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Date:</strong>{" "}
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                    <span
                      className={`badge px-3 py-2 ${
                        order.status === "pending"
                          ? "bg-warning text-dark"
                          : order.status === "approved"
                          ? "bg-primary"
                          : order.status === "completed"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {["pending", "approved"].includes(order.status) && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
