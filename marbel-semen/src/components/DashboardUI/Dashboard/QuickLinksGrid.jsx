// src/components/DashboardUI/QuickLinksGrid.jsx
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaFlask, FaChartBar, FaShoppingCart } from "react-icons/fa";

export default function QuickLinksGrid() {
  const navigate = useNavigate()
  return (
    <div className="bg-light border-0 my-5">
      <div className="card-body">
        <h3 className="card-title mb-4 fw-bold">Quick Links</h3>

        <div className="row g-3">
          {/* Add Bull */}
          <div className="col-6 col-md-3">
            <div className="card quick-link-card text-center shadow-lg bg-primary text-white border-0 h-100">
              <div className="card-body d-flex flex-column align-items-center justify-content-center" onClick={()=> navigate("/account/bulls")}>
                <FaPlusCircle size={40} className="text-white mb-2" />
                <h6 className="fw-semibold">Add Bull</h6>
              </div>
            </div>
          </div>

          {/* Add Semen Batch */}
          <div className="col-6 col-md-3">
            <div className="card quick-link-card text-center shadow-lg bg-success text-white border-0 h-100">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <FaFlask size={40} className=" mb-2" />
                <h6 className="fw-semibold">Add Semen Batch</h6>
              </div>
            </div>
          </div>

          {/* Generate Report */}
          <div className="col-6 col-md-3">
            <div className="card quick-link-card text-center bg-warning text-white shadow-lg border-0 h-100">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <FaChartBar size={40} className=" mb-2" />
                <h6 className="fw-semibold">Generate Report</h6>
              </div>
            </div>
          </div>

          {/* Sales Overview */}
          <div className="col-6 col-md-3">
            <div className="card quick-link-card text-center text-white bg-danger shadow-lg border-0 h-100">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <FaShoppingCart size={40} className="mb-2" />
                <h6 className="fw-semibold">Sales Overview</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
