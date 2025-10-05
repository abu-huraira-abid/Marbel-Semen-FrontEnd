import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

export default function Inventory() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBull, setSelectedBull] = useState(null);
  const [updatedQuantity, setUpdatedQuantity] = useState("");

  const [searchName, setSearchName] = useState("");
  const [searchBreed, setSearchBreed] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const token = localStorage.getItem("access_token");

  // Fetch all bulls with stock
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/bulls/stocks/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setInventory(res.data.data || []);
      } catch (error) {
        console.error("Error loading stocks:", error.response?.data || error);
        Swal.fire({
          icon: "error",
          title: "Failed to Load Inventory",
          text: error.response?.data?.message || "Please try again later.",
        });
      }
    };

    fetchData();
  }, [BASE_URL, token]);

  // Handle edit
  const handleEditClick = (bull) => {
    setSelectedBull(bull);
    setUpdatedQuantity(bull.quantity);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!selectedBull) return;

    const result = await Swal.fire({
      title: "Confirm Update",
      text: `Are you sure you want to update the quantity of "${selectedBull.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axios.patch(
        `${BASE_URL}/bulls/${selectedBull.id}/stock/`,
        { quantity: updatedQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update UI instantly
      setInventory((prev) =>
        prev.map((item) =>
          item.id === selectedBull.id
            ? { ...item, quantity: updatedQuantity }
            : item
        )
      );

      setShowModal(false);

      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        text: `${selectedBull.name}'s stock has been updated.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error updating stock:", error.response?.data || error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || "Something went wrong.",
      });
    }
  };

  // Filter by search fields
  const filteredInventory = inventory.filter((bull) => {
    const matchesName = bull.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const matchesBreed = bull.breed
      .toLowerCase()
      .includes(searchBreed.toLowerCase());

    const status =
      bull.quantity === 0
        ? "danger"
        : bull.quantity <= 5
        ? "alert"
        : "success";

    const matchesStatus = searchStatus
      ? status === searchStatus
      : true;

    return matchesName && matchesBreed && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredInventory.length / pageSize);
  const paginatedInventory = filteredInventory.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container py-5">
      {/* Filters */}
      <div className="card shadow-sm  border-0 mb-4">
        <div className="card-body d-flex flex-column flex-md-row gap-3 justify-content-between align-items-center">
          <input
            type="text"
            placeholder="Search by Name"
            className="form-control"
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
              setCurrentPage(1);
            }}
            style={{ maxWidth: "250px" }}
          />
          <input
            type="text"
            placeholder="Search by Breed"
            className="form-control"
            value={searchBreed}
            onChange={(e) => {
              setSearchBreed(e.target.value);
              setCurrentPage(1);
            }}
            style={{ maxWidth: "250px" }}
          />
          <select
            className="form-select"
            value={searchStatus}
            onChange={(e) => {
              setSearchStatus(e.target.value);
              setCurrentPage(1);
            }}
            style={{ maxWidth: "200px" }}
          >
            <option value="">All Status</option>
            <option value="danger">Danger (0 qty)</option>
            <option value="alert">Alert (1-5 qty)</option>
            <option value="success">Healthy (&gt;5 qty)</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="card shadow-lg border-0 rounded-3">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Image</th>
                  <th>Bull Name</th>
                  <th>Breed</th>
                  <th>Quantity</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedInventory.map((bull) => (
                  <tr key={bull.id}>
                    <td>
                      <img
                        src={`${bull.image}`}
                        alt={bull.name}
                        className="rounded-2"
                        style={{
                          width: "80px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td className="fw-semibold">{bull.name}</td>
                    <td>{bull.breed}</td>
                    <td>
                      <span
                        className={`badge px-3 py-2 fs-6 rounded-0 ${
                          bull.quantity === 0
                            ? "bg-danger"
                            : bull.quantity > 0 && bull.quantity <= 5
                            ? "bg-warning text-dark"
                            : "bg-success"
                        }`}
                        style={{ width: "70px" }}
                      >
                        {bull.quantity}
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-primary btn-sm d-flex align-items-center mx-auto rounded-1 px-4"
                        onClick={() => handleEditClick(bull)}
                      >
                        <FaEdit className="me-1" /> Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredInventory.length === 0 && (
              <div className="text-center py-5 text-muted">
                No inventory records found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pagination Footer */}
      {filteredInventory.length > 0 && (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 px-2">
          {/* Page navigation */}
          <div className="d-flex align-items-center mb-3 mb-md-0">
            <button
              className="btn btn-outline-secondary btn-sm me-2"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <span className="fw-semibold">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              className="btn btn-outline-secondary btn-sm ms-2"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>

          {/* Rows per page */}
          <div className="d-flex align-items-center">
            <label className="me-2 mb-0 fw-semibold">Rows per Page:</label>
            <select
              className="form-select form-select-sm"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{ width: "80px" }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">Update Inventory</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {selectedBull && (
                  <>
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={selectedBull.image}
                        alt={selectedBull.name}
                        className="rounded-3 border me-3"
                        style={{
                          width: "100px",
                          height: "70px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <h5 className="m-0">{selectedBull.name}</h5>
                        <small className="text-muted">
                          {selectedBull.breed}
                        </small>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        value={updatedQuantity}
                        onChange={(e) => setUpdatedQuantity(e.target.value)}
                        min="0"
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
