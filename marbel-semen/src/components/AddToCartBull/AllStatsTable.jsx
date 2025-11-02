import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Helper to generate random stats
const randomStat = (min, max, decimals = 1, withPercentile = true) => {
  const value = (Math.random() * (max - min) + min).toFixed(decimals);
  const percentile = withPercentile
    ? `${Math.floor(Math.random() * 40 + 60)}%` // 60–99%
    : undefined;
  return { value: parseFloat(value), percentile };
};

const bulls = [
  {
    id: 1,
    name: "Champion Wagyu Bull",
    breed: "Wagyu",
    image: "https://copilot.microsoft.com/th/id/BCO.80397891-1a9a-4ee1-9f7c-d4f304256098.png",
    stats: {
      Gestation_Length: { value: 1.0, percentile: "90%" },
      Birth_Weight_kg: { value: -0.9, percentile: "95%" },
      Weight_200_Days_kg: { value: 3, percentile: "92%" },
      Weight_400_Days_kg: { value: 4, percentile: "93%" },
      Weight_600_Days_kg: { value: 12, percentile: "91%" },
      Mature_Cow_Weight_kg: { value: 3, percentile: "77%" },
      Milk_kg: { value: 3, percentile: "77%" },
      Scrotal_Circumference_cm: { value: -3, percentile: "100%" },
      Carcass_Weight_kg: { value: -13.0, percentile: "88%" },
      Eye_Muscle_Area_sq_cm: { value: 0.12, percentile: "74%" },
      Rump_Fat_mm: { value: 0.25, percentile: "74%" },
      Retail_Beef_Yield_percent: { value: -0.06, percentile: "62%" },
      Marbling_Score: { value: 0.5, percentile: "60%" },
      Marbling_Fineness_Index: { value: 0.6, percentile: "60%" },
      FBF_Index: { value: 5658 },
      F1_Terminal_Index: { value: 509 },
    },
  },
  {
    id: 2,
    name: "Elite Angus Bull",
    breed: "Angus",
    image: "https://copilot.microsoft.com/th/id/BCO.c74f7f1f-481b-4292-a30a-f19de826e740.png",
    stats: {
      Gestation_Length: randomStat(-2, 2),
      Birth_Weight_kg: randomStat(-2, 2),
      Weight_200_Days_kg: randomStat(0, 10),
      Weight_400_Days_kg: randomStat(0, 15),
      Weight_600_Days_kg: randomStat(5, 20),
      Mature_Cow_Weight_kg: randomStat(0, 15),
      Milk_kg: randomStat(-2, 5),
      Scrotal_Circumference_cm: randomStat(-3, 5),
      Carcass_Weight_kg: randomStat(150, 400, 0),
      Eye_Muscle_Area_sq_cm: randomStat(20, 50, 0),
      Rump_Fat_mm: randomStat(0, 2),
      Retail_Beef_Yield_percent: randomStat(50, 80, 0),
      Marbling_Score: randomStat(0, 5),
      Marbling_Fineness_Index: randomStat(0, 5),
      FBF_Index: { value: Math.floor(Math.random() * 6000) },
      F1_Terminal_Index: { value: Math.floor(Math.random() * 800) },
    },
  },
  {
    id: 3,
    name: "Premium Sahiwal Bull",
    breed: "Sahiwal",
    image: "https://copilot.microsoft.com/th/id/BCO.fc49d174-2cba-4412-a939-1b06f993a1ba.png",
    stats: {
      Gestation_Length: randomStat(-2, 2),
      Birth_Weight_kg: randomStat(-2, 2),
      Weight_200_Days_kg: randomStat(0, 12),
      Weight_400_Days_kg: randomStat(0, 15),
      Weight_600_Days_kg: randomStat(5, 18),
      Mature_Cow_Weight_kg: randomStat(0, 12),
      Milk_kg: randomStat(2, 8),
      Scrotal_Circumference_cm: randomStat(-2, 4),
      Carcass_Weight_kg: randomStat(200, 350, 0),
      Eye_Muscle_Area_sq_cm: randomStat(20, 45, 0),
      Rump_Fat_mm: randomStat(0, 2),
      Retail_Beef_Yield_percent: randomStat(55, 75, 0),
      Marbling_Score: randomStat(0, 5),
      Marbling_Fineness_Index: randomStat(0, 5),
      FBF_Index: { value: Math.floor(Math.random() * 6000) },
      F1_Terminal_Index: { value: Math.floor(Math.random() * 800) },
    },
  },
  {
    id: 4,
    name: "Holstein Friesian",
    breed: "Holstein",
    image: "https://copilot.microsoft.com/th/id/BCO.b8c124be-3d2a-4e62-a7f3-f913b679299f.png",
    stats: {
      Gestation_Length: randomStat(-2, 2),
      Birth_Weight_kg: randomStat(-2, 2),
      Weight_200_Days_kg: randomStat(0, 12),
      Weight_400_Days_kg: randomStat(0, 15),
      Weight_600_Days_kg: randomStat(5, 18),
      Mature_Cow_Weight_kg: randomStat(5, 20),
      Milk_kg: randomStat(5, 12),
      Scrotal_Circumference_cm: randomStat(-2, 4),
      Carcass_Weight_kg: randomStat(180, 380, 0),
      Eye_Muscle_Area_sq_cm: randomStat(22, 48, 0),
      Rump_Fat_mm: randomStat(0, 2),
      Retail_Beef_Yield_percent: randomStat(50, 80, 0),
      Marbling_Score: randomStat(0, 5),
      Marbling_Fineness_Index: randomStat(0, 5),
      FBF_Index: { value: Math.floor(Math.random() * 6000) },
      F1_Terminal_Index: { value: Math.floor(Math.random() * 800) },
    },
  },
  {
    id: 5,
    name: "Red Sindhi Bull",
    breed: "Sindhi",
    image: "https://copilot.microsoft.com/th/id/BCO.8a141874-674f-469b-99ad-475ec5dff4b8.png",
    stats: {
      Gestation_Length: randomStat(-2, 2),
      Birth_Weight_kg: randomStat(-2, 2),
      Weight_200_Days_kg: randomStat(0, 10),
      Weight_400_Days_kg: randomStat(0, 14),
      Weight_600_Days_kg: randomStat(5, 16),
      Mature_Cow_Weight_kg: randomStat(0, 12),
      Milk_kg: randomStat(3, 9),
      Scrotal_Circumference_cm: randomStat(-2, 5),
      Carcass_Weight_kg: randomStat(170, 360, 0),
      Eye_Muscle_Area_sq_cm: randomStat(20, 45, 0),
      Rump_Fat_mm: randomStat(0, 2),
      Retail_Beef_Yield_percent: randomStat(55, 75, 0),
      Marbling_Score: randomStat(0, 5),
      Marbling_Fineness_Index: randomStat(0, 5),
      FBF_Index: { value: Math.floor(Math.random() * 6000) },
      F1_Terminal_Index: { value: Math.floor(Math.random() * 800) },
    },
  },
  {
    id: 6,
    name: "Brahman Bull",
    breed: "Brahman",
    image: "https://copilot.microsoft.com/th/id/BCO.bdf84f43-f3d8-4a29-8184-b1723e19d461.png",
    stats: {
      Gestation_Length: randomStat(-2, 2),
      Birth_Weight_kg: randomStat(-2, 2),
      Weight_200_Days_kg: randomStat(0, 12),
      Weight_400_Days_kg: randomStat(0, 15),
      Weight_600_Days_kg: randomStat(6, 20),
      Mature_Cow_Weight_kg: randomStat(0, 15),
      Milk_kg: randomStat(2, 8),
      Scrotal_Circumference_cm: randomStat(-2, 5),
      Carcass_Weight_kg: randomStat(180, 380, 0),
      Eye_Muscle_Area_sq_cm: randomStat(20, 50, 0),
      Rump_Fat_mm: randomStat(0, 2),
      Retail_Beef_Yield_percent: randomStat(50, 80, 0),
      Marbling_Score: randomStat(0, 5),
      Marbling_Fineness_Index: randomStat(0, 5),
      FBF_Index: { value: Math.floor(Math.random() * 6000) },
      F1_Terminal_Index: { value: Math.floor(Math.random() * 800) },
    },
  },
  {
    id: 7,
    name: "Charolais Bull",
    breed: "Charolais",
    image: "https://copilot.microsoft.com/th/id/BCO.6b25b2be-e826-44a1-9b30-b958cc8af722.png",
    stats: {
      Gestation_Length: randomStat(-2, 2),
      Birth_Weight_kg: randomStat(-2, 2),
      Weight_200_Days_kg: randomStat(0, 12),
      Weight_400_Days_kg: randomStat(0, 15),
      Weight_600_Days_kg: randomStat(6, 20),
      Mature_Cow_Weight_kg: randomStat(0, 15),
      Milk_kg: randomStat(2, 8),
      Scrotal_Circumference_cm: randomStat(-2, 5),
      Carcass_Weight_kg: randomStat(200, 400, 0),
      Eye_Muscle_Area_sq_cm: randomStat(20, 50, 0),
      Rump_Fat_mm: randomStat(0, 2),
      Retail_Beef_Yield_percent: randomStat(55, 80, 0),
      Marbling_Score: randomStat(0, 5),
      Marbling_Fineness_Index: randomStat(0, 5),
      FBF_Index: { value: Math.floor(Math.random() * 6000) },
      F1_Terminal_Index: { value: Math.floor(Math.random() * 800) },
    },
  },
  {
    id: 8,
    name: "Hereford Bull",
    breed: "Hereford",
    image: "https://copilot.microsoft.com/th/id/BCO.016aa7b0-6c0a-4f6b-a1a1-322302845993.png",
    stats: {
      Gestation_Length: randomStat(-2, 2),
      Birth_Weight_kg: randomStat(-2, 2),
      Weight_200_Days_kg: randomStat(0, 12),
      Weight_400_Days_kg: randomStat(0, 15),
      Weight_600_Days_kg: randomStat(6, 20),
      Mature_Cow_Weight_kg: randomStat(0, 15),
      Milk_kg: randomStat(2, 8),
      Scrotal_Circumference_cm: randomStat(-2, 5),
      Carcass_Weight_kg: randomStat(200, 400, 0),
      Eye_Muscle_Area_sq_cm: randomStat(20, 50, 0),
      Rump_Fat_mm: randomStat(0, 2),
      Retail_Beef_Yield_percent: randomStat(55, 80, 0),
      Marbling_Score: randomStat(0, 5),
      Marbling_Fineness_Index: randomStat(0, 5),
      FBF_Index: { value: Math.floor(Math.random() * 6000) },
      F1_Terminal_Index: { value: Math.floor(Math.random() * 800) },
    },
  },
  {
    id: 9,
    name: "Belgian Blue Bull",
    breed: "Belgian Blue",
    image: "https://copilot.microsoft.com/th/id/BCO.c253a7cc-d7cd-48b0-9644-c9a38c2ccf23.png",
    stats: {
      Gestation_Length: randomStat(-2, 2),
      Birth_Weight_kg: randomStat(-2, 2),
      Weight_200_Days_kg: randomStat(0, 12),
      Weight_400_Days_kg: randomStat(0, 15),
      Weight_600_Days_kg: randomStat(6, 20),
      Mature_Cow_Weight_kg: randomStat(0, 15),
      Milk_kg: randomStat(2, 8),
      Scrotal_Circumference_cm: randomStat(-2, 5),
      Carcass_Weight_kg: randomStat(200, 420, 0),
      Eye_Muscle_Area_sq_cm: randomStat(20, 55, 0),
      Rump_Fat_mm: randomStat(0, 2),
      Retail_Beef_Yield_percent: randomStat(55, 80, 0),
      Marbling_Score: randomStat(0, 5),
      Marbling_Fineness_Index: randomStat(0, 5),
      FBF_Index: { value: Math.floor(Math.random() * 6000) },
      F1_Terminal_Index: { value: Math.floor(Math.random() * 800) },
    },
  },
  {
    id: 10,
    name: "Nili-Ravi Bull",
    breed: "Nili-Ravi",
    image: "https://copilot.microsoft.com/th/id/BCO.1a276348-d565-4260-9808-49931878bae7.png",
    stats: {
      Gestation_Length: randomStat(-2, 2),
      Birth_Weight_kg: randomStat(-2, 2),
      Weight_200_Days_kg: randomStat(0, 12),
      Weight_400_Days_kg: randomStat(0, 15),
      Weight_600_Days_kg: randomStat(6, 20),
      Mature_Cow_Weight_kg: randomStat(0, 15),
      Milk_kg: randomStat(2, 10),
      Scrotal_Circumference_cm: randomStat(-2, 5),
      Carcass_Weight_kg: randomStat(200, 400, 0),
      Eye_Muscle_Area_sq_cm: randomStat(20, 50, 0),
      Rump_Fat_mm: randomStat(0, 2),
      Retail_Beef_Yield_percent: randomStat(55, 80, 0),
      Marbling_Score: randomStat(0, 5),
      Marbling_Fineness_Index: randomStat(0, 5),
      FBF_Index: { value: Math.floor(Math.random() * 6000) },
      F1_Terminal_Index: { value: Math.floor(Math.random() * 800) },
    },
  },
];


