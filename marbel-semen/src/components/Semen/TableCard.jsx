import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/styles/Semen.css";

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

  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const itemsPerPage = window.innerWidth >= 992 ? 6 : 3;

  // Animate on scroll
  useEffect(() => {
    const section = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) section.classList.add("animate-visible");
        });
      },
      { threshold: 0.3 }
    );
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Fetch bulls
  useEffect(() => {
    const fetchBulls = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/bulls/`);
        const data = res.data.results?.data || res.data.results || res.data;
        setBulls(data);
        setFilteredBulls(data);

        // Determine price range
        let allPrices = [];
        data.forEach((bull) =>
          bull.price_packages?.forEach((pkg) =>
            allPrices.push(parseFloat(pkg.price_per_unit))
          )
        );
        const min = Math.min(...allPrices, 0);
        const max = Math.max(...allPrices, 10000);
        setPriceRange([min, max]);
        setMinPrice(min);
        setMaxPrice(max);
      } catch (err) {
        console.error("Error fetching bulls:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBulls();
  }, [BASE_URL]);

  // Lazy fetch packages
  const fetchPackages = async (bullId) => {
    if (packages[bullId]) return;
    try {
      const res = await axios.get(
        `${BASE_URL}/bulls/${bullId}/price-packages/`
      );
      setPackages((prev) => ({ ...prev, [bullId]: res.data.results }));
    } catch (err) {
      console.error(`Error fetching packages for bull ${bullId}:`, err);
      setPackages((prev) => ({ ...prev, [bullId]: [] }));
    }
  };

  // Filter Logic
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
        const minPkgPrice = Math.min(
          ...bullPkgs.map((p) => parseFloat(p.price_per_unit))
        );
        return minPkgPrice >= minPrice && minPkgPrice <= maxPrice;
      });
    }

    setFilteredBulls(result);
    setCurrentPage(1);
  }, [
    searchName,
    searchBreed,
    minPrice,
    maxPrice,
    priceFilterActive,
    bulls,
    packages,
  ]);

  if (loading)
    return (
      <div className="text-center py-5 text-light">
        <div className="spinner-border text-warning" role="status"></div>
        <h5 className="mt-3">Loading bulls...</h5>
      </div>
    );

  const totalPages = Math.ceil(filteredBulls.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBulls = filteredBulls.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <section
      ref={sectionRef}
      className="premium-catalog py-5 position-relative overflow-hidden"
      style={{ backgroundColor: "#111" }}
    >
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <h2
          className="text-center fw-bold text-white mb-5 fade-up"
          style={{ fontFamily: "Syne", fontSize: "2.5rem" }}
        >
          Explore Our Premium Semens
        </h2>

        {/* Filters Section */}
        <div className="filters-container mb-5 fade-up-delay">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label text-light fw-semibold">
                Search by Name
              </label>
              <input
                type="text"
                className="form-control elegant-input"
                placeholder="Enter bull name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label text-light fw-semibold">
                Search by Breed
              </label>
              <input
                type="text"
                className="form-control elegant-input"
                placeholder="Enter breed"
                value={searchBreed}
                onChange={(e) => setSearchBreed(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label text-light fw-semibold">
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

        {/* Bulls Grid */}
        <div className="row g-4 justify-content-center fade-in-section">
          {currentBulls.length > 0 ? (
            currentBulls.map((bull) => {
              const bullPackages = packages[bull.id];
              if (!bullPackages) fetchPackages(bull.id);

              return (
                <div key={bull.id} className="col-12 col-md-6 col-lg-4">
                  <div className="elegant-card h-100 d-flex flex-column position-relative">
                    <img
                      src={bull.image || "https://via.placeholder.com/400"}
                      alt={bull.name}
                      className="rounded-3 card-img"
                      style={{ height: "250px", objectFit: "cover" }}
                    />

                    <div className="card-body flex-grow-1 d-flex flex-column p-3">
                      <h5 className="fw-bold text-white">{bull.name}</h5>
                      <p className="text-warning mb-3">{bull.breed}</p>

                      <ul className="package-list flex-grow-1 list-unstyled">
                        {bullPackages ? (
                          bullPackages.length > 0 ? (
                            bullPackages.map((p) => (
                              <li key={p.id} className="d-flex justify-content-between package-item">
                                <span className="units">{p.min_units}-{p.max_units}</span>
                                <span className="price">${p.price_per_unit}</span>
                              </li>
                            ))
                          ) : (
                            <li className="text-danger">No packages</li>
                          )
                        ) : (
                          <li className="text-muted">Loading...</li>
                        )}
                      </ul>

                      <div className="d-flex gap-2 mt-3">
                        <button
                          className="btn btn-outline-amber w-50"
                          onClick={() =>
                            navigate("/view-stat", { state: { id: bull.id } })
                          }
                        >
                          View Stats
                        </button>
                        <button
                          className="btn btn-amber w-50 text-dark"
                          onClick={() =>
                            navigate("/add-cart", { state: { id: bull.id } })
                          }
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-light py-5">
              <h5>No bulls match your search or filters 🐃</h5>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredBulls.length > 0 && (
          <div className="d-flex justify-content-center align-items-center gap-3 mt-5 fade-up">
            <button
              className="btn btn-outline-amber"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="fw-semibold text-light">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-outline-amber"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
