import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BullCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {}; // bull id from state
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [bull, setBull] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/bulls/${id}/`)
        .then((res) => {
          setBull(res.data.data);
        })
        .catch((err) => console.error("Error fetching bull:", err))
        .finally(() => setLoading(false));
    }
  }, [id, BASE_URL]);

  if (loading) {
    return (
      <div className="container text-center my-5">
        <h4>Loading Bull Details...</h4>
      </div>
    );
  }

  if (!bull) {
    return (
      <div className="container text-center my-5">
        <h4>No bull found</h4>
      </div>
    );
  }

  return (
    <div
      className="container-fluid bg-light py-5"
      style={{ fontFamily: "Poppins" }}
    >
      <div className="container">
        <div className="row">
          {/* Bull Image */}
          <div className="col-12 col-lg-6">
            <img
              src={bull.image || "https://via.placeholder.com/500"}
              alt={bull.name}
              className="img-fluid rounded-3"
            />
          </div>

          {/* Bull Details */}
          <div className="col-12 col-lg-6 d-flex flex-column justify-content-center mt-4 mt-lg-0">
            <div
              className="display-5 fw-light"
              style={{ fontFamily: "Syne" }}
            >
              {bull.name}
            </div>

            <div className="my-2 fs-5">
              <span className="fs-3 text-success">Breed: </span>
              {bull.breed}
            </div>

            <div className="my-2 fs-5">
              <span className="fs-3 text-primary">Price Packages: </span>
              {bull.price_packages && bull.price_packages.length > 0 ? (
                bull.price_packages.map((p, i) => (
                  <div className="mx-5" key={p.id}>
                    <strong>
                      {p.min_units} - {p.max_units || "∞"}
                    </strong>{" "}
                    : ${p.price_per_unit}
                  </div>
                ))
              ) : (
                <span className="text-muted">No price packages available</span>
              )}
            </div>

            <div className="my-2 fs-5 text-danger">
              REG # {bull.registration_id || "N/A"}
            </div>

            <button
              className="btn btn-success btn-lg rounded-1 my-2 w-50"
              onClick={() => navigate("/add-cart", { state: { id: id } })}
            >
              <i className="bi bi-cart-plus me-1"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
