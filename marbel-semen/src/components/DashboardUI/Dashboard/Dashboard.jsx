import SideBar from "../SideBar";
import ActiveSemenStrawsCard from "./ActiveSemenStrewCard";
import LowStockAlertsCard from "./LowStockAlertsCards";
import MonthlySalesCard from "./MonthlySalesCard";
import QuickLinksGrid from "./QuickLinksGrid";
import TotalBullsCard from "./TotalBullsCard";

export default function Dashboard() {
  return (
    <>
      <div className="row bg-light" style={{ fontFamily: "Poppins" }}>
        <div className="col-lg-3">
          <SideBar />
        </div>
        <div className="container col-9 py-4">
          <div className="row">
            <h1 className="my-3 mb-5 fw-bold" style={{ fontFamily: "Syne" }}>
              DASHBOARD
            </h1>
            <div className="col-12 col-md-6 col-lg-3 my-2 my-lg-0">
              <TotalBullsCard />
            </div>
            <div className="col-12 col-md-6 col-lg-3 my-2 my-lg-0">
              <ActiveSemenStrawsCard />
            </div>
            <div className="col-12 col-md-6 col-lg-3 my-2 my-lg-0">
              <MonthlySalesCard />
            </div>
            <div className="col-12 col-md-6 col-lg-3 my-2 my-lg-0">
              <LowStockAlertsCard />
            </div>
            <QuickLinksGrid />
          </div>
        </div>
      </div>
    </>
  );
}
