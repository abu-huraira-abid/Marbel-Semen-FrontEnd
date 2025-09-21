import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [cart, setCart] = useState([]);
  const [bulls, setBulls] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  // ✅ Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // ✅ Fetch bull details for cart items
  useEffect(() => {
    const fetchBulls = async () => {
      try {
        if (cart.length === 0) {
          setBulls([]);
          setLoading(false);
          return;
        }

        const responses = await Promise.all(
          cart.map((item) => axios.get(`${BASE_URL}/bulls/${item.id}/`))
        );

        const bullData = responses.map((res, i) => ({
          ...res.data.data,
          qty: cart[i].qty,
        }));

        setBulls(bullData);
      } catch (err) {
        console.error("Error fetching cart bulls:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBulls();
  }, [cart, BASE_URL]);

  // ✅ Update qty
  const updateQuantity = (id, qty) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, qty } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setBulls((prev) =>
      prev.map((b) => (b.id === id ? { ...b, qty } : b))
    );
  };

  // ✅ Remove item
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setBulls((prev) => prev.filter((b) => b.id !== id));
  };

  const getPricePerUnit = (bull, qty) => {
  if (!bull.price_packages || bull.price_packages.length === 0) return 0;

  // Find matching package
  const pkg = bull.price_packages.find(
    (p) => qty >= p.min_units && qty <= p.max_units
  );

  if (pkg) return parseFloat(pkg.price_per_unit);

  // If quantity is greater than last package max → use last package price
  const lastPkg = bull.price_packages.reduce((max, p) =>
    p.max_units > max.max_units ? p : max
  );

  return parseFloat(lastPkg.price_per_unit);
};



  const calculateSubtotal = (bull) => {
    const pricePerUnit = getPricePerUnit(bull, bull.qty);
    return pricePerUnit * bull.qty;
  };

  const total = bulls.reduce((sum, bull) => sum + calculateSubtotal(bull), 0);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (bulls.length === 0) {
    return (
      <div className="text-center py-5">
        <h3>Your cart is empty 🛒</h3>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ fontFamily: "Poppins" }}>
      <h2 className="mb-4">Your Cart</h2>

      <div className="table-responsive">
        <table className="table align-middle shadow-sm border">
          <thead className="table-dark">
            <tr>
              <th scope="col">Bull</th>
              <th scope="col">Breed</th>
              <th scope="col" className="text-center">Quantity</th>
              <th scope="col" className="text-center">Price/Unit</th>
              <th scope="col" className="text-center">Subtotal</th>
              <th scope="col" className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {bulls.map((bull) => (
              <tr key={bull.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={bull.image}
                      alt={bull.name}
                      className="rounded me-3"
                      style={{ width: "80px", height: "60px", objectFit: "cover" }}
                    />
                    <div className="text-nowrap">
                      <strong>{bull.name}</strong>
                      <div className="text-muted small">Reg: {bull.registration_id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="text-nowrap">
                    {bull.breed}
                  </div>
                </td>
                <td className="text-center" style={{ width: "150px" }}>
                  <input
                    type="number"
                    min="1"
                    value={bull.qty}
                    onChange={(e) =>
                      updateQuantity(bull.id, Number(e.target.value))
                    }
                    className="form-control text-center"
                  />
                </td>
                <td className="text-center">
                  ${getPricePerUnit(bull, bull.qty).toFixed(2)}
                </td>
                <td className="text-center">
                  ${calculateSubtotal(bull).toFixed(2)}
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeItem(bull.id)}
                  >
                    <i className="bi bi-trash"></i> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Cart Summary */}
      <div className="d-flex justify-content-end mt-4">
        <div className="card shadow-sm" style={{ minWidth: "300px" }}>
          <div className="card-body">
            <h5 className="card-title">Cart Summary</h5>
            <p className="mb-2">Total Items: {bulls.length}</p>
            <h4 className="text-success">Total: ${total.toFixed(2)}</h4>
            <button className="btn btn-primary w-100 mt-3" onClick={()=> navigate("/checkout")}>
              <i className="bi bi-credit-card me-1"></i> Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
