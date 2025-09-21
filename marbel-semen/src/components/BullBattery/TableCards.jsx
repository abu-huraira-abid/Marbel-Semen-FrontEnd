import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TableCards() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [bulls, setBulls] = useState([]);
  const [packages, setPackages] = useState({}); // store price packages keyed by bull id
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Responsive items per page
  const itemsPerPage = window.innerWidth >= 992 ? 6 : 3;

  // Fetch bulls
  useEffect(() => {
    const fetchBulls = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/bulls/`);
        console.log("Bulls API response:", res.data);

        const data = res.data.results?.data || res.data.results || res.data;
        setBulls(data);
      } catch (err) {
        console.error("Error fetching bulls:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBulls();
  }, [BASE_URL]);

  // Fetch price packages for a specific bull (lazy load)
  const fetchPackages = async (bullId) => {
    if (packages[bullId]) return; // already fetched

    try {
      const res = await axios.get(`${BASE_URL}/bulls/${bullId}/price-packages/`);
      setPackages((prev) => ({ ...prev, [bullId]: res.data.results }));
    } catch (err) {
      console.error(`Error fetching price packages for bull ${bullId}:`, err);
      setPackages((prev) => ({ ...prev, [bullId]: [] }));
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <h4>Loading bulls...</h4>
      </div>
    );
  }

  const totalPages = Math.ceil(bulls.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBulls = bulls.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container-fluid bg-light d-flex align-items-center justify-content-center">
      <div className="container px-0 mx-0 mx-lg-4 py-5">
        <h2 className="text-center mb-4">Our Bulls</h2>
        <div className="row" style={{ fontFamily: "Poppins" }}>
          {currentBulls.map((bull, idx) => {
            const bullPackages = packages[bull.id];

            // Trigger fetch when rendering this bull
            if (!bullPackages) fetchPackages(bull.id);

            return (
              <div className="col-12 col-lg-4 mb-4" key={idx}>
                <div className="card flex-column translate-card shadow-sm h-100">
                  <img
                    src={bull.image || "https://via.placeholder.com/400"}
                    className="card-img-left col-12"
                    alt={bull.name}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5>
                        {bull.name} - {bull.registration_id}
                      </h5>
                      <ul className="list-unstyled mb-3">
                        <h5>Price:</h5>
                        {bullPackages ? (
                          bullPackages.length > 0 ? (
                            bullPackages.map((p) => (
                              <li key={p.id} className="mx-3">
                                <strong>
                                  {p.min_units} - {p.max_units}:
                                </strong>{" "}
                                ${p.price_per_unit}
                              </li>
                            ))
                          ) : (
                            <li className="mx-3">No price packages</li>
                          )
                        ) : (
                          <li className="mx-3">Loading...</li>
                        )}
                      </ul>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-primary btn-sm py-2 flex-fill rounded-1"
                        onClick={() =>
                          navigate("/view-stat", { state: { id: bull.id } })
                        }
                      >
                        <i className="bi bi-bar-chart-line me-1"></i> View Stats
                      </button>
                      <button
                        className="btn btn-success btn-sm flex-fill rounded-1"
                        onClick={() =>
                          navigate("/add-cart", { state: { id: bull.id } })
                        }
                      >
                        <i className="bi bi-cart-plus me-1"></i> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center gap-2 mt-3">
          <button
            className="btn btn-dark rounded-1"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="align-self-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-dark rounded-1"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
