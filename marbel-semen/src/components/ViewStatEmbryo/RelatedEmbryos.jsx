import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RelatedBulls({ id }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [relatedBulls, setRelatedBulls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBulls = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/embryos/`);
        console.log(res.data)
        const bulls = res.data.results || res.data.data || res.data; // adjust according to your API

        // filter out the current bull
        const filtered = bulls.filter((b) => b.id !== id);

        // pick 3 random bulls
        const shuffled = [...filtered].sort(() => 0.5 - Math.random());
        setRelatedBulls(shuffled.slice(0, 3));
      } catch (err) {
        console.error("Error fetching bulls:", err);
      }
    };

    fetchBulls();
  }, [id, BASE_URL]);

  return (
    <div className="container py-5">
      <h3 className="text-center mb-4">Related Embryos</h3>
      <div className="row justify-content-center">
        {relatedBulls.map((b) => (
          <div className="col-12 col-md-6 col-lg-4 mb-3" key={b.id}>
            <div className="card shadow-sm bull-card position-relative">
              <img
                src={b.image || "https://via.placeholder.com/400"}
                className="card-img-top"
                alt={b.name}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body text-center bg-light w-100">
                <h5 className="card-title">{b.name}</h5>
              </div>

              {/* Overlay */}
              <div className="overlay text-center">
                <h6 className="text-white">{b.breed}</h6>
                <p className="text-white small">{b.description}</p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate("/view-stat-embryo", { state: { id: b.id } })}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
