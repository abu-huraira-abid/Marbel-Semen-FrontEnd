import React, { useState, useEffect } from "react";
import { FaTimes, FaSave } from "react-icons/fa";
import axios from "axios";

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export default function OrderReceipt({ show, handleClose, order,forceReducer }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [status, setStatus] = useState(order?.status || "");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  useEffect(() => {
    setStatus(order?.status || "");
  }, [order]);

  if (!order) return null;

  // Handle modal close by clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  // 🔥 Update status API call
  const handleSaveStatus = async () => {
    try {
      await axios.patch(`${BASE_URL}/bulls/orders/${order.id}/`, { status });
      forceReducer()
      setAlert({
        show: true,
        type: "success",
        message: "✅ Order status updated successfully!",
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      setAlert({
        show: true,
        type: "danger",
        message: "❌ Failed to update order status!",
      });
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
            <h5 className="modal-title">Order Details - #{order.id}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            />
          </div>

          {/* Body */}
          <div className="modal-body">
            {/* Bootstrap Alert */}
            {alert.show && (
              <div
                className={`alert alert-${alert.type} alert-dismissible fade show`}
                role="alert"
              >
                {alert.message}
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setAlert({ show: false, type: "", message: "" })}
                ></button>
              </div>
            )}

            {/* Customer Info */}
            <div className="mb-4">
              <h5>Customer Info</h5>
              <p>
                <strong>Name:</strong> {order.name}
              </p>
              <p>
                <strong>Email:</strong> {order.email}
              </p>
              <p>
                <strong>Phone:</strong> {order.phone}
              </p>
              <p>
                <strong>Address:</strong> {order.address || "N/A"}
              </p>
            </div>

            {/* Bull Info */}
            <div className="mb-4">
              <h5>Bull Info</h5>
              <p>
                <strong>Bull Name:</strong> {order.bull_name}
              </p>
              <p>
                <strong>Bull ID:</strong> {order.bull}
              </p>
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

            {/* Update Status */}
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
            <button className="btn btn-secondary" onClick={handleClose}>
              <FaTimes className="me-2" /> Close
            </button>
            <button className="btn btn-success" onClick={handleSaveStatus}>
              <FaSave className="me-2" /> Save Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
