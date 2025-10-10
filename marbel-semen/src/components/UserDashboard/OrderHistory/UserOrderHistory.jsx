// src/components/CustomerDashboard/UserOrderHistory.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SideBar from "../SideBar";
import { FaTrash, FaSearch, FaBox, FaClock, FaCheckCircle, FaSpinner } from "react-icons/fa";

export default function UserOrderHistory() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [canceling, setCanceling] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // ✅ Prefill email from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("user_email");
    if (savedEmail) {
      setEmail(savedEmail);
      fetchOrders(savedEmail);
    }
  }, []);

  // ✅ Fetch Orders
  const fetchOrders = async (emailValue = email) => {
    if (!emailValue) return;
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/orders/by-email/?email=${emailValue}`);
      setOrders(res.data.data);
      setFiltered(res.data.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Load Orders",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cancel Order
  const cancelOrder = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This order will be cancelled and cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "No, keep it",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!confirm.isConfirmed) return;

    try {
      setCanceling(id);
      await axios.patch(`${BASE_URL}/orders/${id}/`, { status: "cancelled" });

      Swal.fire({
        icon: "success",
        title: "Order Cancelled",
        text: "Your order has been cancelled successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      fetchOrders();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Cancel",
        text: "Please try again.",
      });
    } finally {
      setCanceling(null);
    }
  };

  // ✅ Apply filters
  useEffect(() => {
    let result = [...orders];
    if (statusFilter !== "all") {
      result = result.filter((o) => o.status === statusFilter);
    }
    if (searchTerm) {
      result = result.filter((o) =>
        o.bull_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFiltered(result);
    setPage(1);
  }, [statusFilter, searchTerm, orders]);

  // ✅ Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // ✅ Stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const processingOrders = orders.filter((o) => o.status === "processing").length;

  return (
    <div className="row bg-light" style={{ fontFamily: "Poppins" }}>
      {/* Sidebar */}
      <div className="col-lg-3">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="container col-12 col-lg-9 p-4 p-lg-0 py-lg-4">
        <h1
          className="my-3 mb-5 fw-bold text-center text-lg-start"
          style={{ fontFamily: "Syne" }}
        >
          ORDER HISTORY
        </h1>

        {/* Summary Cards */}
        <div className="row g-3 mb-4">
          {[
            { title: "Total Orders", count: totalOrders, color: "primary", icon: <FaBox /> },
            { title: "Pending", count: pendingOrders, color: "warning", icon: <FaClock /> },
            { title: "Processing", count: processingOrders, color: "info", icon: <FaSpinner /> },
            { title: "Completed", count: completedOrders, color: "success", icon: <FaCheckCircle /> },
          ].map((card, i) => (
            <div className="col-12 col-md-6 col-lg-3" key={i}>
              <div
                className={`card shadow-sm text-center border-0 bg-${card.color} text-white`}
                style={{ cursor: "default" }}
              >
                <div className="card-body py-4 d-flex flex-column align-items-center justify-content-center">
                  <div className="fs-2 mb-2">{card.icon}</div>
                  <h6 className="text-uppercase small mb-1">{card.title}</h6>
                  <h3 className="fw-bold">{card.count}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="row align-items-center mb-4 g-2">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Bull Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="col-md-3">
            <button
              onClick={() => fetchOrders(email)}
              className="btn btn-primary d-flex align-items-center gap-2"
              disabled={loading}
            >
              <FaSearch /> {loading ? "Refreshing..." : "Refresh Orders"}
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted">Loading orders...</p>
          </div>
        ) : paginated.length === 0 ? (
          <div className="alert alert-info text-center">No orders found.</div>
        ) : (
          <div className="table-responsive shadow-sm">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Bull Name</th>
                  <th>Date</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th style={{ width: "120px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((order) => (
                  <tr key={order.id}>
                    <td>{order.bull_name}</td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td>{order.quantity}</td>
                    <td>${order.total_price}</td>
                    <td>
                      <span
                        className={`badge text-capitalize px-3 py-2 rounded-0 ${
                          order.status === "pending"
                            ? "bg-warning text-dark"
                            : order.status === "processing"
                            ? "bg-info text-dark"
                            : order.status === "completed"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      {["pending", "processing"].includes(order.status) ? (
                        <button
                          onClick={() => cancelOrder(order.id)}
                          className="btn btn-sm btn-danger rounded-1 d-flex align-items-center gap-1 px-3"
                          disabled={canceling === order.id}
                        >
                          {canceling === order.id ? (
                            <>
                              <div
                                className="spinner-border spinner-border-sm text-light me-1"
                                role="status"
                              ></div>
                              Cancelling...
                            </>
                          ) : (
                            <>
                              <FaTrash /> Cancel
                            </>
                          )}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination pagination-sm">
                {[...Array(totalPages)].map((_, i) => (
                  <li
                    key={i}
                    className={`page-item ${page === i + 1 ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setPage(i + 1)}
                      style={{ cursor: "pointer" }}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
