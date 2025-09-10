import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Import your separate table components
import AllStatsTable from "./AllStatsTable";
import EssentialStatsTable from "./EssentialStatsTable";
import GrowthStatsTable from "./GrowthStatsTable";
import CarcassStatsTable from "./CarcassStatsTable";
import IndexesTable from "./IndexesTable";

export default function Tables() {
  const [activeTable, setActiveTable] = useState("all");

  const renderTable = () => {
    switch (activeTable) {
      case "essential":
        return <EssentialStatsTable />;
      case "growth":
        return <GrowthStatsTable />;
      case "carcass":
        return <CarcassStatsTable />;
      case "indexes":
        return <IndexesTable />;
      default:
        return <AllStatsTable />;
    }
  };

  return (
    <div className="container-fluid py-4">
      <h1 className="text-center mb-4" style={{fontFamily:"Syne"}}>Bull Statistics</h1>

      {/* Buttons */}
      <div className="d-flex justify-content-center mb-4 flex-wrap">
        <button
          className={`btn mx-2 mb-2 ${
            activeTable === "all" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActiveTable("all")}
        >
          All Stats
        </button>
        <button
          className={`btn mx-2 mb-2 ${
            activeTable === "essential" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActiveTable("essential")}
        >
          Essential Stats
        </button>
        <button
          className={`btn mx-2 mb-2 ${
            activeTable === "growth" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActiveTable("growth")}
        >
          Growth Stats
        </button>
        <button
          className={`btn mx-2 mb-2 ${
            activeTable === "carcass" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActiveTable("carcass")}
        >
          Carcass Stats
        </button>
        <button
          className={`btn mx-2 mb-2 ${
            activeTable === "indexes" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActiveTable("indexes")}
        >
          Indexes
        </button>
      </div>

      {/* Table Renderer */}
      <div className="p-3 rounded shadow-sm">{renderTable()}</div>
    </div>
  );
}
