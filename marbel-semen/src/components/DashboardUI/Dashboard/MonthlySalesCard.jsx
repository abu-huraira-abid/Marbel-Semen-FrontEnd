
// src/components/DashboardUI/MonthlySalesCard.jsx
import { FaChartLine } from "react-icons/fa";
import "../../../assets/styles/Dashboard.css";

export default function MonthlySalesCard() {
  return (
    <div className="card text-center bg-white shadow-lg rounded-3 border-0 fixed-height">
      <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
        {/* Sales Icon */}
        <div className="fs-1 text-primary mb-3">
          <FaChartLine size={60} /> {/* Sales chart icon */}
        </div>

        {/* Card Text */}
        <div className="text-center">
          <h5 className="card-subtitle mb-2 text-muted">Monthly Sales</h5>
          <h3 className="fw-bold text-dark">$12,500</h3>
        </div>
      </div>
    </div>
  );
}
