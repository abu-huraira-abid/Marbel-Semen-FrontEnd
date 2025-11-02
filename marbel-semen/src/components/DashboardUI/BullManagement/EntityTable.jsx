import { useState, useEffect } from "react";
import {
  FaEye,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../../Register/utils/Api";
import Swal from "sweetalert2";

export default function EntityTable({ type = "bull", value }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [reload, setReload] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [buttonLoading, setButtonLoading] = useState({});
  const navigate = useNavigate();

  const entityName = type.charAt(0).toUpperCase() + type.slice(1);
  const pluralType = `${type}s`;

  // ✅ Fetch data
  const fetchEntities = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/${pluralType}/`);
      console.log(res.data);
      const data = res.data?.results?.data || res.data?.results || res.data || [];
      setRecords(Array.isArray(data) ? data : []);
    } catch (err) {
      Swal.fire("Error", `❌ Failed to load ${pluralType}`, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntities();
  }, [reload, value, type]);

  // ✅ Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const filteredRecords = records.filter((item) => {
    const name =
      (item.name || item.embryo_id || item.batch_no || "").toLowerCase();
    const status = (item.status || "").toLowerCase();
    return (
      name.includes(searchTerm.toLowerCase()) &&
      status.includes(filterStatus.toLowerCase())
    );
  });

  const currentRecords = filteredRecords.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

  // ✅ Navigation
  const handleViewUpdate = (id) => navigate(`/account/${pluralType}/${id}`);
  const handleViewPrice = (id) => navigate(`/account/${pluralType}/price/${id}`);

  // ✅ Delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `This ${type} will be permanently deleted!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      setButtonLoading((prev) => ({ ...prev, [id]: true }));
      await API.delete(`/${pluralType}/${id}/`);
      setRecords((prev) => prev.filter((r) => r.id !== id));
      Swal.fire("Deleted!", `${entityName} deleted successfully`, "success");
    } catch {
      Swal.fire("Error", `Failed to delete ${type}`, "error");
    } finally {
      setButtonLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  // ✅ Update status (for bulls only)
  const handleStatusChange = async (id, newStatus) => {
    try {
      setButtonLoading((prev) => ({ ...prev, [id]: true }));
      const res = await API.patch(`/${pluralType}/${id}/`, { status: newStatus });
      setRecords((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: res.data.status } : r))
      );
      Swal.fire("Updated!", "Status updated successfully!", "success");
    } catch {
      Swal.fire("Error", `❌ Failed to update ${type} status`, "error");
    } finally {
      setButtonLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  // ✅ Table headers
  const renderTableHeaders = () => {
    switch (type) {
      case "bull":
        return (
          <tr>
            <th><input type="checkbox" /></th>
            <th>Image</th>
            <th>Name / ID</th>
            <th>Breed</th>
            <th>Status</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        );
      case "semen":
        return (
          <tr>
            <th><input type="checkbox" /></th>
            <th>Batch</th>
            <th>Bull</th>
            <th>Batch No.</th>
            <th>Status</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        );
      case "embryo":
        return (
          <tr>
            <th><input type="checkbox" /></th>
            <th>Image</th>
            <th>Name</th>
            <th>Sire (Male)</th>
            <th>Dam (Female)</th>
            <th>Breed</th>
            <th>Status</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        );
      default:
        return null;
    }
  };

  // ✅ Table rows
  const renderTableRows = () => {
    if (currentRecords.length === 0) {
      return (
        <tr>
          <td colSpan="9" className="text-center py-3">
            No {pluralType} found
          </td>
        </tr>
      );
    }

    return currentRecords.map((item) => {
      if (type === "bull") {
        return (
          <tr key={item.id}>
            <td><input type="checkbox" /></td>
            <td><img src={item.image} alt={item.name} width="80" className="rounded shadow-sm" /></td>
            <td className="fw-semibold">{item.name}</td>
            <td>{item.breed || "—"}</td>
            <td>
              <select
                className="form-select form-select-sm"
                style={{ width: "140px" }}
                value={item.status || ""}
                onChange={(e) => handleStatusChange(item.id, e.target.value)}
                disabled={buttonLoading[item.id]}
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
                <option value="sold">Sold</option>
                <option value="retired">Retired</option>
              </select>
            </td>
            <td>
              <button
                className="btn btn-sm btn-success"
                onClick={() => handleViewPrice(item.id)}
              >
                View Price
              </button>
            </td>
            <td>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-primary" onClick={() => handleViewUpdate(item.id)}>
                  <FaEye /> View / Update
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            </td>
          </tr>
        );
      }

      if (type === "semen") {
        return (
          <tr key={item.id}>
            <td><input type="checkbox" /></td>
            <td>{item.batch_number || "—"}</td>
            <td>{item.bull_name || "—"}</td>
            <td>{item.batch_number || "—"}</td>
            <td>{item.availability ? "Available" : "Unavailable"}</td>
            <td>
              <button
                className="btn btn-sm btn-success"
                onClick={() => handleViewPrice(item.id)}
              >
                View Price
              </button>
            </td>
            <td>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-primary" onClick={() => handleViewUpdate(item.id)}>
                  <FaEye /> View / Update
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            </td>
          </tr>
        );
      }

      if (type === "embryo") {
        return (
          <tr key={item.id}>
            <td><input type="checkbox" /></td>
            <td><img src={item.image} alt={item.embryo_id} width="80" className="rounded shadow-sm" /></td>
            <td>{item.name || "—"}</td>
            <td>{item.sire?.name || "—"}</td>
            <td>{item.dam?.name || "—"}</td>
            <td>{item.sire?.breed || "—"}</td>
            <td>{item.availability ? "Available" : "Unavailable"}</td>
            <td>
              <button
                className="btn btn-sm btn-success"
                onClick={() => handleViewPrice(item.id)}
              >
                View Price
              </button>
            </td>
            <td>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-primary" onClick={() => handleViewUpdate(item.id)}>
                  <FaEye /> View / Update
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            </td>
          </tr>
        );
      }
      return null;
    });
  };

  return (
    <div className="bg-white p-3 rounded shadow-lg">
      {/* 🔍 Search & Filter */}
      <div className="row mb-3 align-items-end">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder={`Search by ${entityName} Name`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-2">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
            <option value="sold">Sold</option>
            <option value="retired">Retired</option>
          </select>
        </div>
      </div>

      {/* 🧬 Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle text-nowrap">
          <thead>{renderTableHeaders()}</thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>

      {/* 📄 Enhanced Pagination UI */}
      {filteredRecords.length > 0 && (
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-3 gap-3">
          {/* Showing range info */}
          <div className="text-muted small">
            Showing <strong>{indexOfFirst + 1}</strong>–
            <strong>{Math.min(indexOfLast, filteredRecords.length)}</strong> of{" "}
            <strong>{filteredRecords.length}</strong> results
          </div>

          {/* Select items per page */}
          <div className="d-flex align-items-center gap-2">
            <label className="text-muted small mb-0">Rows per page:</label>
            <select
              className="form-select form-select-sm w-auto"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          {/* Page navigation */}
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FaChevronLeft /> Prev
            </button>
            <span className="small fw-semibold">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
