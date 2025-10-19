import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MovingCards() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [bulls, setBulls] = useState([]);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);
  const navigate = useNavigate()

  // Fetch trending bulls
  useEffect(() => {
    const fetchTrendingBulls = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/bulls/trending/`);
        console.log("🐂 Trending Bulls API Response:", res.data);
        setBulls(res.data.data || []); // assuming backend wraps in {success, data}
      } catch (err) {
        console.error("❌ Error fetching trending bulls:", err);
      }
    };

    fetchTrendingBulls();
  }, [BASE_URL]);

  // Update cards per slide on resize
  useEffect(() => {
    const updateCardsPerSlide = () => {
      if (window.innerWidth < 768) {
        setCardsPerSlide(1); // sm
      } else if (window.innerWidth < 992) {
        setCardsPerSlide(2); // md
      } else {
        setCardsPerSlide(3); // lg+
      }
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);

    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Semen Trending</h2>
      <div
        id="bullsCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="4000"
      >
        <div className="carousel-inner">
          {Array.from({ length: Math.ceil(bulls.length / cardsPerSlide) }).map(
            (_, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <div className="row justify-content-center">
                  {bulls
                    .slice(
                      index * cardsPerSlide,
                      index * cardsPerSlide + cardsPerSlide
                    )
                    .map((b, i) => (
                      <div className="col-12 col-md-6 col-lg-4" key={i}>
                        <div className="card shadow-sm bull-card">
                          <img
                            src={
                              b.image
                                ? `${b.image}`
                                : "https://via.placeholder.com/300"
                            }
                            className="card-img-top"
                            alt={b.name}
                            style={{ height: "250px", objectFit: "cover" }}
                          />
                          <div className="card-body text-center bg-light w-100">
                            <h5 className="card-title">{b.name}</h5>
                          </div>
                          <div className="overlay text-center">
                            <h6 className="text-white">{b.breed}</h6>
                            <p className="text-white small">
                              {b.description}
                            </p>
                            <button className="btn btn-primary btn-sm" onClick={()=> navigate("/view-stat",{state:{id : b.id}})}>
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )
          )}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#bullsCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#bullsCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
