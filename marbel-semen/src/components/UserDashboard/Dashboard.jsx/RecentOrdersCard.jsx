import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import axios from "axios";

export default function RecentOrdersCard() {
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const email = localStorage.getItem("userEmail");
        if (!email) {
          console.warn("No user email found in localStorage");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/orders/by-email/?email=${email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // ✅ Count only pending orders
        const pendingOrders = response.data.data.filter(
          (order) => order.status === "pending"
        );

        setPendingCount(pendingOrders.length);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="card text-center bg-white shadow-lg rounded-3 border-0 fixed-height">
      <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
        {/* Icon */}
        <div className="fs-1 text-warning mb-3">
          <FaClock size={60} />
        </div>

        {/* Card Content */}
        <h5 className="card-subtitle mb-2 text-muted">Pending Orders</h5>
        <h3 className="fw-bold text-dark">{pendingCount}</h3>
      </div>
    </div>
  );
}
