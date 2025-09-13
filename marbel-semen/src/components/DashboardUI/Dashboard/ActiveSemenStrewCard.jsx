// src/components/DashboardUI/ActiveSemenStrawsCard.jsx
import { FaFlask } from "react-icons/fa";
import "../../../assets/styles/Dashboard.css"

export default function ActiveSemenStrawsCard() {
  return (
    <div className="card text-center bg-white shadow-lg rounded-3 border-0 fixed-height">
      <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
        {/* Flask Icon */}
        <div className="fs-1 text-success mb-3">
          <FaFlask size={60} /> {/* Flask icon for semen straws */}
        </div>

        {/* Card Text */}
        <div className="text-center">
          <h5 className="card-subtitle mb-2 text-muted">Active Semen Straws</h5>
          <h3 className="fw-bold text-dark">450</h3>
        </div>
      </div>
    </div>
  );
}
