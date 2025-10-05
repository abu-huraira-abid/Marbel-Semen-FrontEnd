import { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaSave, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Queries() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [statusUpdate, setStatusUpdate] = useState("");
  const [showModal, setShowModal] = useState(false);

  // ✅ Search filters
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchMessage, setSearchMessage] = useState("");

  // ✅ Fetch Queries
  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(`${BASE_URL}/queries/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQueries(response.data);
    } catch (error) {
      console.error("Error fetching queries:", error.response?.data || error.message);
      Swal.fire("Error", "Failed to fetch queries.", "error");
    }
  };

  // ✅ Update query status
  const handleStatusChange = async () => {
    if (!selectedQuery) return;

    try {
      const token = localStorage.getItem("access_token");
      await axios.patch(
        `${BASE_URL}/queries/${selectedQuery.id}/change-status/`,
        { status: statusUpdate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await fetchQueries();
      setSelectedQuery({ ...selectedQuery, status: statusUpdate });
      setShowModal(false);

      setTimeout(() => {
        Swal.fire("Success", "Query status updated successfully!", "success");
      }, 300);
    } catch (error) {
      console.error("Error updating status:", error.response?.data || error.message);
      Swal.fire(
        "Error",
        error.response?.data?.detail || "Failed to update status.",
        "error"
      );
    }
  };

  // ✅ Filtered data
  const filteredQueries = queries.filter(
    (q) =>
      q.name.toLowerCase().includes(searchName.toLowerCase()) &&
      q.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
      q.message.toLowerCase().includes(searchMessage.toLowerCase())
  );

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredQueries.length / itemsPerPage);
  const paginatedQueries = filteredQueries.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // ✅ Badge colors
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
      <h1 className="mb-4" style={{ fontFamily: "Syne" }}>
        Users Queries
      </h1>

      {/* 🔍 Search Filters */}
      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Email"
            value={searchEmail}
            onChange={(e) => {
              setSearchEmail(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Message"
            value={searchMessage}
            onChange={(e) => {
              setSearchMessage(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* 🧾 Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle text-nowrap">
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
                  <td className="text-capitalize text-center">
                    <span
                      className={`badge px-4 rounded-0 py-2 ${getBadgeClass(q.status)}`}
                      style={{ width: "100px" }}
                    >
                      {q.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary d-flex align-items-center px-3"
                      onClick={() => {
                        setSelectedQuery(q);
                        setStatusUpdate(q.status);
                        setShowModal(true);
                      }}
                    >
                      <FaEye className="me-1" /> View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-3">
                  No queries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Footer with Rows Selector + Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
        {/* Rows per page */}
        <div className="d-flex align-items-center gap-2">
          <label className="text-muted small mb-0">Rows per page:</label>
          <select
            className="form-select form-select-sm"
            style={{ width: "80px" }}
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value));
              setPage(1);
            }}
          >
            {[5, 10, 25, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Page Info + Navigation */}
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted small mx-3">
            Showing{" "}
            {filteredQueries.length === 0
              ? 0
              : (page - 1) * itemsPerPage + 1}{" "}
            -{" "}
            {Math.min(page * itemsPerPage, filteredQueries.length)} of{" "}
            {filteredQueries.length}
          </span>

          <nav>
            <ul className="pagination pagination-sm mb-0">
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
                  <button
                    className="page-link"
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  page === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* ✅ Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Query Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                {selectedQuery ? (
                  <>
                    <p><strong>Name:</strong> {selectedQuery.name}</p>
                    <p><strong>Email:</strong> {selectedQuery.email}</p>
                    <p><strong>Phone:</strong> {selectedQuery.phone || "-"}</p>
                    <p><strong>Message:</strong> {selectedQuery.message}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`text-capitalize badge px-4 py-2 rounded-0 ${getBadgeClass(
                          selectedQuery.status
                        )}`}
                      >
                        {selectedQuery.status}
                      </span>
                    </p>

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
                  onClick={() => setShowModal(false)}
                >
                  <FaTimes className="me-1" /> Close
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
      )}
    </div>
  );
}
