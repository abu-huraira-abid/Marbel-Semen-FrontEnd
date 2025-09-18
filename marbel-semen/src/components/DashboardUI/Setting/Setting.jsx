
import SideBar from "../SideBar";
import ChangePassword from "./ChangePassword";
import ProfileUpdate from "./ProfileUpdate";

export default function Setting() {
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
                Settings
              </h1>
            </div>
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center my-4 my-lg-0">
              <h2
                className="my-3 text-center fw-bold"
                style={{ fontFamily: "Syne" }}
              >
                Settings
              </h2> 
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <ProfileUpdate />
                </div>
                <div className="col-12 col-md-6">
                    <ChangePassword />
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
