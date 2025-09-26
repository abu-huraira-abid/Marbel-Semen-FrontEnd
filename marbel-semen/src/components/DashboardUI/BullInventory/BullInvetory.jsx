import SideBar from "../SideBar";
import Inventory from "./Inventory";

export default function BullInventory() {
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
              BULL Inventory Management
            </h1>
          </div>
          <Inventory />
        </div>
      </div>
    </>
  );
}
