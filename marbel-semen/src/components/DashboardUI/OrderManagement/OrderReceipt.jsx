import React, { useState, useEffect } from "react";
import { FaTimes, FaSave } from "react-icons/fa"; // Icons for buttons

const statusOptions = ["Pending", "Processing", "Completed", "Cancelled"];

export default function OrderReceipt({
  show,
  handleClose,
  order,
  updateOrderStatus,
}) {
  const [status, setStatus] = useState(order?.orderStatus || "");

  useEffect(() => {
    setStatus(order?.orderStatus || "");
  }, [order]);

  if (!order) return null;

  // Handle modal close by clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
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
            <h5 className="modal-title">Order Details - {order.id}</h5>
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
              <p>
                <strong>Name:</strong> {order.customer}
              </p>
              <p>
                <strong>Contact:</strong> {order.contact || "N/A"}
              </p>
              <p>
                <strong>Address:</strong> {order.address || "N/A"}
              </p>
            </div>

            {/* Ordered Items */}
            <div className="mb-4">
              <h5>Ordered Items</h5>
              <table className="table table-striped table-bordered table-sm">
                <thead>
                  <tr>
                    <th>Bull Name</th>
                    <th>Semen Batch</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.bullName}</td>
                        <td>{item.batch}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center text-muted">
                        No items found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Total & Taxes */}
            <div className="mb-4">
              <h5>Order Summary</h5>
              <p>
                <strong>Total:</strong> {order.total}
              </p>
              <p>
                <strong>Taxes:</strong> {order.taxes || "$0.00"}
              </p>
            </div>

            {/* Update Status */}
            <div className="mb-4">
              <label className="form-label">Update Order Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
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
            <button
              className="btn btn-success"
              onClick={() => {
                updateOrderStatus(order.id, status);
                handleClose();
              }}
            >
              <FaSave className="me-2" /> Save Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
