import { useState, useEffect } from "react";
import { FaEye, FaTrash, FaChevronLeft, FaChevronRight, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../../Register/utils/Api";
import Swal from "sweetalert2";

export default function BullTable({ value }) {
  const [bulls, setBulls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [reload, setReload] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchBreed, setSearchBreed] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [bullsPerPage, setBullsPerPage] = useState(5);
  const [buttonLoading, setButtonLoading] = useState({}); // key = bull.id
  const navigate = useNavigate();

  // Fetch bulls
  const fetchBulls = async () => {
    try {
      const res = await API.get("/bulls/");
      if (res.data?.results?.data && Array.isArray(res.data.results.data)) {
        setBulls(res.data.results.data);
      } else {
        setBulls([]);
      }
    } catch (err) {
      Swal.fire("Error", "❌ Failed to load bulls", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBulls();
  }, [reload, value]);

  const indexOfLastBull = currentPage * bullsPerPage;
  const indexOfFirstBull = indexOfLastBull - bullsPerPage;
  const filteredBulls = bulls.filter(
    (bull) =>
      (bull.name?.toLowerCase() || "").includes(searchName.toLowerCase()) &&
      (bull.breed?.toLowerCase() || "").includes(searchBreed.toLowerCase()) &&
      (bull.status?.toLowerCase() || "").includes(searchStatus.toLowerCase())
  );
  const currentBulls = filteredBulls.slice(indexOfFirstBull, indexOfLastBull);
  const totalPages = Math.ceil(filteredBulls.length / bullsPerPage);

  // Navigation
  const handleViewUpdate = (id) => navigate(`/account/bulls/${id}`);
  const handleViewPrice = (id) => navigate(`/account/bulls/price/${id}`);

  // Delete bull
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This bull will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        setButtonLoading((prev) => ({ ...prev, [id]: true }));
        await API.delete(`bulls/${id}/`);
        setBulls((prev) => prev.filter((bull) => bull.id !== id));
        setReload(reload + 1);
        Swal.fire("Deleted!", "Bull deleted successfully", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to delete bull", "error");
      } finally {
        setButtonLoading((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  // Update status
  const handleStatusChange = async (id, newStatus) => {
    try {
      setButtonLoading((prev) => ({ ...prev, [id]: true }));
      const res = await API.patch(`/bulls/${id}/`, { status: newStatus });
      setBulls((prev) =>
        prev.map((bull) => (bull.id === id ? { ...bull, status: res.data.status } : bull))
      );
      Swal.fire("Updated!", "Status updated successfully!", "success");
      setReload(reload + 1);
    } catch (err) {
      Swal.fire("Error", "❌ Failed to update status", "error");
    } finally {
      setButtonLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  if (loading) return <div className="text-center p-5">Loading bulls...</div>;

  const start = filteredBulls.length === 0 ? 0 : indexOfFirstBull + 1;
  const end = Math.min(indexOfLastBull, filteredBulls.length);

  return (
    <div className="bg-white p-3 rounded shadow-lg">
      {/* 🔍 Search & Filter Controls */}
      <div className="row mb-3 align-items-end">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Bull Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Breed"
            value={searchBreed}
            onChange={(e) => setSearchBreed(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
            <option value="sold">Sold</option>
            <option value="retired">Retired</option>
          </select>
        </div>
      </div>

      {/* 🐂 Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle text-nowrap">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Bull Image</th>
              <th>Name</th>
              <th>Breed</th>
              <th>Registration #</th>
              <th>Status</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBulls.length > 0 ? (
              currentBulls.map((bull) => (
                <tr key={bull.id}>
                  <td><input type="checkbox" /></td>
                  <td>
                    <img src={bull.image} alt={bull.name} width="80" className="rounded shadow-sm" />
                  </td>
                  <td className="fw-semibold">{bull.name}</td>
                  <td>{bull.breed}</td>
                  <td>{bull.registration_id}</td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      style={{ width: "140px" }}
                      value={bull.status}
                      onChange={(e) => handleStatusChange(bull.id, e.target.value)}
                      disabled={buttonLoading[bull.id]}
                    >
                      <option value="available">Available</option>
                      <option value="unavailable">Unavailable</option>
                      <option value="sold">Sold</option>
                      <option value="retired">Retired</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-success d-flex align-items-center gap-1"
                      onClick={() => handleViewPrice(bull.id)}
                    >
                      {buttonLoading[bull.id] ? <FaSpinner className="spin" /> : "View Price"}
                    </button>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-primary d-flex align-items-center gap-2"
                        onClick={() => handleViewUpdate(bull.id)}
                      >
                        {buttonLoading[bull.id] ? <FaSpinner className="spin" /> : <><FaEye /> View / Update</>}
                      </button>
                      <button
                        className="btn btn-sm btn-danger d-flex align-items-center gap-1"
                        onClick={() => handleDelete(bull.id)}
                      >
                        {buttonLoading[bull.id] ? <FaSpinner className="spin" /> : <><FaTrash /> Delete</>}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-3">No bulls found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📄 Footer */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-3">
        <div className="text-muted small">
          Showing <strong>{start}</strong>–<strong>{end}</strong> of <strong>{filteredBulls.length}</strong> bulls
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <span className="small text-muted">Show per page:</span>
            <select
              className="form-select form-select-sm"
              style={{ width: "80px" }}
              value={bullsPerPage}
              onChange={(e) => {
                setBullsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {[5, 10, 20, 50].map((num) => <option key={num} value={num}>{num}</option>)}
            </select>
          </div>

          <div className="d-flex align-items-center gap-1">
            <button
              className="btn btn-sm btn-outline-primary d-flex align-items-center"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <FaChevronLeft /> Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`btn btn-sm ${currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="btn btn-sm btn-outline-primary d-flex align-items-center"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* 🔧 Spinner CSS */}
      <style>
        {`
          .spin {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
}
