import { useState, useEffect } from "react";
import { FaEye, FaSearch } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import OrderReceipt from "../OrderManagement/OrderReceipt";

const statusStyles = {
  completed: "bg-success text-white",
  pending: "bg-warning text-dark",
  processing: "bg-info text-white",
  cancelled: "bg-danger text-white",
};

export default function OrderTable({ filterStatus, filterMonth, filterYear }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/orders/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(Array.isArray(res.data?.results) ? res.data.results : res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      Swal.fire("Error", "Failed to load orders", "error");
    } finally {
      setLoading(false);
    }
  };

  // Local filters
  const filteredOrders = orders
    .filter((o) => {
      if (filterStatus && o.status?.toLowerCase() !== filterStatus.toLowerCase())
        return false;

      if (filterMonth || filterYear) {
        const orderDate = new Date(o.created_at);
        const orderMonth = orderDate.getMonth() + 1;
        const orderYear = orderDate.getFullYear();
        if (filterMonth && orderMonth !== Number(filterMonth)) return false;
        if (filterYear && orderYear !== Number(filterYear)) return false;
      }

      if (search && !o.product_name?.toLowerCase().includes(search.toLowerCase()))
        return false;

      return true;
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div className="container border rounded bg-white p-3 shadow-sm">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-3 mb-md-0" style={{ fontFamily: "Syne" }}>
          Orders
        </h3>
      </div>

      {/* Search Bar */}
      <div className="mb-3 position-relative col-12 col-lg-4">
        <input
          type="text"
          className="form-control ps-5"
          placeholder="Search Product Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle text-nowrap">
          <thead className="table-light">
            <tr>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Customer Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  <div className="spinner-border text-primary"></div>
                </td>
              </tr>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.product_name}</td>
                  <td>{order.name}</td>
                  <td>{order.quantity}</td>
                  <td>${order.unit_price}</td>
                  <td>${order.total_price}</td>
                  <td>
                    <span
                      className={`badge d-block w-100 py-2 ${
                        statusStyles[order.status?.toLowerCase()] || "bg-secondary"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary px-3"
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowModal(true);
                      }}
                    >
                      <FaEye className="me-1" /> View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted py-3">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <OrderReceipt
        show={showModal}
        handleClose={() => setShowModal(false)}
        order={selectedOrder}
      />
    </div>
  );
}
