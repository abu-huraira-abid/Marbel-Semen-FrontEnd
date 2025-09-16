import React, { useState, useEffect } from "react";
import { FaTrash, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import API from "../../Register/utils/Api";

const API_BASE = import.meta.env.VITE_BASE_URL;

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

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
          bullsAdded: Math.floor(Math.random() * 50), // demo only
          status: user.is_active ? "Active" : "Inactive",
        }))
      );
    } catch (err) {
      toast.error("Failed to fetch users!");
      console.error(err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
        toast.success("User deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete user.");
        console.error(err.response?.data || err);
      }
    }
  };

  const handleView = (id) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    Swal.fire({
      title: "User Details",
      html: `
        <p><strong>ID:</strong> ${user.id}</p>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Bulls Added:</strong> ${user.bullsAdded}</p>
        <p><strong>Status:</strong> ${user.status}</p>
      `,
      icon: "info",
    });
  };

  // ✅ Toggle Status (API integrated)
  const toggleStatus = async (id) => {
  try {
    const res = await API.patch(
      `${import.meta.env.VITE_BASE_URL}/accounts/users/${id}/status/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    // Update UI with response from backend
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: res.data.is_active ? "Active" : "Inactive" } : u
      )
    );

    toast.success(res.data.detail || "User status updated!");
  } catch (err) {
    if (err.response?.status === 401) {
      toast.error("Unauthorized. Please log in again.");
    } else {
      toast.error("Failed to update status.");
    }
    console.error(err.response?.data || err);
  }
};


  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchName.toLowerCase()) &&
      user.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="p-4 bg-white rounded shadow">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Search filters */}
      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Users Table */}
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
                <tr key={user.id} className="text-nowrap">
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.bullsAdded}</td>
                  <td>
                    <button
                      style={{ width: "100px" }}
                      className={`btn btn-sm ${
                        user.status === "Active" ? "btn-success" : "btn-danger"
                      }`}
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

      {/* Pagination */}
      <nav className="d-flex justify-content-end">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, idx) => (
            <li
              key={idx}
              className={`page-item ${currentPage === idx + 1 && "active"}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
