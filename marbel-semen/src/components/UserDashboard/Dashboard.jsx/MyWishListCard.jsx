import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MyWishlistCard() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchWishlistCount = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/wishlist/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // console.log(response.data)
        setCount(response.data.count);
      } catch (error) {
        console.error("Error fetching wishlist count:", error);
      }
    };
    fetchWishlistCount();
  }, []);

  return (
    <div className="card text-center bg-white shadow-lg rounded-3 border-0 fixed-height">
      <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
        <div className="fs-1 text-danger mb-3">
          <FaHeart size={60} />
        </div>
        <h5 className="card-subtitle mb-2 text-muted">My Wishlist</h5>
        <h3 className="fw-bold text-dark">{count}</h3>
      </div>
    </div>
  );
}
