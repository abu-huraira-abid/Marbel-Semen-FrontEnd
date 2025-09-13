// src/components/DashboardUI/LowStockAlertsCard.jsx
import { FaExclamationTriangle } from "react-icons/fa";
import "../../../assets/styles/Dashboard.css";

export default function LowStockAlertsCard() {
  return (
    <div className="card text-center bg-white shadow-lg rounded-3 border-0 fixed-height">
      <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
        {/* Warning Icon */}
        <div className="fs-1 text-warning mb-3">
          <FaExclamationTriangle size={70} /> {/* Alert icon */}
        </div>

        {/* Card Text */}
        <div className="text-center">
          <h5 className="card-subtitle mb-2 text-muted">Low Stock Alerts</h5>
          <h3 className="fw-bold text-dark">8</h3>
        </div>
      </div>
    </div>
  );
}
