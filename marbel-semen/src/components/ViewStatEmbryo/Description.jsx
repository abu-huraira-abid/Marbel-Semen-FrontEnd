import { useEffect, useState } from "react";
import axios from "axios";

export default function Description({ id }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [embryo, setEmbryo] = useState(null);

  useEffect(() => {
    const fetchEmbryo = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/embryos/${id}/`);
        setEmbryo(res.data);
        // console.log(res.data);
      } catch (err) {
        console.error("Error fetching embryo:", err);
      }
    };
    if (id) fetchEmbryo();
  }, [id, BASE_URL]);

  if (!embryo) {
    return (
      <div className="text-center py-5">
        <p>Loading embryo details...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid py-5" style={{ fontFamily: "Poppins" }}>
      <div className="container">
        {/* Heading */}
        <h2 className="text-center mb-4">
          {embryo.name}{" "}
          {/* <span className="text-danger">
            ({embryo.registration_id || "N/A"})
          </span> */}
        </h2>

        {/* Breed Info */}
        <p className="text-center fst-italic mb-4 fs-5">
          <strong className="text-success">Sire Breed:</strong>{" "}
          {embryo.sire?.breed || "Unknown"} |{" "}
          <strong className="text-primary">Dam Breed:</strong>{" "}
          {embryo.dam?.breed || "Unknown"}
        </p>

        {/* Availability, Quantity, and Status */}
        <div className="text-center mb-4 fs-5">
          <div>
            <span className="text-info fw-bold">Status:</span>{" "}
            <span
              className={
                embryo.availability
                  ? "text-success fw-semibold"
                  : "text-danger fw-semibold"
              }
            >
              {embryo.availability ? "Available" : "Not Available"}
            </span>
          </div>
          {/* <div>
            <span className="text-info fw-bold">Stock Quantity:</span>{" "}
            {embryo.quantity ?? 0}
          </div> */}
        </div>

        {/* Hardcoded Highlights Section (unchanged) */}
        <div className="row mb-4">
          <div className="col-md-6">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>#2 Marbling Sire</strong> (male with progeny) in the world
              </li>
              <li className="list-group-item">
                World-leading <strong>+4.8 Marble Score</strong> and{" "}
                <strong>+.64 Marble Fineness</strong>
              </li>
              <li className="list-group-item">
                70% of progeny in the{" "}
                <strong>top 10% for marbling</strong> (+2.5 or higher)
              </li>
              <li className="list-group-item">
                Top 1% on selection indexes:{" "}
                <strong>BFI (+$701), FTI ($542), F1TI ($542)</strong>
              </li>
              <li className="list-group-item">
                Proven progeny: <strong>17 offspring scoring 4.0+</strong>, highest +4.6
              </li>
              <li className="list-group-item">
                Strong sales record: female progeny sold for{" "}
                <strong>$50,000–$60,000</strong>
              </li>
              <li className="list-group-item">
                Hybrid genetics: perfect blend of{" "}
                <strong>USA & Australian bloodlines</strong>
              </li>
              <li className="list-group-item">
                Used in 27 top herds worldwide with{" "}
                <strong>242 progeny, 184 analyzed</strong>
              </li>
            </ul>
          </div>

          {/* Marketing Paragraph (unchanged) */}
          <div className="col-md-6 d-flex align-items-center py-3 py-lg-0">
            <p>
              Wyndford Itoguni 308H is a proven Wagyu breeding sire, combining
              exceptional marbling with impressive size. Trusted by leading herds
              worldwide—including Irongate, Booth Creek, Landgraf Ranch, and
              Nordik Wagyu—he is a key tool for introducing{" "}
              <strong>high marbling genetics</strong> into your herd. With top
              progeny performance and record-setting sales, Itoguni 308H delivers
              consistent quality and superior results.
            </p>
          </div>
        </div>

        {/* Callout / Badges */}
        <div className="text-center mt-lg-4 mt-0 d-flex flex-column flex-lg-row justify-content-center">
          <span className="badge bg-primary mx-2 my-2 my-lg-0 p-2 rounded-0">
            Top Marbling Genetics
          </span>
          <span className="badge bg-success mx-2 my-2 my-lg-0 p-2 rounded-0">
            Proven Progeny
          </span>
          <span className="badge bg-warning text-dark mx-2 my-2 my-lg-0 p-2 rounded-0">
            {embryo.status?.toUpperCase() || "AVAILABLE"}
          </span>
        </div>
      </div>
    </div>
  );
}
