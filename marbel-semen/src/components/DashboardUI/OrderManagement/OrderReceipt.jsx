import React, { useState, useEffect } from "react";
import { FaTimes, FaSave } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export default function OrderReceipt({ show, handleClose, order, forceReducer }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("access_token");

  const [status, setStatus] = useState(order?.status || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStatus(order?.status || "");
  }, [order]);

  if (!order) return null;

  // ✅ Show SweetAlert popups
  const showAlert = (type, message) => {
    const config = {
      title:
        type === "success"
          ? "Success"
          : type === "error"
          ? "Error"
          : "Info",
      text: message,
      icon: type,
      confirmButtonColor: type === "success" ? "#198754" : "#dc3545",
      timer: 2500,
      showConfirmButton: false,
    };
    Swal.fire(config);
  };

  // ✅ Close modal when clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  // ✅ Update order status via API
  const handleSaveStatus = async () => {
    try {
      setLoading(true);
      await axios.patch(
        `${BASE_URL}/bulls/orders/${order.id}/`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      forceReducer();
      showAlert("success", "Order status updated successfully!");
    } catch (error) {
      console.error("Error updating order status:", error);
      showAlert("error", "Failed to update order status!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{ backgroundColor: show ? "rgba(0,0,0,0.5)" : "transparent" }}
      onClick={handleBackdropClick}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title" style={{ fontFamily: "Syne" }}>
              Order Details - #{order.id}
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            />
          </div>

          {/* Body */}
          <div className="modal-body">
            {/* Customer Info */}
            <div className="mb-4">
              <h5>Customer Info</h5>
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Address:</strong> {order.address || "N/A"}</p>
            </div>

            {/* Bull Info */}
            <div className="mb-4">
              <h5>Bull Info</h5>
              <p><strong>Bull Name:</strong> {order.bull_name}</p>
              <p><strong>Bull ID:</strong> {order.bull}</p>
            </div>

            {/* Order Summary */}
            <div className="mb-4">
              <h5>Order Summary</h5>
              <table className="table table-striped table-bordered table-sm">
                <thead>
                  <tr>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{order.quantity}</td>
                    <td>${order.unit_price}</td>
                    <td>${order.total_price}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Status Update */}
            <div className="mb-3">
              <label className="form-label fw-bold">Update Order Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={loading}
            >
              <FaTimes className="me-2" /> Close
            </button>
            <button
              className="btn btn-success"
              onClick={handleSaveStatus}
              disabled={loading}
            >
              <FaSave className="me-2" />
              {loading ? "Saving..." : "Save Status"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
