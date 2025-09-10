const bulls = [
  {
    name: "Champion Wagyu Bull",
    image:
      "https://copilot.microsoft.com/th/id/BCO.80397891-1a9a-4ee1-9f7c-d4f304256098.png",
    breed: "Wagyu",
    description: "Superior marbling genetics with proven pedigree.",
  },
  {
    name: "Elite Angus Bull",
    image:
      "https://copilot.microsoft.com/th/id/BCO.c74f7f1f-481b-4292-a30a-f19de826e740.png",
    breed: "Angus",
    description: "High fertility rates and consistent performance.",
  },
  {
    name: "Premium Sahiwal Bull",
    image:
      "https://copilot.microsoft.com/th/id/BCO.fc49d174-2cba-4412-a939-1b06f993a1ba.png",
    breed: "Sahiwal",
    description: "Strong adaptability and reliable milk genetics.",
  },
  {
    name: "Holstein Friesian",
    image:
      "https://copilot.microsoft.com/th/id/BCO.b8c124be-3d2a-4e62-a7f3-f913b679299f.png",
    breed: "Holstein",
    description: "Excellent milk yield and superior dairy genetics.",
  },
  {
    name: "Red Sindhi Bull",
    image:
      "https://copilot.microsoft.com/th/id/BCO.8a141874-674f-469b-99ad-475ec5dff4b8.png",
    breed: "Sindhi",
    description: "Renowned for resilience and fertility performance.",
  },
  {
  name: "Brahman Bull",
  image: "https://copilot.microsoft.com/th/id/BCO.bdf84f43-f3d8-4a29-8184-b1723e19d461.png",
  breed: "Brahman",
  description: "Heat-tolerant and resilient, ideal for tropical climates."
},
{
  name: "Charolais Bull",
  image: "https://copilot.microsoft.com/th/id/BCO.6b25b2be-e826-44a1-9b30-b958cc8af722.png",
  breed: "Charolais",
  description: "Known for rapid growth, heavy muscling, and beef quality."
},
{
  name: "Hereford Bull",
  image: "https://copilot.microsoft.com/th/id/BCO.016aa7b0-6c0a-4f6b-a1a1-322302845993.png",
  breed: "Hereford",
  description: "Hardy and adaptable with excellent meat yield."
},
    {
    name: "Belgian Blue Bull",
    image: "https://copilot.microsoft.com/th/id/BCO.c253a7cc-d7cd-48b0-9644-c9a38c2ccf23.png",
    breed: "Belgian Blue",
    description: "Famous for double-muscling and high lean meat percentage."
    },
{
  name: "Nili-Ravi Bull",
  image: "https://copilot.microsoft.com/th/id/BCO.1a276348-d565-4260-9808-49931878bae7.png",
  breed: "Nili-Ravi",
  description: "Renowned Pakistani breed for both milk and breeding strength."
}

];

import { useState,useEffect } from "react";

export default function MovingCards() {
  const [cardsPerSlide, setCardsPerSlide] = useState(3);

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
      <h2 className="text-center mb-4">Bulls Trending</h2>
      <div
        id="bullsCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="4000" // auto slide every 4s
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
                            src={b.image}
                            className="card-img-top"
                            alt={b.name}
                            style={{ height: "250px", objectFit: "cover" }}
                          />
                          <div className="card-body text-center bg-light w-100">
                            <h5 className="card-title">{b.name}</h5>
                          </div>
                          <div className="overlay text-center">
                            <h6 className="text-white">{b.breed}</h6>
                            <p className="text-white small">{b.description}</p>
                            <button className="btn btn-primary btn-sm">
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
