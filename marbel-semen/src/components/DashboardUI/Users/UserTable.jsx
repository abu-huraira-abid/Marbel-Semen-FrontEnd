import React, { useState, useEffect } from "react";
import { FaTrash, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import API from "../../Register/utils/Api";

const API_BASE = import.meta.env.VITE_BASE_URL;

export default function UserTable({ value }) {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // ✅ Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await API.get(`${API_BASE}/accounts/users/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });

      setUsers(
        res.data.results.map((user) => ({
          id: user.id,
          name: user.username,
          email: user.email,
          bullsAdded: Math.floor(Math.random() * 50),
          status: user.is_active ? "Active" : "Inactive",
        }))
      );
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Fetch Users",
        text: err.response?.data?.detail || "Please try again later.",
      });
      console.error(err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [value]);

  // ✅ Delete User
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      try {
        await API.delete(`${API_BASE}/accounts/users/${id}/`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        });
        setUsers((prev) => prev.filter((user) => user.id !== id));

        Swal.fire({
          icon: "success",
          title: "User Deleted!",
          text: "The user has been removed successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Failed to Delete",
          text: err.response?.data?.detail || "An error occurred. Try again later.",
        });
      }
    }
  };

  // ✅ View User Details
  const handleView = (id) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    Swal.fire({
      title: `<strong>User Details</strong>`,
      html: `
        <div style="text-align: left;">
          <p><strong>ID:</strong> ${user.id}</p>
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Bulls Added:</strong> ${user.bullsAdded}</p>
          <p><strong>Status:</strong> ${user.status}</p>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Close",
    });
  };

  // ✅ Toggle Status
  const toggleStatus = async (id) => {
    try {
      const res = await API.patch(
        `${API_BASE}/accounts/users/${id}/status/`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
      );

      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, status: res.data.is_active ? "Active" : "Inactive" } : u
        )
      );

      Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: res.data.detail || "User status changed successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Update Status",
        text:
          err.response?.status === 401
            ? "You are unauthorized. Please log in again."
            : "An error occurred while updating status.",
      });
    }
  };

  // ✅ Filters + Pagination
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchName.toLowerCase()) &&
      user.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
  const indexOfLastUser = page * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages]);

  return (
    <div className="p-4 bg-white rounded shadow">
      {/* 🔍 Filters */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name"
            style={{ width: "180px" }}
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Search by Email"
            style={{ width: "180px" }}
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
        </div>
      </div>

      {/* 🧾 Table */}
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Bulls Added</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.bullsAdded}</td>
                  <td>
                    <button
                      className={`btn btn-sm ${
                        user.status === "Active" ? "btn-success" : "btn-danger"
                      }`}
                      style={{ width: "100px" }}
                      onClick={() => toggleStatus(user.id)}
                    >
                      {user.status}
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleView(user.id)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(user.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📄 Footer Pagination (modern style) */}
      <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
        {/* Rows per page selector */}
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

        {/* Page info + navigation */}
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted small mx-3">
            Showing{" "}
            {filteredUsers.length === 0
              ? 0
              : (page - 1) * itemsPerPage + 1}{" "}
            - {Math.min(page * itemsPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length}
          </span>

          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage(page - 1)}
                >
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
    </div>
  );
}
