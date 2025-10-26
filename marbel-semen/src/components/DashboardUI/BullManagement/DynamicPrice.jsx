import { useParams } from "react-router-dom";
import SideBar from "../SideBar";
import BullPricePackages from "./BullPricePackages";
import SemenPricePackages from "./SemenPricePackages";
import EmbryoPricePackages from "./EmbryoPricePackages";

export default function DynamicPrice() {
  const { entityType } = useParams(); 
  // entityType will be "bulls", "semen", or "embryo"

  // Labels for heading
  const ENTITY_LABELS = {
    bulls: "Bull",
    semen: "Semen",
    embryo: "Embryo",
  };

  // Dynamically render the correct price packages
  const renderPricePackages = () => {
    switch (entityType) {
      case "semens":
        return <SemenPricePackages />;
      case "embryos":
        return <EmbryoPricePackages />;
      default:
        return <BullPricePackages />;
    }
  };

  return (
    <div className="row bg-light" style={{ fontFamily: "Poppins" }}>
      {/* Sidebar */}
      <div className="col-lg-3">
        <SideBar />
      </div>

      {/* Main Section */}
      <div className="container col-12 col-lg-9 p-4 p-lg-0 py-lg-4">
        {/* Header */}
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center mb-4">
          <h1
            className="fw-bold text-center"
            style={{ fontFamily: "Syne" }}
          >
             Price Management
          </h1>
        </div>

        {/* Dynamic Component */}
        {renderPricePackages()}
      </div>
    </div>
  );
}
