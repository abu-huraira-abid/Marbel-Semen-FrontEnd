import React from "react";
import "../../../src/assets/styles/Promotions.css";
import Bull1 from '../../../src/assets/media/Bulls/BCO.6b25b2be-e826-44a1-9b30-b958cc8af722.png'
import Bull2 from '../../../src/assets/media/Bulls/BCO.8a141874-674f-469b-99ad-475ec5dff4b8.png'
import Bull3 from '../../../src/assets/media/Bulls/BCO.bdf84f43-f3d8-4a29-8184-b1723e19d461.png'

export default function ThirdCard() {
  const promos = [
    {
      title: "Embryo Elite Week",
      desc: "Up to 25% off top-ranked Wagyu embryos. Enhance your herd genetics faster.",
      tag: "Limited Time",
      img: Bull1,
    },
    {
      title: "Genetic Gold Program",
      desc: "Exclusive access to high-EBV sires — limited global availability.",
      tag: "Exclusive",
      img: Bull2,
    },
    {
      title: "NextGen Wagyu Drive",
      desc: "Discover the next generation of Wagyu bulls, optimized for marbling and performance.",
      tag: "New",
      img: Bull3,
    },
  ];

  return (
    <section className="featured-promos-section py-5 position-relative overflow-hidden">
      <div className="container text-center">
        <h2 className="fw-bold mb-4" style={{ fontFamily: "Syne", color: "#222" }}>
          Featured Promotions
        </h2>
        <p
          className="text-muted mb-5 mx-auto"
          style={{ maxWidth: "750px", fontFamily: "Poppins" }}
        >
          Explore our ongoing and upcoming campaigns featuring world-class Wagyu genetics. 
          Each promotion brings you closer to premium breeding success.
        </p>

        <div className="row g-4 justify-content-center">
          {promos.map((promo, index) => (
            <div key={index} className="col-10 col-md-4">
              <div className="promo-card position-relative overflow-hidden">
                <img src={promo.img} alt={promo.title} className="promo-img" />
                <div className="promo-overlay"></div>
                <div className="promo-content text-start">
                  <span className="promo-tag">{promo.tag}</span>
                  <h5 className="fw-bold text-light mt-2">{promo.title}</h5>
                  <p className="text-light small">{promo.desc}</p>
                  <button className="btn btn-outline-light btn-sm rounded-1 mt-2">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
