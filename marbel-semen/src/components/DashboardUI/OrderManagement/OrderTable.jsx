import React, { useState } from "react";
import {
  FaEye,
  FaTrash,
  FaSearch,
  FaCalendarAlt,
  FaCreditCard,
  FaFlag,
} from "react-icons/fa";
import OrderReceipt from "./OrderReceipt";

const ordersData = [
  {
    id: "10401",
    customer: "Alice Smith",
    orderDate: "01/05/2024",
    total: "$1,200.00",
    paymentStatus: "Completed",
    orderStatus: "Completed",
  },
  {
    id: "10402",
    customer: "Bob Johnson",
    orderDate: "01/10/2024",
    total: "$850.00",
    paymentStatus: "Pending",
    orderStatus: "Pending",
  },
  {
    id: "10403",
    customer: "John Doe",
    orderDate: "03/24/2024",
    total: "$1,200.00",
    paymentStatus: "Pending",
    orderStatus: "Pending",
  },
  {
    id: "10404",
    customer: "Rusty",
    orderDate: "11/29/2024",
    total: "$800.00",
    paymentStatus: "Processing",
    orderStatus: "Processing",
  },
  {
    id: "10405",
    customer: "Maverick",
    orderDate: "02/14/2024",
    total: "$1,500.00",
    paymentStatus: "Cancelled",
    orderStatus: "Cancelled",
  },
  {
    id: "10406",
    customer: "Simmental",
    orderDate: "03/01/2024",
    total: "$900.00",
    paymentStatus: "Cancel",
    orderStatus: "Cancel",
  },
  {
    id: "10407",
    customer: "Daisy Ridley",
    orderDate: "04/11/2024",
    total: "$2,100.00",
    paymentStatus: "Completed",
    orderStatus: "Completed",
  },
  {
    id: "10408",
    customer: "Ethan Hunt",
    orderDate: "05/05/2024",
    total: "$1,750.00",
    paymentStatus: "Processing",
    orderStatus: "Processing",
  },
  {
    id: "10409",
    customer: "Fiona Gallagher",
    orderDate: "06/15/2024",
    total: "$1,050.00",
    paymentStatus: "Pending",
    orderStatus: "Pending",
  },
  {
    id: "10410",
    customer: "George Lucas",
    orderDate: "07/21/2024",
    total: "$3,200.00",
    paymentStatus: "Completed",
    orderStatus: "Completed",
  },
];

const statusStyles = {
  Completed: "bg-success text-white",
  Pending: "bg-warning text-dark",
  Processing: "bg-primary text-white",
  Cancelled: "bg-secondary text-white",
  Cancel: "bg-danger text-white",
};

const updateOrderStatus = (orderId, newStatus) => {
  setOrders((prev) =>
    prev.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    )
  );
};

export default function OrderTable() {
  const [orders, setOrders] = useState(ordersData);
  const [filters, setFilters] = useState({
    customer: "",
    orderDate: "",
    paymentStatus: "",
    orderStatus: "",
  });
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const itemsPerPage = 5;

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Filter orders
  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(filters.customer.toLowerCase()) &&
      order.orderDate.toLowerCase().includes(filters.orderDate.toLowerCase()) &&
      order.paymentStatus
        .toLowerCase()
        .includes(filters.paymentStatus.toLowerCase()) &&
      order.orderStatus
        .toLowerCase()
        .includes(filters.orderStatus.toLowerCase())
  );
  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
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

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
  };

  return (
    <div className="container mt-4 p-4 border rounded shadow-sm bg-white">
      {/* Filters */}
      <div className="row mb-3 g-2">
        {/* Customer Filter */}
        <div className="col-md-3 position-relative">
          <input
            type="text"
            name="customer"
            value={filters.customer}
            onChange={handleFilterChange}
            className="form-control ps-5"
            placeholder="Search Customer"
          />
          <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
        </div>
        {/* Date Filter */}
        <div className="col-md-3 position-relative">
          <input
            type="text"
            name="orderDate"
            value={filters.orderDate}
            onChange={handleFilterChange}
            className="form-control ps-5"
            placeholder="Search Date"
          />
          <FaCalendarAlt className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
        </div>
        {/* Payment Filter */}
        <div className="col-md-3 position-relative">
          <select
            name="paymentStatus"
            value={filters.paymentStatus}
            onChange={handleFilterChange}
            className="form-select ps-5"
          >
            <option value="">All Payments</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Cancel">Cancel</option>
          </select>
          <FaCreditCard className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
        </div>
        {/* Order Status Filter */}
        <div className="col-md-3 position-relative">
          <select
            name="orderStatus"
            value={filters.orderStatus}
            onChange={handleFilterChange}
            className="form-select ps-5"
          >
            <option value="">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Cancel">Cancel</option>
          </select>
          <FaFlag className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle text-nowrap">
          <thead className="table-light">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Order Date</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.total}</td>
                  <td>
                    <span
                      className={`badge ${
                        statusStyles[order.paymentStatus] ||
                        "bg-light text-dark"
                      } w-100 text-center`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        statusStyles[order.orderStatus] || "bg-light text-dark"
                      } w-100 text-center`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>
                    <div>
                      <button
                        className="btn btn-sm btn-primary px-3 mx-1"
                        onClick={() => handleView(order)}
                      >
                        <FaEye className="mb-1" /> View
                      </button>
                      <button className="btn btn-sm btn-danger px-3 mx-1">
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
        updateOrderStatus={updateOrderStatus}
      />
    </div>
  );
}
