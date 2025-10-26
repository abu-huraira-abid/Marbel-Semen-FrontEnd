import { useState, useReducer } from "react";
import SideBar from "../SideBar";
import AddItemModal from "./AddItemModal";
import EntityTable from "./EntityTable";

export default function EntityManagement() {
  const [showModal, setShowModal] = useState(false);
  const [entityType, setEntityType] = useState("bull"); // default is bull
  const [value, forceReducer] = useReducer((x) => x + 1, 0);

  // Clean label mapping
  const ENTITY_LABELS = {
    bull: "Bull",
    semen: "Semen",
    embryo: "Embryo",
  };

  // When user saves a record
  const handleSave = (record) => {
    console.log(`New ${entityType} added:`, record);
    forceReducer(); // Refresh the table
    setShowModal(false);
  };

  return (
    <div className="row bg-light" style={{ fontFamily: "Poppins" }}>
      {/* Sidebar */}
      <div className="col-lg-3">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="container col-12 col-lg-9 p-4 p-lg-0 py-lg-4">
        <div className="d-flex align-items-center">
          <h4 style={{fontFamily:"Syne"}}>Select for Management View</h4>
          <select
            className="form-select w-auto mx-3"
            value={entityType}
            onChange={(e) => setEntityType(e.target.value)}
          >
            <option value="bull">Bull</option>
            <option value="semen">Semen</option>
            <option value="embryo">Embryo</option>
          </select>
        </div>
        <div className="row">
          {/* Header */}
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center my-4 my-lg-0">
            <div className="d-flex flex-column flex-lg-row align-items-center gap-3">
              <h1
                className="my-3 text-center fw-bold"
                style={{ fontFamily: "Syne" }}
              >
                {ENTITY_LABELS[entityType]} Management
              </h1>

              {/* Dropdown Selector */}
            </div>

            {/* Add Button */}
            <button
              className="btn btn-dark rounded-1 px-4 d-flex align-items-center gap-2"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-plus-circle"></i>
              Add {ENTITY_LABELS[entityType]}
            </button>
          </div>

          {/* Dynamic Table */}
          <EntityTable type={entityType} value={value} />

          {/* Dynamic Modal */}
          <AddItemModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onSave={handleSave}
            type={entityType}
          />
        </div>
      </div>
    </div>
  );
}
