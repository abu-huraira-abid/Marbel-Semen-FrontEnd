import SideBar from "../SideBar";

export default function BullsManagement() {
  return (
    <>
      <div className="row bg-light" style={{ fontFamily: "Poppins" }}>
        <div className="col-lg-3">
          <SideBar />
        </div>
        <div className="container col-9 py-4">
          <div className="row">
            <h1 className="my-3 mb-5 fw-bold" style={{ fontFamily: "Syne" }}>
              BULLS Management
            </h1>
            
          </div>
        </div>
      </div>
    </>
  );
}
