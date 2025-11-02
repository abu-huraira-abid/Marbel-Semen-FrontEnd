import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

export default function Inventory() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [entityType, setEntityType] = useState("bulls"); // bulls | semens | embryos
  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updatedQuantity, setUpdatedQuantity] = useState("");

  const [searchName, setSearchName] = useState("");
  const [searchBreed, setSearchBreed] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const token = localStorage.getItem("access_token");

  // Fetch inventory based on selected entity type
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/${entityType}/stocks/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data);
        setInventory(res.data.data || res.data.results?.data || res.data.results || []);
      } catch (error) {
        console.error("Error loading inventory:", error.response?.data || error);
        Swal.fire({
          icon: "error",
          title: `Failed to Load ${entityType}`,
          text: error.response?.data?.message || "Please try again later.",
        });
      }
    };
    fetchData();
  }, [BASE_URL, token, entityType]);

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setUpdatedQuantity(item.quantity || 0);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!selectedItem) return;

    const result = await Swal.fire({
      title: "Confirm Update",
      text: `Update quantity of "${selectedItem.name || "Item"}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.patch(
        `${BASE_URL}/${entityType}/${selectedItem.id}/stocks/`,
        { quantity: updatedQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setInventory((prev) =>
        prev.map((item) =>
          item.id === selectedItem.id
            ? { ...item, quantity: updatedQuantity }
            : item
        )
      );

      setShowModal(false);

      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        text: `${selectedItem.name || "Item"} quantity updated.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error updating inventory:", error.response?.data || error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || "Something went wrong.",
      });
    }
  };

  // Determine columns dynamically
  const getColumns = () => {
    if (entityType === "bulls") {
      return ["Image", "Name", "Breed", "Quantity"];
    }
    if (entityType === "semens") {
      return ["Bull Name", "Quantity"];
    }
    if (entityType === "embryos") {
      return ["Name","Sire Name", "Dam Name", "Quantity"];
    }
    return [];
  };

  // Filter logic
  const filteredInventory = inventory.filter((item) => {
    const name = item?.name || item?.bull__name || item?.sire__name || "";
    const breed = item?.breed || item?.dam__name || "";
    const matchesName = name.toLowerCase().includes(searchName.toLowerCase());
    const matchesBreed = breed.toLowerCase().includes(searchBreed.toLowerCase());

    const quantity = item?.quantity ?? 0;
    const status =
      quantity === 0 ? "danger" : quantity <= 5 ? "alert" : "success";
    const matchesStatus = searchStatus ? status === searchStatus : true;

    return matchesName && matchesBreed && matchesStatus;
  });

  const totalPages = Math.ceil(filteredInventory.length / pageSize);
  const paginatedInventory = filteredInventory.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container py-5">
      {/* Header and Selector */}
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <h2 className="fw-bold" style={{ fontFamily: "Syne" }}>
          {entityType === "bulls"
            ? "Bull Inventory"
            : entityType === "semens"
            ? "Semen Inventory"
            : "Embryo Inventory"}
        </h2>

        <select
          className="form-select"
          value={entityType}
          onChange={(e) => setEntityType(e.target.value)}
          style={{ maxWidth: "250px" }}
        >
          <option value="bulls">Bulls</option>
          <option value="semens">Semen</option>
          <option value="embryos">Embryos</option>
        </select>
      </div>

      {/* Filters */}
      <div className="card shadow-sm border-0 mb-4">
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
            placeholder={
              entityType === "embryos"
                ? "Search by Dam Name"
                : "Search by Breed"
            }
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
                  {getColumns().map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedInventory.map((item) => (
                  <tr key={item.id}>
                    {entityType === "bulls" && (
                      <>
                        <td>
                          <img
                            src={item?.image}
                            alt={item?.name}
                            className="rounded-2"
                            style={{
                              width: "80px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td className="fw-semibold">{item?.name}</td>
                        <td>{item?.breed}</td>
                        <td>
                          <span
                            className={`badge px-3 py-2 fs-6 rounded-0 ${
                              item?.quantity === 0
                                ? "bg-danger"
                                : item?.quantity <= 5
                                ? "bg-warning text-dark"
                                : "bg-success"
                            }`}
                            style={{width:"80px"}}
                          >
                            {item?.quantity ?? 0}
                          </span>
                        </td>
                      </>
                    )}

                    {entityType === "semens" && (
                      <>
                        <td className="fw-semibold">{item?.bull__name}</td>
                        <td>
                          <span
                            className={`badge px-3 py-2 fs-6 rounded-0 ${
                              item?.quantity === 0
                                ? "bg-danger"
                                : item?.quantity <= 5
                                ? "bg-warning text-dark"
                                : "bg-success"
                            }`}
                            style={{width:"80px"}}
                          >
                            {item?.quantity ?? 0}
                          </span>
                        </td>
                      </>
                    )}

                    {entityType === "embryos" && (
                      <>
                        <td>{item?.name}</td>
                        <td>{item?.sire__name}</td>
                        <td>{item?.dam__name}</td>
                        <td>
                          <span
                            className={`badge px-3 py-2 fs-6 rounded-0 ${
                              item?.quantity === 0
                                ? "bg-danger"
                                : item?.quantity <= 5
                                ? "bg-warning text-dark"
                                : "bg-success"
                            }`}
                            style={{width:"80px"}}
                          >
                            {item?.quantity ?? 0}
                          </span>
                        </td>
                      </>
                    )}

                    <td className="text-center">
                      <button
                        className="btn btn-primary btn-sm d-flex align-items-center mx-auto rounded-1 px-4"
                        onClick={() => handleEditClick(item)}
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
                No records found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {filteredInventory.length > 0 && (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 px-2">
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
      {showModal && selectedItem && (
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
                <div className="mb-3">
                  {entityType === "bulls" && (
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={selectedItem?.image}
                        alt={selectedItem?.name}
                        className="rounded-3 border me-3"
                        style={{
                          width: "100px",
                          height: "70px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <h5 className="m-0">{selectedItem?.name}</h5>
                        <small className="text-muted">{selectedItem?.breed}</small>
                      </div>
                    </div>
                  )}

                  {entityType === "semens" && (
                    <h5 className="mb-2">
                      Bull: <span className="text-primary">{selectedItem?.bull__name}</span>
                    </h5>
                  )}

                  {entityType === "embryos" && (
                    <>
                      <h6>Sire: <span className="text-primary">{selectedItem?.sire__name}</span></h6>
                      <h6>Dam: <span className="text-primary">{selectedItem?.dam__name}</span></h6>
                    </>
                  )}
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
