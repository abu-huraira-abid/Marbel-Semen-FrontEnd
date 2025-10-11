// src/components/CustomerDashboard/CustomerDashboard.jsx
import SideBar from "../SideBar";
import Wishlist from "./WishList";

export default function UserDashboard() {
  return (
    <div className="row bg-light" style={{ fontFamily: "Poppins",minHeight:"100vh" }}>
      <div className="col-lg-3">
        <SideBar />
      </div>
      <div className="container col-12 col-lg-9 p-4 p-lg-0 py-lg-4">
        <div className="row">
          <h1
            className="my-3 mb-5 fw-bold text-center text-lg-start"
            style={{ fontFamily: "Syne" }}
          >
            MY WISH-LIST
          </h1>
        </div>
        <Wishlist />
      </div>
    </div>
  );
}
