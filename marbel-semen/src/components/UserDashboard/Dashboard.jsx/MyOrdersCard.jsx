    import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MyOrdersCard() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/orders/by-email/?email=${localStorage.getItem("userEmail")}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCount(response.data.count);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="card text-center bg-white shadow-lg rounded-3 border-0 fixed-height">
      <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
        <div className="fs-1 text-primary mb-3">
          <FaShoppingCart size={60} />
        </div>
        <h5 className="card-subtitle mb-2 text-muted">My Orders</h5>
        <h3 className="fw-bold text-dark">{count}</h3>
      </div>
    </div>
  );
}
