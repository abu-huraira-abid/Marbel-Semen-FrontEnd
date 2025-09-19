// src/components/DashboardUI/TotalBullsCard.jsx
import { GiBull } from "react-icons/gi";
import "../../../assets/styles/Dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TotalBullsCard() {
  const [count, setCount] = useState(0);

  useEffect(() => {
  const fetchTotalBulls = async () => {
    try {
      const token = localStorage.getItem("access_token"); // or wherever you store it
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/bulls/total_count/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setCount(response.data.total_bulls);
      }
    } catch (error) {
      console.error("Error fetching total bulls:", error);
    }
  };

  fetchTotalBulls();
}, []);

  return (
    <div className="card text-center bg-white shadow-lg rounded-3 border-0 fixed-height">
      <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
        {/* Bull Icon */}
        <div className="fs-1 text-danger mb-3">
          <GiBull size={70} />
        </div>

        {/* Card Text */}
        <div className="text-center">
          <h5 className="card-subtitle mb-2 text-muted">Total Bulls</h5>
          <h3 className="fw-bold text-dark">{count}</h3>
        </div>
      </div>
    </div>
  );
}
