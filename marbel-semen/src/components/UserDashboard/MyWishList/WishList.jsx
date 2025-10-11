import { useState, useEffect } from "react";
import { FaTrash, FaEye, FaTimes, FaSearch } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [filteredWishlist, setFilteredWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBull, setSelectedBull] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({ name: "", breed: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(6);

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token =
    localStorage.getItem("access_token") || localStorage.getItem("accessToken");

  // ✅ Responsive cards per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCardsPerPage(3);
      else setCardsPerPage(6);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Fetch wishlist items
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/wishlist/`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        const data = response.data.results || [];
        setWishlist(data);
        setFilteredWishlist(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        if (error.response?.status === 401) {
          Swal.fire({
            icon: "warning",
            title: "Session Expired",
            text: "Please log in again.",
          });
          navigate("/login");
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to load wishlist",
            text: "Please try again later.",
          });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [BASE_URL, token, navigate]);

  // ✅ Handle search/filter input
  useEffect(() => {
    let filtered = wishlist;

    if (filters.name.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.bull_name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.breed.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.bull_breed.toLowerCase().includes(filters.breed.toLowerCase())
      );
    }

    setFilteredWishlist(filtered);
    setCurrentPage(1);
  }, [filters, wishlist]);

  // ✅ Pagination logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredWishlist.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredWishlist.length / cardsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Fetch bull details
  const handleView = async (bullId) => {
    try {
      const res = await axios.get(`${BASE_URL}/bulls/${bullId}/`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      const raw = res.data?.data ?? res.data ?? {};
      const normalized = {
        id: raw.id ?? raw.pk ?? null,
        name: raw.name ?? raw.bull_name ?? raw.title ?? "Unnamed",
        image: raw.image ?? raw.bull_image ?? raw.photo ?? "",
        breed: raw.breed ?? raw.bull_breed ?? raw.breed_name ?? "",
        description: raw.description ?? raw.details ?? raw.short_description ?? "",
        registration_id: raw.registration_id ?? raw.reg_no ?? raw.regNumber ?? "",
        quantity: raw.quantity ?? raw.stock ?? raw.available ?? 0,
        price_packages:
          (raw.price_packages &&
            Array.isArray(raw.price_packages) &&
            raw.price_packages.map((p) => ({
              id: p.id ?? p.pk ?? null,
              min_units: p.min_units ?? p.min ?? p.quantity ?? null,
              max_units: p.max_units ?? p.max ?? p.max_quantity ?? null,
              price_per_unit: p.price_per_unit ?? p.price ?? p.unit_price ?? null,
            }))) ||
          [],
      };

      setSelectedBull(normalized);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching bull details:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not load bull details.",
      });
    }
  };

  // ✅ Remove from wishlist
  const handleRemove = async (item) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This bull will be removed from your wishlist.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`${BASE_URL}/wishlist/?bull=${item.bull}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      setWishlist((prev) => prev.filter((w) => w.id !== item.id));
      Swal.fire({
        icon: "success",
        title: "Removed!",
        text: `${item.bull_name} removed from wishlist.`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error removing item:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not remove item from wishlist.",
      });
    }
  };

  // ✅ Loading state
  if (loading) {
    return (
      <div className="text-center py-5 text-muted">
        <div className="spinner-border text-primary mb-2" role="status"></div>
        <p>Loading your wishlist...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* 🔍 Filter Section */}
      <div className="card mb-4 shadow-sm border-0 p-3 rounded-4">
        <h5 className="fw-bold mb-3">
          <FaSearch className="me-2 text-primary" />
          Filter Wishlist
        </h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Search by Bull Name..."
              className="form-control rounded-pill"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Search by Breed..."
              className="form-control rounded-pill"
              value={filters.breed}
              onChange={(e) => setFilters({ ...filters, breed: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* 💖 Wishlist Display */}
      {filteredWishlist.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <p>No bulls match your search.</p>
        </div>
      ) : (
        <>
          <div className="row">
            {currentCards.map((item) => (
              <div key={item.id} className="col-12 col-md-4 mb-4">
                <div className="card shadow-lg border-0 h-100 wishlist-card">
                  <img
                    src={item.bull_image || "https://placehold.co/300x200?text=No+Image"}
                    alt={item.bull_name}
                    className="card-img-top"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                    }}
                  />
                  <div className="card-body text-center">
                    <h6 className="fw-bold mb-2">{item.bull_name}</h6>
                    <p className="text-muted mb-3">{item.bull_breed}</p>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-primary btn-sm px-4"
                        onClick={() => handleView(item.bull)}
                      >
                        <FaEye className="me-1" /> View
                      </button>
                      <button
                        className="btn btn-danger btn-sm px-4"
                        onClick={() => handleRemove(item)}
                      >
                        <FaTrash className="me-1" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 📄 Pagination */}
          {totalPages > 1 && (
            <nav>
              <ul className="pagination justify-content-center mt-4">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <li
                    key={num}
                    className={`page-item ${num === currentPage ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(num)}
                    >
                      {num}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}

      {/* 🧩 Modal */}
      {showModal && selectedBull && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">{selectedBull.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row align-items-start">
                  <div className="col-md-5 text-center mb-3 mb-md-0">
                    <img
                      src={selectedBull.image || "https://placehold.co/400x250?text=No+Image"}
                      alt={selectedBull.name}
                      className="img-fluid rounded-3 shadow-sm"
                      style={{ maxHeight: 300, objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-7">
                    <h6 className="fw-bold">Breed: {selectedBull.breed || "N/A"}</h6>
                    {selectedBull.registration_id && (
                      <p className="text-danger small mb-2">
                        REG # {selectedBull.registration_id}
                      </p>
                    )}
                    <p className="text-muted small">
                      Description: {selectedBull.description || "No description available."}
                    </p>
                    <hr />
                    <h6 className="fw-bold">Stock</h6>
                    {selectedBull.quantity === 0 ? (
                      <span className="badge bg-danger px-4 py-2">Out of Stock</span>
                    ) : selectedBull.quantity < 6 ? (
                      <span className="badge bg-warning text-dark px-4 py-2">
                        Limited Stock ({selectedBull.quantity})
                      </span>
                    ) : (
                      <span className="badge bg-success px-4 py-2">
                        In Stock ({selectedBull.quantity})
                      </span>
                    )}
                    <h6 className="fw-bold mt-4">Price Packages</h6>
                    {selectedBull.price_packages.length > 0 ? (
                      <ul>
                        {selectedBull.price_packages.map((pkg) => (
                          <li key={pkg.id ?? Math.random()}>
                            {pkg.min_units ?? "—"}
                            {pkg.max_units ? ` - ${pkg.max_units}` : ""} units —{" "}
                            <strong>${pkg.price_per_unit}</strong>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="small text-muted">
                        No price packages available.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button
                  className="btn btn-secondary px-4"
                  onClick={() => setShowModal(false)}
                >
                  <FaTimes className="me-1" /> Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          .wishlist-card {
            border-radius: 15px;
            transition: all 0.3s ease;
          }
          .wishlist-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          }
          .pagination .page-item.active .page-link {
            background-color: #0d6efd;
            border-color: #0d6efd;
          }
        `}
      </style>
    </div>
  );
}
