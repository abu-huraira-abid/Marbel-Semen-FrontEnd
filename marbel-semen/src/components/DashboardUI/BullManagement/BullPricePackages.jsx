import SideBar from "../SideBar";
import PricePackages from "./PricePackages";

export default function BullPricePackages() {
  return (
    <div className="row">
      <div className="col-3">
        <SideBar />
      </div>
      <div className="col-12 col-lg-9 p-5 p-lg-2">
        <PricePackages entityType="bulls" />
      </div>
    </div>
  );
}
