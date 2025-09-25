import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa"; 

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
      toast.warning("Please enter an email to view orders.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/bulls/orders/by-email/?email=${email}`
      );
      setOrders(res.data.data);
    } catch (err) {
      toast.error("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cancel order
  const cancelOrder = async (id) => {
    try {
      await axios.patch(`${BASE_URL}/bulls/orders/${id}/`, {
        status: "cancelled",
      });
      toast.success("Order cancelled successfully!");
      fetchOrders(); // refresh list
    } catch (err) {
      toast.error("Failed to cancel order.");
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-uppercase" style={{ fontFamily: "Syne" }}>
        Order History
      </h1>

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
        <div className="col-md-2 my-3 my-md-0">
          <button onClick={fetchOrders} className="btn btn-primary text-nowrap">
            Search History
          </button>
        </div>
      </div>

      {/* 📦 Orders Table */}
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
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Bull Name</th>
                <th>Date</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.name}</td>
                  <td>{order.bull_name}</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>{order.quantity}</td>
                  <td>${order.total_price}</td>
                  <td className="text-center">
                    <span
                      className={`badge px-3 py-2 text-capitalize rounded-0 ${
                        order.status === "pending"
                          ? "bg-warning text-dark"
                          : order.status === "processing"
                          ? "bg-primary"
                          : order.status === "completed"
                          ? "bg-success"
                          : "bg-danger"
                      }`
                    }
                    style={{width:"100px"}}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="d-flex justify-content-center align-items-center">
                    {["pending", "processing"].includes(order.status) ? (
                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="btn btn-sm btn-danger rounded-1 d-flex align-items-center gap-1 px-4"
                      >
                        <FaTrash /> Cancel
                      </button>
                    ) : (
                      <span className="text-muted">----</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
