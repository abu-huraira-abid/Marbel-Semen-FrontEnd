import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [bulls, setBulls] = useState([]);
  const [embryos, setEmbryos] = useState([]);
  const [semens, setSemens] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Fetch details for all items from API
  useEffect(() => {
    const fetchItems = async () => {
      if (cart.length === 0) {
        setBulls([]);
        setEmbryos([]);
        setSemens([]);
        setLoading(false);
        return;
      }

      const bullItems = cart.filter((item) => item.item_type === "bull");
      const embryoItems = cart.filter((item) => item.item_type === "embryo");
      const semenItems = cart.filter((item) => item.item_type === "semen");

      try {
        const [bullResponses, embryoResponses, semenResponses] =
          await Promise.all([
            Promise.all(
              bullItems.map((item) =>
                axios.get(`${BASE_URL}/bulls/${item.id}/`)
              )
            ),
            Promise.all(
              embryoItems.map((item) =>
                axios.get(`${BASE_URL}/embryos/${item.id}/`)
              )
            ),
            Promise.all(
              semenItems.map((item) =>
                axios.get(`${BASE_URL}/semens/${item.id}/`)
              )
            ),
          ]);

        // console.log("Semen API Responses:", semenResponses.map(res => res.data));

        setBulls(
          bullResponses.map((res, i) => ({
            ...res.data.data,
            qty: bullItems[i].qty,
            item_type: "bull",
            price_packages: bullItems[i].price_packages || [],
          }))
        );

        setEmbryos(
          embryoResponses.map((res, i) => ({
            ...res.data,
            qty: embryoItems[i].qty,
            item_type: "embryo",
            price_packages: embryoItems[i].price_packages || [],
          }))
        );

        setSemens(
          semenResponses.map((res, i) => ({
            ...res.data,
            qty: semenItems[i].qty,
            item_type: "semen",
            price_packages: semenItems[i].price_packages || [],
          }))
        );
      } catch (err) {
        console.error("Error fetching cart items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [cart, BASE_URL]);

  const updateQuantity = (id, qty, type) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.item_type === type ? { ...item, qty } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    if (type === "bull")
      setBulls((prev) => prev.map((b) => (b.id === id ? { ...b, qty } : b)));
    if (type === "embryo")
      setEmbryos((prev) => prev.map((b) => (b.id === id ? { ...b, qty } : b)));
    if (type === "semen")
      setSemens((prev) => prev.map((b) => (b.id === id ? { ...b, qty } : b)));
  };

  const removeItem = (id, type) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === id && item.item_type === type)
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    if (type === "bull") setBulls((prev) => prev.filter((b) => b.id !== id));
    if (type === "embryo")
      setEmbryos((prev) => prev.filter((b) => b.id !== id));
    if (type === "semen") setSemens((prev) => prev.filter((b) => b.id !== id));
  };

  // ✅ Price calculation uses price_packages from localStorage
  const getPricePerUnit = (item, qty) => {
    if (!item.price_packages || item.price_packages.length === 0) return 0;

    const pkg = item.price_packages.find(
      (p) => qty >= p.min_units && qty <= p.max_units
    );
    if (pkg) return parseFloat(pkg.price_per_unit);

    const lastPkg = item.price_packages.reduce((max, p) =>
      p.max_units > max.max_units ? p : max
    );
    return parseFloat(lastPkg.price_per_unit);
  };

  const calculateSubtotal = (item) =>
    getPricePerUnit(item, item.qty) * item.qty;

  const total = [...bulls, ...embryos, ...semens].reduce(
    (sum, item) => sum + calculateSubtotal(item),
    0
  );

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (bulls.length === 0 && embryos.length === 0 && semens.length === 0) {
    return (
      <div className="text-center py-5">
        <h3>Your cart is empty 🛒</h3>
        <button
          className="btn btn-primary mt-3 rounded-1 px-3"
          onClick={() => navigate("/order-history")}
        >
          View Order History
        </button>
      </div>
    );
  }

  const renderTable = (items, type) => {
    if (type === "semen") {
      return (
        <div className="table-responsive mb-5">
          <h4 className="mb-3 text-capitalize">Semens</h4>
          <table className="table align-middle shadow-sm border">
            <thead className="table-dark">
              <tr>
                <th scope="col">Batch</th>
                <th scope="col">Bull</th>
                <th scope="col">Code</th>
                <th scope="col">Collection Date</th>
                <th scope="col" className="text-center">
                  Quantity
                </th>
                <th scope="col" className="text-center">
                  Price/Unit
                </th>
                <th scope="col" className="text-center">
                  Subtotal
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.batch_number}</td>
                  <td>{item.bull_name || "N/A"}</td>
                  <td>{item.code || "N/A"}</td>
                  <td>{item.collection_date || "N/A"}</td>
                  <td className="text-center" style={{ width: "100px" }}>
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value), type)
                      }
                      className="form-control text-center"
                    />
                  </td>
                  <td className="text-center">
                    ${getPricePerUnit(item, item.qty).toFixed(2)}
                  </td>
                  <td className="text-center">
                    ${calculateSubtotal(item).toFixed(2)}
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeItem(item.id, type)}
                    >
                      <i className="bi bi-trash"></i> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      // existing table for bulls & embryos (with image & breed)
      return (
        <div className="table-responsive mb-5">
          <h4 className="mb-3 text-capitalize">{type}s</h4>
          <table className="table align-middle shadow-sm border">
            <thead className="table-dark">
              <tr>
                <th scope="col">{type}</th>
                <th scope="col">Breed</th>
                <th scope="col" className="text-center">
                  Quantity
                </th>
                <th scope="col" className="text-center">
                  Price/Unit
                </th>
                <th scope="col" className="text-center">
                  Subtotal
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="rounded me-3"
                        style={{
                          width: "80px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="text-nowrap">
                        <strong>{item.name}</strong>
                        {item.registration_id && (
                          <div className="text-muted small">
                            Reg: {item.registration_id}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>{item.breed || item.sire?.breed || item.dam?.breed}</td>
                  <td className="text-center" style={{ width: "150px" }}>
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value), type)
                      }
                      className="form-control text-center"
                    />
                  </td>
                  <td className="text-center">
                    ${getPricePerUnit(item, item.qty).toFixed(2)}
                  </td>
                  <td className="text-center">
                    ${calculateSubtotal(item).toFixed(2)}
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeItem(item.id, type)}
                    >
                      <i className="bi bi-trash"></i> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  return (
    <div className="container py-5" style={{ fontFamily: "Poppins" }}>
      <h2 className="mb-4">Your Cart</h2>

      {bulls.length > 0 && renderTable(bulls, "bull")}
      {embryos.length > 0 && renderTable(embryos, "embryo")}
      {semens.length > 0 && renderTable(semens, "semen")}

      {/* Cart Summary */}
      <div className="d-flex justify-content-end mt-4">
        <div className="card shadow-sm" style={{ minWidth: "300px" }}>
          <div className="card-body">
            <h5 className="card-title">Cart Summary</h5>
            <p className="mb-2">
              Total Items: {bulls.length + embryos.length + semens.length}
            </p>
            <h4 className="text-success">Total: ${total.toFixed(2)}</h4>

            <button
              className="btn btn-primary w-100 mt-3"
              onClick={() => navigate("/checkout")}
            >
              <i className="bi bi-credit-card me-1"></i> Checkout
            </button>

            <button
              className="btn btn-primary w-100 mt-2"
              onClick={() => navigate("/order-history")}
            >
              View Order History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
