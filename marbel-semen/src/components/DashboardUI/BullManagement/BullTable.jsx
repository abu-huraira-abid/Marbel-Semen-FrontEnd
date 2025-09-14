import { useState } from "react";
import { FaEye, FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function BullTable() {
  const initialBulls = [
  {
    id: 1,
    name: "Champion Wagyu Bull",
    breed: "Wagyu",
    reg: "WG123456",
    status: "Active",
    image: "https://copilot.microsoft.com/th/id/BCO.80397891-1a9a-4ee1-9f7c-d4f304256098.png",
  },
  {
    id: 2,
    name: "Elite Angus Bull",
    breed: "Angus",
    reg: "AG234567",
    status: "Active",
    image: "https://copilot.microsoft.com/th/id/BCO.c74f7f1f-481b-4292-a30a-f19de826e740.png",
  },
  {
    id: 3,
    name: "Premium Sahiwal Bull",
    breed: "Sahiwal",
    reg: "SW345678",
    status: "Inactive",
    image: "https://copilot.microsoft.com/th/id/BCO.fc49d174-2cba-4412-a939-1b06f993a1ba.png",
  },
  {
    id: 4,
    name: "Holstein Friesian",
    breed: "Holstein",
    reg: "HF456789",
    status: "Active",
    image: "https://copilot.microsoft.com/th/id/BCO.b8c124be-3d2a-4e62-a7f3-f913b679299f.png",
  },
  {
    id: 5,
    name: "Red Sindhi Bull",
    breed: "Sindhi",
    reg: "RS567990",
    status: "Active",
    image: "https://copilot.microsoft.com/th/id/BCO.8a141874-674f-469b-99ad-475ec5dff4b8.png",
  },
  {
    id: 6,
    name: "Brahman Bull",
    breed: "Brahman",
    reg: "BR234111",
    status: "Active",
    image: "https://copilot.microsoft.com/th/id/BCO.bdf84f43-f3d8-4a29-8184-b1723e19d461.png",
  },
  {
    id: 7,
    name: "Charolais Bull",
    breed: "Charolais",
    reg: "CH456222",
    status: "Inactive",
    image: "https://copilot.microsoft.com/th/id/BCO.6b25b2be-e826-44a1-9b30-b958cc8af722.png",
  },
  {
    id: 8,
    name: "Hereford Bull",
    breed: "Hereford",
    reg: "HF789333",
    status: "Active",
    image: "https://copilot.microsoft.com/th/id/BCO.016aa7b0-6c0a-4f6b-a1a1-322302845993.png",
  },
  {
    id: 9,
    name: "Belgian Blue Bull",
    breed: "Belgian Blue",
    reg: "BB112233",
    status: "Active",
    image: "https://copilot.microsoft.com/th/id/BCO.c253a7cc-d7cd-48b0-9644-c9a38c2ccf23.png",
  },
  {
    id: 10,
    name: "Nili-Ravi Bull",
    breed: "Nili-Ravi",
    reg: "NR445566",
    status: "Inactive",
    image: "https://copilot.microsoft.com/th/id/BCO.1a276348-d565-4260-9808-49931878bae7.png",
  },
];


  const [bulls, setBulls] = useState(initialBulls);
  const [currentPage, setCurrentPage] = useState(1);
  const bullsPerPage = 5;
  const navigate = useNavigate()

  // Pagination logic
  const indexOfLastBull = currentPage * bullsPerPage;
  const indexOfFirstBull = indexOfLastBull - bullsPerPage;
  const currentBulls = bulls.slice(indexOfFirstBull, indexOfLastBull);

  const totalPages = Math.ceil(bulls.length / bullsPerPage);

  // Toggle status
  const toggleStatus = (id) => {
    setBulls((prevBulls) =>
      prevBulls.map((bull) =>
        bull.id === id
          ? { ...bull, status: bull.status === "Active" ? "Inactive" : "Active" }
          : bull
      )
    );
  };

  const handleViewUpdate = (id) => {
    navigate(`/account/bulls/${id}`);
  };

  const handleDelete = (id) => {
    console.log("Delete bull:", id);
  };

  return (
    <div className="table-responsive bg-white p-3 rounded shadow-lg">
      <table className="table table-hover align-middle">
      <thead className="">
        <tr>
          <th scope="col">
            <input type="checkbox" />
          </th>
          <th scope="col">Bull Image</th>
          <th scope="col">Name</th>
          <th scope="col">Breed</th>
          <th scope="col">Registration #</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentBulls.map((bull) => (
          <tr key={bull.id}>
            <td>
              <input type="checkbox" />
            </td>
            <td className="table-light">
              <img
                src={bull.image}
                alt={bull.name}
                width="80"
                className="rounded shadow-sm"
              />
            </td>
            <td className="fw-semibold table-light">{bull.name}</td>
            <td>{bull.breed}</td>
            <td>{bull.reg}</td>
            <td>
              <button
                className={`btn btn-sm ${
                  bull.status === "Active"
                    ? "btn-success"
                    : "btn-outline-success"
                }`}
                onClick={() => toggleStatus(bull.id)}
                style={{ width: "100px" }}
              >
                {bull.status}
              </button>
            </td>
            <td>
              <div className="d-flex gap-2">
                <button
  className="btn btn-sm btn-primary d-flex align-items-center gap-2 text-nowrap"
  onClick={() => handleViewUpdate(bull.id)}
>
  <FaEye /> View / Update
</button>

                <button
                  className="btn btn-sm btn-danger d-flex align-items-center gap-1"
                  onClick={() => handleDelete(bull.id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

      {/* Pagination */}
      <div className="d-flex justify-content-end align-items-center gap-2">
        <button
          className="btn btn-primary btn-sm d-flex align-items-center gap-1"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <FaChevronLeft /> Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`btn btn-sm ${
              currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="btn btn-primary btn-sm d-flex align-items-center gap-1"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
