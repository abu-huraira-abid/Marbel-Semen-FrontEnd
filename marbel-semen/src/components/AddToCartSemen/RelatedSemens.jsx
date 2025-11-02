import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RelatedSemens({ id }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [relatedSemens, setRelatedSemens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSemens = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/semens/`);
        const semens = res.data.results || res.data.data || res.data;

        // Filter out the current semen
        const filtered = semens.filter((s) => s.id !== id);

        // Shuffle and pick 3 random ones
        const shuffled = [...filtered].sort(() => 0.5 - Math.random());
        setRelatedSemens(shuffled.slice(0, 3));
      } catch (err) {
        console.error("Error fetching semens:", err);
      }
    };

    fetchSemens();
  }, [id, BASE_URL]);

  return (
    <div className="container py-5">
      <h3 className="text-center mb-4 fw-bold">Related Semens</h3>
      <div className="row justify-content-center">
        {relatedSemens.length > 0 ? (
          relatedSemens.map((s) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={s.id}>
              <div
                className="card shadow-lg border-0 rounded-3 h-100 semen-card"
                style={{ transition: "all 0.3s ease" }}
              >
                <div className="card-body bg-light text-center">
                  <h5 className="fw-bold mb-1">{s.bull_name || "Unknown Bull"}</h5>
                  <p className="text-muted small mb-2">
                    Code: <strong>{s.code || "N/A"}</strong>
                  </p>
                  <p className="text-muted small mb-2">
                    Batch No: <strong>{s.batch_number || "N/A"}</strong>
                  </p>
                  <p className="text-muted small mb-2">
                    Quality Grade: <strong>{s.quality_grade || "-"}</strong>
                  </p>
                  <p className="text-muted small mb-3">
                    Quantity: <strong>{s.quantity || 0}</strong>
                  </p>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() =>
                      navigate("/view-stat-semen", { state: { id: s.id } })
                    }
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No related semens found.</p>
        )}
      </div>
    </div>
  );
}
