import { useState, useEffect } from "react";
import { FaEye, FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../../Register/utils/Api";
import { toast } from "react-toastify";

export default function BullTable() {
  const [bulls, setBulls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [reload,setReload] = useState(1)
  const bullsPerPage = 5;
  const navigate = useNavigate();

  // Fetch bulls from backend
  const fetchBulls = async () => {
    try {
      const res = await API.get("/bulls/bulls/");
      console.log("Bulls API response:", res.data);

      if (res.data?.results?.data && Array.isArray(res.data.results.data)) {
        setBulls(res.data.results.data);
      } else {
        console.warn("Unexpected bulls response:", res.data);
        setBulls([]);
      }
    } catch (err) {
      console.error("Error fetching bulls:", err);
      toast.error("Failed to load bulls");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBulls();
  }, [reload]);

  // Pagination logic
  const indexOfLastBull = currentPage * bullsPerPage;
  const indexOfFirstBull = indexOfLastBull - bullsPerPage;
  const currentBulls = bulls.slice(indexOfFirstBull, indexOfLastBull);
  const totalPages = Math.ceil(bulls.length / bullsPerPage);

  // Navigate to view/update
  const handleViewUpdate = (id) => {
    navigate(`/account/bulls/${id}`);
  };

  // Delete bull
  const handleDelete = async (id) => {
    try {
      await API.delete(`/bulls/bulls/${id}/`);
      setBulls((prev) => prev.filter((bull) => bull.id !== id));
      setReload(reload+1)
      toast.success("Bull deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete bull");
    }
  };

  // Update status (PATCH to backend)
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await API.patch(`/bulls/bulls/${id}/`, { status: newStatus });
      setBulls((prev) =>
        prev.map((bull) =>
          bull.id === id ? { ...bull, status: res.data.status } : bull
        )
      );

      toast.success(`Status updated to ${res.data.status}`);
      setReload(reload+1)
    } catch (err) {
      console.error("Status update error:", err);
      toast.error("Failed to update status");
    }
  };

  if (loading) {
    return <div className="text-center p-5">Loading bulls...</div>;
  }

  return (
    <div className="table-responsive bg-white p-3 rounded shadow-lg">
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" />
            </th>
            <th scope="col">Bull Image</th>
            <th scope="col">Name</th>
            <th scope="col">Breed</th>
            <th scope="col">Registration #</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBulls.length > 0 ? (
            currentBulls.map((bull) => (
              <tr key={bull.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td className="table-light">
                  <img
                    src={bull.image}
                    alt={bull.name}
                    width="80"
                    className="rounded shadow-sm"
                  />
                </td>
                <td className="fw-semibold table-light">{bull.name}</td>
                <td>{bull.breed}</td>
                <td>{bull.registration_id}</td>

                {/* 🔽 Dropdown with real options */}
                <td>
                  <select
                    className="form-select form-select-sm"
                    style={{ width: "140px" }}
                    value={bull.status}
                    onChange={(e) =>
                      handleStatusChange(bull.id, e.target.value)
                    }
                  >
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                    <option value="sold">Sold</option>
                    <option value="retired">Retired</option>
                  </select>
                </td>

                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-primary d-flex align-items-center gap-2 text-nowrap"
                      onClick={() => handleViewUpdate(bull.id)}
                    >
                      <FaEye /> View / Update
                    </button>

                    <button
                      className="btn btn-sm btn-danger d-flex align-items-center gap-1"
                      onClick={() => handleDelete(bull.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-3">
                No bulls found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-end align-items-center gap-2">
          <button
            className="btn btn-primary btn-sm d-flex align-items-center gap-1"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <FaChevronLeft /> Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm ${
                currentPage === index + 1
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="btn btn-primary btn-sm d-flex align-items-center gap-1"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
