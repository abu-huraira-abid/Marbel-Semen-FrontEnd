import { useParams } from "react-router-dom";
import SideBar from "../SideBar";
import AnimalData from "./AnimalData";

export default function AnimalView() {
  const { entityType, id } = useParams(); 
  // entityType = "bulls" | "semen" | "embryo"
  // id = selected entity's ID

  const ENTITY_LABELS = {
    bulls: "Bull",
    semen: "Semen",
    embryo: "Embryo",
  };

  return (
    <div className="row bg-light" style={{ fontFamily: "Poppins" }}>
      {/* Sidebar */}
      <div className="col-3">
        <SideBar />
      </div>

      {/* Main Section */}
      <div className="col-12 col-lg-9 p-5 p-lg-2">
        {/* Pass type + id to AnimalData */}
        <AnimalData entityType={entityType} entityId={id} />
      </div>
    </div>
  );
}
