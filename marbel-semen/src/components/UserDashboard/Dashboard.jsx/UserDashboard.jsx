// src/components/CustomerDashboard/CustomerDashboard.jsx
import SideBar from "../SideBar";
import MyWishlistCard from "./MyWishlistCard";
import MyOrdersCard from "./MyOrdersCard";
import CompleteOrdersCard from "./CompleteOrdersCard";
import RecentOrdersCard from "./RecentOrdersCard";
import QuickLinksGrid from "./QuickLinksGrid";

export default function UserDashboard() {
  return (
    <div className="row bg-light" style={{ fontFamily: "Poppins" }}>
      <div className="col-lg-3">
        <SideBar />
      </div>
      <div className="container col-12 col-lg-9 p-4 p-lg-0 py-lg-4">
        <div className="row">
          <h1
            className="my-3 mb-5 fw-bold text-center text-lg-start"
            style={{ fontFamily: "Syne" }}
          >
            MY DASHBOARD
          </h1>

          {/* Cards */}
          <div className="col-12 col-md-6 col-lg-3 my-2">
            <MyWishlistCard />
          </div>
          <div className="col-12 col-md-6 col-lg-3 my-2">
            <MyOrdersCard />
          </div>
          <div className="col-12 col-md-6 col-lg-3 my-2">
            <RecentOrdersCard />
          </div>
          <div className="col-12 col-md-6 col-lg-3 my-2">
            <CompleteOrdersCard />
          </div>

          {/* Quick Links */}
          <QuickLinksGrid />
        </div>
      </div>
    </div>
  );
}
