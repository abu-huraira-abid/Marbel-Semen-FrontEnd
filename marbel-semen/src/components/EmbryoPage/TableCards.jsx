import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChartBar, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import "../../assets/styles/Embryo.css"; // Reuse Embryo styles for smooth consistency

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

  // 🔹 Animate when visible
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

  // 🔹 Fetch bulls
  useEffect(() => {
    const fetchBulls = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/embryos/`);
        console.log(res.data);
        const data = res.data.results?.data || res.data.results || res.data;
        setBulls(data);
        setFilteredBulls(data);

        let allPrices = [];
        data.forEach((bull) => {
          bull.price_packages?.forEach((pkg) =>
            allPrices.push(parseFloat(pkg.price_per_unit))
          );
        });
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

  // 🔹 Lazy fetch packages
  const fetchPackages = async (bullId) => {
    if (packages[bullId]) return;
    try {
      const res = await axios.get(
        `${BASE_URL}/embryos/${bullId}/price-packages/`
      );
      setPackages((prev) => ({ ...prev, [bullId]: res.data.results }));
    } catch (err) {
      console.error(`Error fetching packages for bull ${bullId}:`, err);
      setPackages((prev) => ({ ...prev, [bullId]: [] }));
    }
  };

  // 🔹 Filter Logic
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
      className="why-embryo-container py-5 position-relative overflow-hidden"
    >
      {/* Decorative orbs (reused from embryo theme) */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <h2
          className="text-center fw-bold text-white mb-4 fade-up"
          style={{ fontFamily: "Syne" }}
        >
          Explore Our Premium Embryos
        </h2>

        {/* Search + Filter Controls */}
        <div className="glass-card p-4 mb-5 fade-up-delay">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label text-light fw-semibold">
                Search by Name
              </label>
              <input
                type="text"
                className="form-control rounded-1 bg-dark text-light golden-input"
                placeholder="Enter bull name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            {/* <div className="col-md-4">
              <label className="form-label text-light fw-semibold">
                Search by Breed
              </label>
              <input
                type="text"
                className="form-control rounded-1 bg-dark text-light border-0 golden-input"
                placeholder="Enter breed"
                value={searchBreed}
                onChange={(e) => setSearchBreed(e.target.value)}
              />
            </div> */}
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

        {/* Bulls Cards */}
        <div className="row justify-content-center fade-in-section">
          {currentBulls.length > 0 ? (
            currentBulls.map((bull) => {
              const bullPackages = packages[bull.id];
              if (!bullPackages) fetchPackages(bull.id);

              return (
                <div
                  key={bull.id}
                  className="col-10 col-md-6 col-lg-4 mb-4 fade-card"
                >
                  <div className="why-card h-100 d-flex flex-column">
                    <img
                      src={bull.image || "https://via.placeholder.com/400"}
                      alt={bull.name}
                      className="rounded-2 mb-3"
                      style={{ height: "220px", objectFit: "cover" }}
                    />
                    <h5
                      className="fw-bold"
                      style={{ color: "rgba(199, 167, 42, 1)" }}
                    >
                      {bull.name}
                    </h5>
                    <p className="text-light mb-2">
                      Dam: <span className="fw-bold">{bull.dam.name}</span>
                    </p>
                    <p className="text-light mb-2">
                      Sire: <span className="fw-bold">{bull.sire.name}</span>
                    </p>
                    <p className="text-light mb-2">
                      Price Packages:
                    </p>

                    <ul className="text-light small flex-grow-1">
                      {bullPackages ? (
                        bullPackages.length > 0 ? (
                          bullPackages.map((p) => (
                            <li key={p.id}>
                              <strong>
                                {p.min_units}-{p.max_units}
                              </strong>{" "}
                              : ${p.price_per_unit}
                            </li>
                          ))
                        ) : (
                          <li>No price packages</li>
                        )
                      ) : (
                        <li>Loading...</li>
                      )}
                    </ul>

                    <div className="d-flex gap-2 mt-auto">
                      <button
                        className="btn btn-outline-warning w-50 rounded-1 d-flex align-items-center justify-content-center gap-2"
                        onClick={() =>
                          navigate("/view-stat-embryo", { state: { id: bull.id } })
                        }
                      >
                        <FaChartBar /> View Stats
                      </button>

                      <button
                        className="btn btn-warning text-dark w-50 rounded-1 d-flex align-items-center justify-content-center gap-2"
                        onClick={() =>
                          navigate("/add-cart-embryo", { state: { id: bull.id } })
                        }
                      >
                        <FaShoppingCart /> Add to Cart
                      </button>
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
          <div className="d-flex justify-content-center align-items-center gap-3 mt-4 fade-up">
            <button
              className="btn btn-outline-warning rounded-1"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="fw-semibold text-light">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-outline-warning rounded-1"
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
