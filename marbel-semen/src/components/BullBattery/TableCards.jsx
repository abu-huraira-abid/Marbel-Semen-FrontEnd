import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TableCards() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [bulls, setBulls] = useState([]);
  const [filteredBulls, setFilteredBulls] = useState([]);
  const [packages, setPackages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [searchName, setSearchName] = useState("");
  const [searchBreed, setSearchBreed] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [priceFilterActive, setPriceFilterActive] = useState(false);

  const navigate = useNavigate();
  const itemsPerPage = window.innerWidth >= 992 ? 6 : 3;

  // ✅ 1. Fetch bulls only (no price packages)
  useEffect(() => {
    const fetchBulls = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/bulls/`);
        const data = res.data.results?.data || res.data.results || res.data;
        setBulls(data);
        setFilteredBulls(data);
      } catch (err) {
        console.error("Error fetching bulls:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBulls();
  }, [BASE_URL]);

  // ✅ 2. Fetch price packages lazily for each bull
  const fetchPackages = async (bullId) => {
    if (packages[bullId]) return; // already loaded
    try {
      const res = await axios.get(`${BASE_URL}/bulls/${bullId}/price-packages/`);
      console.log(res)
      const pkgData = res.data.results?.data || res.data.results || res.data;
      setPackages((prev) => ({ ...prev, [bullId]: pkgData }));

      // Update global price range automatically
      const allPrices = pkgData.map((p) => parseFloat(p.price_per_unit));
      if (allPrices.length > 0) {
        setPriceRange((prev) => [
          Math.min(prev[0], ...allPrices),
          Math.max(prev[1], ...allPrices),
        ]);
      }
    } catch (err) {
      console.error(`Error fetching packages for bull ${bullId}:`, err);
      setPackages((prev) => ({ ...prev, [bullId]: [] }));
    }
  };

  // ✅ 3. Filter logic (name, breed, and price)
  useEffect(() => {
    let result = [...bulls];

    if (searchName.trim()) {
      result = result.filter((bull) =>
        bull.name?.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchBreed.trim()) {
      result = result.filter((bull) =>
        bull.breed?.toLowerCase().includes(searchBreed.toLowerCase())
      );
    }

    if (priceFilterActive) {
      result = result.filter((bull) => {
        const bullPkgs = packages[bull.id];
        if (!bullPkgs || bullPkgs.length === 0) return false;
        const minPkgPrice = Math.min(...bullPkgs.map((p) => parseFloat(p.price_per_unit)));
        return minPkgPrice >= minPrice && minPkgPrice <= maxPrice;
      });
    }

    setFilteredBulls(result);
    setCurrentPage(1);
  }, [searchName, searchBreed, minPrice, maxPrice, priceFilterActive, bulls, packages]);

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <h5 className="mt-2">Loading bulls...</h5>
      </div>
    );

  const totalPages = Math.ceil(filteredBulls.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBulls = filteredBulls.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="container-fluid bg-light d-flex align-items-center justify-content-center">
      <div className="container px-0 mx-0 mx-lg-4 py-5" style={{ fontFamily: "Poppins" }}>
        <h2 className="text-center mb-4">Our Bulls</h2>

        {/* 🔍 Filters Section */}
        <div className="card shadow-sm p-3 mb-4">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label fw-bold">Search by Name</label>
              <input
                type="text"
                className="form-control rounded-1"
                placeholder="Enter bull name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Search by Breed</label>
              <input
                type="text"
                className="form-control rounded-1"
                placeholder="Enter breed name"
                value={searchBreed}
                onChange={(e) => setSearchBreed(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">
                Price Range (${minPrice} - ${maxPrice})
              </label>
              <div className="d-flex gap-2">
                <input
                  type="range"
                  min={priceRange[0]}
                  max={priceRange[1]}
                  value={minPrice}
                  onChange={(e) => {
                    setMinPrice(Number(e.target.value));
                    setPriceFilterActive(true);
                  }}
                  className="form-range"
                />
                <input
                  type="range"
                  min={priceRange[0]}
                  max={priceRange[1]}
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    setPriceFilterActive(true);
                  }}
                  className="form-range"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 🐂 Bulls Cards */}
        <div className="row">
          {currentBulls.length > 0 ? (
            currentBulls.map((bull) => {
              const bullPackages = packages[bull.id];
              if (!bullPackages) fetchPackages(bull.id); // lazy load

              return (
                <div className="col-12 col-lg-4 mb-4" key={bull.id}>
                  <div className="card flex-column shadow-sm h-100 translate-card">
                    <img
                      src={bull.image || "https://via.placeholder.com/400"}
                      className="card-img-top"
                      alt={bull.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="fw-semibold">{bull.name}</h5>
                        <p className="text-muted mb-2">{bull.breed}</p>
                        <ul className="list-unstyled mb-3">
                          <h6>Price:</h6>
                          {bullPackages ? (
                            bullPackages.length > 0 ? (
                              bullPackages.map((p) => (
                                <li key={p.id} className="mx-3">
                                  <strong>
                                    {p.min_units}-{p.max_units}:
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
            })
          ) : (
            <div className="text-center py-5">
              <h5>No bulls match your search or filters 🐃</h5>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredBulls.length > 0 && (
          <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
            <button
              className="btn btn-dark rounded-1"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="fw-medium">
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
        )}
      </div>
    </div>
  );
}
