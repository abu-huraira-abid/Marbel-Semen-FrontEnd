import { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaSave } from "react-icons/fa";

export default function Queries() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5); // queries per page
  const [statusUpdate, setStatusUpdate] = useState("");

  // Fetch queries (admin only)
  useEffect(() => {
    fetchQueries();
  }, [page]);

  const fetchQueries = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(`${BASE_URL}/queries/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQueries(response.data);
    } catch (error) {
      console.error("Error fetching queries:", error.response?.data || error.message);
    }
  };

  // Handle status update
  const handleStatusChange = async () => {
    if (!selectedQuery) return;
    try {
      const token = localStorage.getItem("access_token");
      await axios.patch(
        `${BASE_URL}/queries/${selectedQuery.id}/change-status/`,
        { status: statusUpdate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh list
      fetchQueries();
      // Update local selectedQuery
      setSelectedQuery({ ...selectedQuery, status: statusUpdate });

      // Close modal programmatically
      const modal = window.bootstrap.Modal.getInstance(
        document.getElementById("queryModal")
      );
      modal.hide();
    } catch (error) {
      console.error("Error updating status:", error.response?.data || error.message);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(queries.length / pageSize);
  const paginatedQueries = queries.slice((page - 1) * pageSize, page * pageSize);

  // Badge color function
  const getBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-warning text-dark";
      case "proceeding":
        return "bg-info text-dark";
      case "reviewed":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="container my-4">
      <h1 className="mb-3" style={{ fontFamily: "Syne" }}>
        Users Queries
      </h1>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th style={{ width: "200px" }}>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedQueries.length > 0 ? (
              paginatedQueries.map((q) => (
                <tr key={q.id}>
                  <td>{q.name}</td>
                  <td>{q.email}</td>
                  <td>{q.phone || "-"}</td>
                  <td
                    style={{
                      maxWidth: "200px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    title={q.message}
                  >
                    {q.message}
                  </td>
                  <td className="text-capitalize">
                    <span
                      className={`badge px-4 ${getBadgeClass(q.status)}`}
                      style={{ width: "100px" }}
                    >
                      {q.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary d-flex align-items-center px-3"
                      data-bs-toggle="modal"
                      data-bs-target="#queryModal"
                      onClick={() => {
                        setSelectedQuery(q);
                        setStatusUpdate(q.status); // prefill dropdown
                      }}
                    >
                      <FaEye className="me-1" /> View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No queries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination with numbers */}
      <div className="d-flex justify-content-center mt-3">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setPage(page - 1)}>
                Previous
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${page === i + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => setPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}

            <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setPage(page + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="queryModal"
        tabIndex="-1"
        aria-labelledby="queryModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="queryModalLabel">
                Query Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedQuery ? (
                <>
                  <p>
                    <strong>Name:</strong> {selectedQuery.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedQuery.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedQuery.phone || "-"}
                  </p>
                  <p>
                    <strong>Message:</strong> {selectedQuery.message}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`text-capitalize badge px-4 ${getBadgeClass(
                        selectedQuery.status
                      )}`}
                    >
                      {selectedQuery.status}
                    </span>
                  </p>

                  {/* Dropdown to change status */}
                  <div className="mb-3 w-50">
                    <label className="form-label fw-bold">Update Status</label>
                    <select
                      className="form-select"
                      value={statusUpdate}
                      onChange={(e) => setStatusUpdate(e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="proceeding">Proceeding</option>
                      <option value="reviewed">Reviewed</option>
                    </select>
                  </div>
                </>
              ) : (
                <p>No query selected</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success d-flex align-items-center"
                onClick={handleStatusChange}
              >
                <FaSave className="me-1" /> Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
