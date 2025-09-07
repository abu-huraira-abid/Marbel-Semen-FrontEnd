import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function TableCards() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Responsive items per page
  const itemsPerPage = window.innerWidth >= 992 ? 4 : 2;

  const totalPages = Math.ceil(bulls.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBulls = bulls.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container-fluid bg-light d-flex align-items-center justify-content-center">
      <div className="container px-0 mx-0 mx-lg-4 py-5">
        <h2 className="text-center mb-4">Our Bulls</h2>
        <div className="row" style={{ fontFamily: "Poppins" }}>
          {currentBulls.map((bull, idx) => (
            <div className={`col-12 col-lg-6 mb-4`} key={idx}>
              <div className="card flex-column flex-lg-row translate-card shadow-sm h-100">
                <img
                  src={bull.image}
                  className="card-img-left col-12 col-lg-7"
                  alt={bull.name}
                  style={{objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5>{bull.name}</h5>
                    <ul className="list-unstyled mb-3">
                      <h5>Price:</h5>
                      {prices.map((p, i) => (
                        <li className="mx-3" key={i}>
                          <strong>{p.qty}:</strong> ${p.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="d-flex gap-2 flex-row flex-lg-column flex-lg-row">
                    <button className="btn btn-primary btn-sm flex-fill rounded-1" onClick={()=> navigate("/view-stat",{state:{id:bull.id}})}>
                      <i className="bi bi-bar-chart-line me-1"></i> View Stats
                    </button>
                    <button className="btn btn-success btn-sm flex-fill rounded-1">
                      <i className="bi bi-cart-plus me-1"></i> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center gap-2 mt-3">
          <button
            className="btn btn-dark rounded-1"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="align-self-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-dark rounded-1"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