const prices = [
  { qty: "1 - 4", value: 350 },
  { qty: "5 - 20", value: 300 },
  { qty: "21 - 30", value: 275 },
  { qty: "31+", value: 250 },
];

// Formatter for values
const formatStat = (stat) => {
  if (!stat) return "-";
  const { value, percentile } = stat;
  const cls =
    value > 0
      ? "text-success fw-semibold"
      : value < 0
      ? "text-danger fw-semibold"
      : "text-secondary";
  const sign = value > 0 ? "+" : "";
  return (
    <div className={cls}>
      {sign}
      {value}
      {percentile && <div className="small">{percentile}</div>}
    </div>
  );
};

export default function AllStatsTable() {
  const headers = [
    "Bull",
    "Gest. L.",
    "Birth Wt kg",
    "200 D Wt kg",
    "400 D Wt kg",
    "600 D Wt kg",
    "Mat Cow Wt kg",
    "Milk kg",
    "Scrot. cm",
    "Carc. Wt kg",
    "Eye Musc. A. sq cm",
    "Rump Fat mm",
    "Ret. Beef Yld %",
    "Marb. Score",
    "Marb. Fine. Idx",
    "FBF Idx",
    "F1 Term. Idx",
    "Buy",
  ];

  const [selectedBull, setSelectedBull] = useState(null);

  return (
    <div className="container-fluid py-4">
      <div className="container-fluid">
        <h3 className="text-center mb-4">Bull Comparison Table</h3>

        <div
          className="table-responsive"
          style={{ maxHeight: "400px", overflow: "auto" }}
        >
          <table className="table table-bordered text-center align-middle">
            <thead className="table-primary sticky-top">
              <tr>
                {headers.map((header, idx) => (
                  <th
                    key={idx}
                    style={{ minWidth: idx === 0 ? "220px" : "130px" }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bulls.map((bull) => (
                <tr key={bull.id}>
                  {/* Bull Info */}
                  <td className="text-start table-light">
                    <div className="fw-bold">{bull.name}</div>
                    <div className="small text-muted">{bull.breed}</div>
                  </td>

                  {/* Stats */}
                  <td>{formatStat(bull.stats.Gestation_Length)}</td>
                  <td>{formatStat(bull.stats.Birth_Weight_kg)}</td>
                  <td>{formatStat(bull.stats.Weight_200_Days_kg)}</td>
                  <td>{formatStat(bull.stats.Weight_400_Days_kg)}</td>
                  <td>{formatStat(bull.stats.Weight_600_Days_kg)}</td>
                  <td>{formatStat(bull.stats.Mature_Cow_Weight_kg)}</td>
                  <td>{formatStat(bull.stats.Milk_kg)}</td>
                  <td>{formatStat(bull.stats.Scrotal_Circumference_cm)}</td>
                  <td>{formatStat(bull.stats.Carcass_Weight_kg)}</td>
                  <td>{formatStat(bull.stats.Eye_Muscle_Area_sq_cm)}</td>
                  <td>{formatStat(bull.stats.Rump_Fat_mm)}</td>
                  <td>{formatStat(bull.stats.Retail_Beef_Yield_percent)}</td>
                  <td>{formatStat(bull.stats.Marbling_Score)}</td>
                  <td>{formatStat(bull.stats.Marbling_Fineness_Index)}</td>
                  <td>{bull.stats.FBF_Index.value}</td>
                  <td>{bull.stats.F1_Terminal_Index.value}</td>

                  {/* Buy Button */}
                  <td className="table-light">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setSelectedBull(bull)}
                    >
                      View Prices
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedBull && (
  <div
    className="modal fade show d-block"
    tabIndex="-1"
    style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
  >
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">
            {selectedBull.name} ({selectedBull.breed})
          </h5>
          <button
            className="btn-close"
            onClick={() => setSelectedBull(null)}
          ></button>
        </div>

        <div className="modal-body">
          <div className="row">
            {/* Left: Bull Image */}
            <div className="col-12 col-lg-6">
              <img
                src={selectedBull.image}
                alt={selectedBull.name}
                className="img-fluid rounded-3"
              />
            </div>

            {/* Right: Details */}
            <div className="col-12 col-lg-6 d-flex flex-column justify-content-center mt-4 mt-lg-0">
              <div
                className="display-5 fw-light"
                style={{ fontFamily: "Syne" }}
              >
                {selectedBull.name}
              </div>

              <div className="my-2 fs-5">
                <span className="fs-3 text-success">Breed: </span>
                {selectedBull.breed}
              </div>

              <div className="my-2 fs-5">
                <span className="fs-3 text-primary">Price: </span>
                {prices.map((p, i) => (
                  <div className="mx-5" key={i}>
                    <strong>{p.qty}:</strong> ${p.value}
                  </div>
                ))}
              </div>

              <div className="my-2 fs-5 text-danger">REG # WYNFR308H</div>

              <button
                className="btn btn-success btn-lg flex-fill rounded-1 my-2 w-50"
                onClick={() => Navigate("/add-cart")}
              >
                <i className="bi bi-cart-plus me-1"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
