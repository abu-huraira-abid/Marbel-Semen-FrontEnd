import { useState } from "react";
import SideBar from "../SideBar";
import UserTable from "./UserTable";
import UserModal from "./UserModal"; // 👈 import modal

export default function UsersManagement() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="row">
        <div className="col-3">
          <SideBar />
        </div>
        <div className="container col-12 col-lg-9 p-4 px-lg-2 py-lg-4">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center my-4 my-lg-0">
            <h1
              className="my-3 text-center fw-bold"
              style={{ fontFamily: "Syne" }}
            >
              Users Management
            </h1>
            <button
              className="btn btn-dark rounded-1 px-4 d-flex align-items-center gap-2"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-plus"></i>
              Add New User
            </button>
          </div>
          <UserTable />
        </div>
      </div>

      {/* Modal */}
      <UserModal show={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
}
