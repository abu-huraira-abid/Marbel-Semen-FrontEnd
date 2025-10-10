import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";

export default function CompletedOrdersCard() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const email = localStorage.getItem("userEmail");

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/orders/by-email/?email=${email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const completedOrders = response.data.data.filter(
          (order) => order.status.toLowerCase() === "complete"
        );

        setCount(completedOrders.length);
      } catch (error) {
        console.error("Error fetching completed orders:", error);
      }
    };

    fetchCompletedOrders();
  }, []);

  return (
    <div className="card text-center bg-white shadow-lg rounded-3 border-0 fixed-height">
      <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
        <div className="fs-1 text-success mb-3">
          <FaCheckCircle size={60} />
        </div>
        <h5 className="card-subtitle mb-2 text-muted">Completed Orders</h5>
        <h3 className="fw-bold text-dark">{count}</h3>
      </div>
    </div>
  );
}
