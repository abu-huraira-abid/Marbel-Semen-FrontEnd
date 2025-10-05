import { useState } from "react";
import SideBar from "../SideBar";
import AddBullModal from "./AddBullModal";
import BullTable from "./BullTable";
import { useReducer } from "react";

export default function BullsManagement() {
  const [showModal, setShowModal] = useState(false);
  const [value,forceReducer] = useReducer(x => x+1 , 0)

  // When user saves a bull from modal
  const handleSaveBull = (bull) => {
    console.log("New bull added:", bull);
    forceReducer()
    setShowModal(false);
  };

  return (
    <>
      <div className="row bg-light" style={{ fontFamily: "Poppins" }}>
        <div className="col-lg-3">
          <SideBar />
        </div>
        <div className="container col-12 col-lg-9 p-4 p-lg-0 py-lg-4">
          <div className="row">
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center my-4 my-lg-0">
              <h1
                className="my-3 text-center fw-bold"
                style={{ fontFamily: "Syne" }}
              >
                BULLS Management
              </h1>
              <button
                className="btn btn-dark rounded-1 px-4 d-flex align-items-center gap-2"
                onClick={() => setShowModal(true)}
              >
                <i className="bi bi-plus-circle"></i>
                Add Bull
              </button>
            </div>

            <BullTable value={value} />

            {/* Modal */}
            <AddBullModal
              show={showModal}
              onClose={() => setShowModal(false)}
              onSave={handleSaveBull}
            />
          </div>
        </div>
      </div>
    </>
  );
}
