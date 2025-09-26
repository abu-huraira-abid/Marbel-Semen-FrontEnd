import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

export default function Inventory() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBull, setSelectedBull] = useState(null);
  const [updatedQuantity, setUpdatedQuantity] = useState("");

  // Fetch inventories and bulls, then merge
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. get existing inventories
        const invRes = await axios.get(`${BASE_URL}/api/bulls/inventories/`);
        const inventories = invRes.data; // [{id, bull_id, quantity}, ...]

        // 2. get bulls
        const bullsRes = await axios.get(
          `${BASE_URL}/api/bulls/avaiable-in-stock/`
        );
        const bulls = bullsRes.data; // [{id, name, breed, image}, ...]

        let merged = [];

        // 3. merge bulls with inventories
        for (const bull of bulls) {
          const inv = inventories.find((i) => i.bull_id === bull.id);

          if (inv) {
            merged.push({
              ...bull,
              quantity: inv.quantity,
              invId: inv.id,
            });
          } else {
            // 4. create new inventory for missing bulls
            const newInv = await axios.post(
              `${BASE_URL}/api/bulls/inventories/`,
              {
                bull_id: bull.id,
                quantity: 0,
              }
            );
            merged.push({
              ...bull,
              quantity: newInv.data.quantity,
              invId: newInv.data.id,
            });
          }
        }

        setInventory(merged);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, [BASE_URL]);

  const handleEditClick = (bull) => {
    setSelectedBull(bull);
    setUpdatedQuantity(bull.quantity);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (selectedBull) {
        // Update backend
        await axios.patch(
          `${BASE_URL}/api/bulls/inventories/${selectedBull.invId}/`,
          {
            bull_id: selectedBull.id,
            quantity: updatedQuantity,
          }
        );

        // Update UI state
        setInventory((prev) =>
          prev.map((item) =>
            item.id === selectedBull.id
              ? { ...item, quantity: updatedQuantity }
              : item
          )
        );
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error updating inventory:", error);
    }
  };

  return (
    <div className="container py-5">
      {/* Inventory Table */}
      <div className="card shadow-lg border-0 rounded-3">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Bull Name</th>
                  <th scope="col">Breed</th>
                  <th scope="col">Quantity</th>
                  <th scope="col" className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((bull) => (
                  <tr key={bull.id}>
                    <td>
                      <img
                        src={bull.image}
                        alt={bull.name}
                        className="rounded-circle border"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td className="fw-semibold">{bull.name}</td>
                    <td>{bull.breed}</td>
                    <td>
                      <span className="badge bg-primary px-3 py-2 fs-6">
                        {bull.quantity}
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-outline-warning btn-sm d-flex align-items-center mx-auto"
                        onClick={() => handleEditClick(bull)}
                      >
                        <FaEdit className="me-1" /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Custom Bootstrap Modal */}
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
                        className="rounded-circle border me-3"
                        style={{
                          width: "70px",
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
