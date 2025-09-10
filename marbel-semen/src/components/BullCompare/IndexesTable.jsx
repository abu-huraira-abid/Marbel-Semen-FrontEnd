import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const bulls = [
  {
    id: 1,
    name: "Champion Wagyu Bull",
    image:
      "https://copilot.microsoft.com/th/id/BCO.80397891-1a9a-4ee1-9f7c-d4f304256098.png",
    breed: "Wagyu",
    description: "Superior marbling genetics with proven pedigree.",
  },
  {
    id: 2,
    name: "Elite Angus Bull",
    image:
      "https://copilot.microsoft.com/th/id/BCO.c74f7f1f-481b-4292-a30a-f19de826e740.png",
    breed: "Angus",
    description: "High fertility rates and consistent performance.",
  },
  {
    id: 3,
    name: "Premium Sahiwal Bull",
    image:
      "https://copilot.microsoft.com/th/id/BCO.fc49d174-2cba-4412-a939-1b06f993a1ba.png",
    breed: "Sahiwal",
    description: "Strong adaptability and reliable milk genetics.",
  },
  {
    id: 4,
    name: "Holstein Friesian",
    image:
      "https://copilot.microsoft.com/th/id/BCO.b8c124be-3d2a-4e62-a7f3-f913b679299f.png",
    breed: "Holstein",
    description: "Excellent milk yield and superior dairy genetics.",
  },
  {
    id: 5,
    name: "Red Sindhi Bull",
    image:
      "https://copilot.microsoft.com/th/id/BCO.8a141874-674f-469b-99ad-475ec5dff4b8.png",
    breed: "Sindhi",
    description: "Renowned for resilience and fertility performance.",
  },
  {
    id: 6,
    name: "Brahman Bull",
    image:
      "https://copilot.microsoft.com/th/id/BCO.bdf84f43-f3d8-4a29-8184-b1723e19d461.png",
    breed: "Brahman",
    description: "Heat-tolerant and resilient, ideal for tropical climates.",
  },
  {
    id: 7,
    name: "Charolais Bull",
    image:
      "https://copilot.microsoft.com/th/id/BCO.6b25b2be-e826-44a1-9b30-b958cc8af722.png",
    breed: "Charolais",
    description: "Known for rapid growth, heavy muscling, and beef quality.",
  },
  {
    id: 8,
    name: "Hereford Bull",
    image:
      "https://copilot.microsoft.com/th/id/BCO.016aa7b0-6c0a-4f6b-a1a1-322302845993.png",
    breed: "Hereford",
    description: "Hardy and adaptable with excellent meat yield.",
  },
  {
    id: 9,
    name: "Belgian Blue Bull",
    image:
      "https://copilot.microsoft.com/th/id/BCO.c253a7cc-d7cd-48b0-9644-c9a38c2ccf23.png",
    breed: "Belgian Blue",
    description: "Famous for double-muscling and high lean meat percentage.",
  },
  {
    id: 10,
    name: "Nili-Ravi Bull",
    image:
      "https://copilot.microsoft.com/th/id/BCO.1a276348-d565-4260-9808-49931878bae7.png",
    breed: "Nili-Ravi",
    description:
      "Renowned Pakistani breed for both milk and breeding strength.",
  },
];

const prices = [
  { qty: "1 - 4", value: 350 },
  { qty: "5 - 20", value: 300 },
  { qty: "21 - 30", value: 275 },
  { qty: "31+", value: 250 },
];

export default function IndexesStat() {
  const [selectedBull, setSelectedBull] = useState(null);

  const headers = ["Bull", "Brd. Fdr. Idx", "FB Term. Idx", "F1 Term. Idx", "Buy"];

  // random index generator
  const randomIndex = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  return (
    <div className="container-fluid py-2 pb-4 bg-light">
      <div className="container">
        <h3 className="text-center mb-4">Indexes Statistics</h3>

        <div className="table-responsive" style={{
    maxHeight: "500px",   // adjust height as needed
    overflowY: "auto",
  }}>
          <table
            className="table table-bordered text-center align-middle"
            style={{ minWidth: "500px" }}
          >
            <thead className="table-primary sticky-top">
              <tr>
                {headers.map((header, idx) => (
                  <th key={idx} style={{ minWidth: "120px" }}>
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

                  {/* Indexes */}
                  <td className="text-success fw-semibold">
                    +{randomIndex(500, 700)}
                  </td>
                  <td className="text-success fw-semibold">
                    +{randomIndex(450, 600)}
                  </td>
                  <td className="text-success fw-semibold">
                    +{randomIndex(450, 600)}
                  </td>

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
                    {/* Bull Image */}
                    <div className="col-12 col-lg-6">
                      <img
                        src={selectedBull.image}
                        alt={selectedBull.name}
                        className="img-fluid rounded-3"
                      />
                    </div>

                    {/* Price Table */}
                    <div className="col-12 col-lg-6 d-flex flex-column justify-content-center mt-3 mt-lg-0">
                      <div className="h4 fw-bold">{selectedBull.name}</div>
                      <div className="fs-5 mb-2">
                        <span className="text-success fw-bold">Breed: </span>
                        {selectedBull.breed}
                      </div>
                      <div className="fs-5 mb-2">
                        <span className="text-primary fw-bold">Price: </span>
                        {prices.map((p, i) => (
                          <div key={i} className="ms-4">
                            <strong>{p.qty}:</strong> ${p.value}
                          </div>
                        ))}
                      </div>
                      <div className="fs-6 text-danger">REG # WYNFR308H</div>
                      <button className="btn btn-success btn-lg mt-3 w-50 mx-auto">
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
    </div>
  );
}
