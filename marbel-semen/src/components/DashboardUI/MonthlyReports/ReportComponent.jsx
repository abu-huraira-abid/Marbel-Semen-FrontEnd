import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaChartBar,
  FaClipboardList,
  FaCheckCircle,
  FaSpinner,
  FaTimesCircle,
  FaArrowLeft,
} from "react-icons/fa";
import OrderTable from "./OrderTable";

export default function ReportComponent() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    fetchReport();
  }, [month, year]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/reports/monthly/`, {
        params: { year, month },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setReport(response.data);
    } catch (error) {
      console.error("Error fetching monthly report:", error);
    } finally {
      setLoading(false);
    }
  };

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const handleCardClick = (status) => {
    setSelectedStatus(status);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedStatus("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Inline styles for hover animation
  const cardBaseStyle = {
    transition: "all 0.3s ease",
    cursor: "pointer",
    transform: "translateY(0)",
  };

  const hoverEffect = (e, bgColor, textColor) => {
    e.currentTarget.style.backgroundColor = "#fff";
    e.currentTarget.style.color = bgColor;
    e.currentTarget.style.transform = "translateY(-6px)";
    e.currentTarget.style.boxShadow = `0 8px 20px rgba(0,0,0,0.15)`;
  };

  const removeHover = (e, bgColor, textColor) => {
    e.currentTarget.style.backgroundColor = bgColor;
    e.currentTarget.style.color = textColor;
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div className="container py-3">
      {/* Filters */}
      <div className="row mb-4 align-items-center">
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            {months.map((m, index) => (
              <option key={index + 1} value={index + 1}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <input
            type="number"
            className="form-control"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            min="2000"
            max={new Date().getFullYear()}
          />
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">Loading monthly report...</p>
        </div>
      )}

      {/* Report Cards */}
      {!loading && report && !selectedStatus && (
        <div className="row g-4">
          {/* Total Orders */}
          <div className="col-md-4">
            <div
              className="card border-0 shadow-lg text-center p-3 rounded-4 bg-primary text-white"
              style={cardBaseStyle}
              onClick={() => handleCardClick("")}
              onMouseEnter={(e) => hoverEffect(e, "#0d6efd", "#fff")}
              onMouseLeave={(e) => removeHover(e, "#0d6efd", "#fff")}
            >
              <FaClipboardList size={30} className="mb-2" />
              <h5>Total Orders</h5>
              <h3>{report.total_orders}</h3>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="col-md-4">
            <div
              className="card border-0 shadow-lg text-center p-3 rounded-4 bg-success text-white"
              style={cardBaseStyle}
              onMouseEnter={(e) => hoverEffect(e, "#198754", "#fff")}
              onMouseLeave={(e) => removeHover(e, "#198754", "#fff")}
            >
              <FaChartBar size={30} className="mb-2" />
              <h5>Total Revenue</h5>
              <h3>${report.total_revenue}</h3>
            </div>
          </div>

          {/* Pending */}
          <div className="col-md-4">
            <div
              className="card border-0 shadow-lg text-center p-3 rounded-4 bg-warning text-dark"
              style={cardBaseStyle}
              onClick={() => handleCardClick("pending")}
              onMouseEnter={(e) => hoverEffect(e, "#ffc107", "#212529")}
              onMouseLeave={(e) => removeHover(e, "#ffc107", "#212529")}
            >
              <FaSpinner size={30} className="mb-2" />
              <h5>Pending Orders</h5>
              <h3>{report.pending_orders}</h3>
            </div>
          </div>

          {/* Processing */}
          <div className="col-md-4">
            <div
              className="card border-0 shadow-lg text-center p-3 rounded-4 bg-info text-white"
              style={cardBaseStyle}
              onClick={() => handleCardClick("processing")}
              onMouseEnter={(e) => hoverEffect(e, "#0dcaf0", "#fff")}
              onMouseLeave={(e) => removeHover(e, "#0dcaf0", "#fff")}
            >
              <FaCheckCircle size={30} className="mb-2" />
              <h5>Processing Orders</h5>
              <h3>{report.processing_orders}</h3>
            </div>
          </div>

          {/* Completed */}
          <div className="col-md-4">
            <div
              className="card border-0 shadow-lg text-center p-3 rounded-4 bg-success text-white"
              style={cardBaseStyle}
              onClick={() => handleCardClick("completed")}
              onMouseEnter={(e) => hoverEffect(e, "#198754", "#fff")}
              onMouseLeave={(e) => removeHover(e, "#198754", "#fff")}
            >
              <FaCheckCircle size={30} className="mb-2" />
              <h5>Completed Orders</h5>
              <h3>{report.completed_orders}</h3>
            </div>
          </div>

          {/* Cancelled */}
          <div className="col-md-4">
            <div
              className="card border-0 shadow-lg text-center p-3 rounded-4 bg-danger text-white"
              style={cardBaseStyle}
              onClick={() => handleCardClick("cancelled")}
              onMouseEnter={(e) => hoverEffect(e, "#dc3545", "#fff")}
              onMouseLeave={(e) => removeHover(e, "#dc3545", "#fff")}
            >
              <FaTimesCircle size={30} className="mb-2" />
              <h5>Cancelled Orders</h5>
              <h3>{report.cancelled_orders}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Filtered Orders Table */}
      {!loading && selectedStatus && (
        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold text-capitalize mb-0">
              {months[month - 1]} {year} — {selectedStatus} Orders
            </h4>
            <button className="btn btn-dark" onClick={handleBack}>
              <FaArrowLeft className="me-1" /> Back to Summary
            </button>
          </div>

          <OrderTable
            filterStatus={selectedStatus}
            filterMonth={month}
            filterYear={year}
          />
        </div>
      )}
    </div>
  );
}
