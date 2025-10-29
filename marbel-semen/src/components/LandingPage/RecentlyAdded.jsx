import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RecentlyAdded() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [bulls, setBulls] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()
  // Fetch latest bulls
  useEffect(() => {
    const fetchBulls = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/bulls/latest/`);
        const bullsData = res.data.data; // comes from your backend
        // console.log(bullsData);
        setBulls(bullsData);
      } catch (err) {
        console.error("Error fetching bulls:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBulls();
  }, [BASE_URL]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <h4>Loading recently added bulls...</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <h1 className="text-center fw-bold" style={{ fontFamily: "Syne" }}>
        RECENTLY ADDED BULLS
      </h1>
      <div className="container mt-5" style={{ fontFamily: "Poppins" }}>
        <div className="row mx-auto">
          {bulls.slice(0,3).map((bull) => (
            <div className="col-md-4 my-3 my-lg-0 h-100" key={bull.id}>
              <div
                className="card position-relative"
                style={{ width: "20rem", height: "20rem" }}
              >
                <div className="image-container">
                  <img
                    src={
                      bull.image
                        ? `${bull.image}`
                        : "https://via.placeholder.com/300"
                    }
                    className="card-img-top img-fluid"
                    alt={bull.name}
                  />
                  <div className="overlay d-flex align-items-center justify-content-center">
                    <button  onClick={ () => navigate(`/view-stat/`,{state:{id : bull.id}})} className="btn btn-primary rounded-circle">
                      +
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="card-title" style={{ cursor: "pointer" }}>
                    {bull.name} - {bull.registration_id}
                  </h5>
                  <button  onClick={()=> navigate(`/view-stat/`,{state:{id : bull.id}})} className="btn btn-primary rounded-1">
                      View Details
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
