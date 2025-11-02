import React, { useState, useEffect, useReducer } from "react";
import { FaEye, FaTrash, FaSearch } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import OrderReceipt from "./OrderReceipt";

const statusStyles = {
  completed: "bg-success text-white text-capitalize py-2 rounded-1",
  pending: "bg-warning text-dark text-capitalize py-2 rounded-1",
  processing: "bg-primary text-white text-capitalize py-2 rounded-1",
  cancelled: "bg-secondary text-white text-capitalize py-2 rounded-1",
  cancel: "bg-danger text-white text-capitalize py-2 rounded-1",
};

export default function OrderTable() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filters, setFilters] = useState({ name: "", bull_name: "", status: "" });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refresh, forceRefresh] = useReducer((x) => x + 1, 0);

  // ✅ Fetch orders
  useEffect(() => {
    fetchOrders();
  }, [refresh]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/orders/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });

      if (Array.isArray(res.data?.results)) setOrders(res.data.results);
      else setOrders([]);
    } catch (error) {
      console.error("Error fetching orders:", error);
      Swal.fire("Error", "❌ Failed to load orders", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete order
  const handleDelete = async (orderId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This order will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`${BASE_URL}/orders/${orderId}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });

      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      Swal.fire("Deleted!", "Order deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting order:", error);
      Swal.fire("Error", "❌ Failed to delete order", "error");
    }
  };

  // ✅ Filters
  const filteredOrders = orders.filter(
    (order) =>
      (order.name || "").toLowerCase().includes(filters.name.toLowerCase()) &&
      (order.bull_name || "").toLowerCase().includes(filters.bull_name.toLowerCase()) &&
      (order.status || "").toLowerCase().includes(filters.status.toLowerCase())
  );

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const currentOrders = filteredOrders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleFilterChange = (e) => {
    setPage(1);
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="container mt-4 p-4 border rounded shadow-sm bg-white">
      {/* 🔍 Filters */}
      <div className="row mb-3 g-2">
        <div className="col-md-4 position-relative">
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            className="form-control ps-5"
            placeholder="Search Customer"
          />
          <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
        </div>

        <div className="col-md-4 position-relative">
          <input
            type="text"
            name="bull_name"
            value={filters.bull_name}
            onChange={handleFilterChange}
            className="form-control ps-5"
            placeholder="Search Bull"
          />
          <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
        </div>

        <div className="col-md-4">
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="form-select"
          >
            <option value="">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="cancelled">Cancelled</option>
            <option value="cancel">Cancel</option>
          </select>
        </div>
      </div>

      {/* 🧾 Table */}
      <div className="table-responsive text-nowrap">
        <table className="table table-hover align-middle text-nowrap">
          <thead className="table-light">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Bull Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  <div className="spinner-border text-primary" role="status" />
                </td>
              </tr>
            ) : currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.name}</td>
                  <td>{order.bull_name}</td>
                  <td>{order.quantity}</td>
                  <td>${order.total_price}</td>
                  <td>
                    <span
                      className={`badge d-block w-100 ${
                        statusStyles[order.status] || "bg-light text-dark"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex">
                      <button
                        className="btn btn-sm btn-primary px-3 mx-1 text-nowrap"
                        onClick={() => handleView(order)}
                      >
                        <FaEye className="me-1" /> View
                      </button>
                      <button
                        className="btn btn-sm btn-danger px-3 mx-1 text-nowrap"
                        onClick={() => handleDelete(order.id)}
                      >
                        <FaTrash className="me-1" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted py-3">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📄 Pagination Footer */}
      <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
        {/* Page Size Selector */}
        <div className="d-flex align-items-center gap-2">
          <label className="text-muted small mb-0">Rows per page:</label>
          <select
            className="form-select form-select-sm"
            style={{ width: "80px" }}
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value));
              setPage(1);
            }}
          >
            {[5, 10, 25, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Page Info & Navigation */}
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted small mx-3">
            Showing{" "}
            {filteredOrders.length === 0
              ? 0
              : (page - 1) * itemsPerPage + 1}{" "}
            -{" "}
            {Math.min(page * itemsPerPage, filteredOrders.length)} of{" "}
            {filteredOrders.length}
          </span>

          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(page - 1)}>
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${page === i + 1 ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${page === totalPages ? "disabled" : ""}`}
              >
                <button className="page-link" onClick={() => setPage(page + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* 🧾 Order Modal */}
      <OrderReceipt
        show={showModal}
        handleClose={() => setShowModal(false)}
        order={selectedOrder}
        forceReducer={forceRefresh}
        updateOrderStatus={updateOrderStatus}
      />
    </div>
  );
}
