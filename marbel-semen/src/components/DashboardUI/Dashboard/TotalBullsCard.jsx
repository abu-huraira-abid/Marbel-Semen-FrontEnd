// src/components/DashboardUI/TotalBullsCard.jsx
import { GiBull } from "react-icons/gi";
import "../../../assets/styles/Dashboard.css"

export default function TotalBullsCard() {
  return (
    <div className="card text-center bg-white shadow-lg rounded-3 border-0 fixed-height">
      <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
        {/* Bull Icon */}
        <div className="fs-1 text-danger mb-3">
          <GiBull size={70} /> {/* Strong bull icon */}
        </div>

        {/* Card Text */}
        <div className="text-center">
          <h5 className="card-subtitle mb-2 text-muted">Total Bulls</h5>
          <h3 className="fw-bold text-dark">120</h3>
        </div>
      </div>
    </div>
  );
}
