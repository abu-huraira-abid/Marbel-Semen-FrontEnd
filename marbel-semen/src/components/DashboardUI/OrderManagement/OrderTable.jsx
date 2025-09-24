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
  const [reducer,forceReducer] = useReducer(x => x+1,0)
  const [filters, setFilters] = useState({
    name: "",
    bull_name: "",
    status: "",
  });
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 5;

  // ✅ Fetch orders
  useEffect(() => {
    fetchOrders();
  }, [reducer]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/bulls/1/orders/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setOrders(res.data.results || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      Swal.fire("Error", "Failed to fetch orders!", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update order status locally
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // ✅ Delete order with SweetAlert2
  const handleDelete = async (orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${BASE_URL}/bulls/orders/${orderId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setOrders((prev) => prev.filter((o) => o.id !== orderId));

      Swal.fire("Deleted!", "The order has been deleted.", "success");
    } catch (err) {
      console.error("Error deleting order:", err);

      if (err.response?.status === 403) {
        Swal.fire("Permission Denied", "You don’t have permission to delete this order.", "error");
      } else {
        Swal.fire("Error", "Failed to delete order!", "error");
      }
    }
  };

  // ✅ Apply filters
  const filteredOrders = orders.filter(
    (order) =>
      (order.name || "").toLowerCase().includes(filters.name.toLowerCase()) &&
      (order.bull_name || "")
        .toLowerCase()
        .includes(filters.bull_name.toLowerCase()) &&
      (order.status || "")
        .toLowerCase()
        .includes(filters.status.toLowerCase())
  );

  // ✅ Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const paginatedOrders = filteredOrders.slice(
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

  return (
    <div className="container mt-4 p-4 border rounded shadow-sm bg-white">
      {/* Filters */}
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
        <div className="col-md-4 position-relative">
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

      {/* Table */}
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
                <td colSpan="7" className="text-center">
                  <div className="spinner-border text-primary" role="status" />
                </td>
              </tr>
            ) : paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.name}</td>
                  <td>{order.bull_name}</td>
                  <td>{order.quantity}</td>
                  <td>${order.total_price}</td>
                  <td>
                    <span
                      className={`badge ${
                        statusStyles[order.status] || "bg-light text-dark"
                      } w-100 text-center`}
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
                        <FaEye className="mb-1" /> View
                      </button>
                      <button
                        className="btn btn-sm btn-danger px-3 mx-1 text-nowrap"
                        onClick={() => handleDelete(order.id)}
                      >
                        <FaTrash className="mb-1" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav className="d-flex justify-content-end mt-3">
        <ul className="pagination mb-0">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => page > 1 && setPage(page - 1)}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              className={`page-item ${page === i + 1 ? "active" : ""} mx-1`}
            >
              <button
                className={`page-link ${page === i + 1 ? "fw-bold" : ""}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => page < totalPages && setPage(page + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {/* Order Modal */}
      <OrderReceipt
        show={showModal}
        handleClose={() => setShowModal(false)}
        order={selectedOrder}
        forceReducer={forceReducer}
        updateOrderStatus={updateOrderStatus}
      />
    </div>
  );
}
