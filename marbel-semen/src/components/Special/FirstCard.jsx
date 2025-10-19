import React from "react";
import "../../../src/assets/styles/Promotions.css";

export default function FirstCard() {
  return (
    <section className="promo-hero d-flex align-items-center justify-content-center text-center position-relative overflow-hidden">
      {/* Background Glow Layers */}
      <div className="promo-glow glow-1"></div>
      <div className="promo-glow glow-2"></div>
      <div className="promo-glow glow-3"></div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <h1
          className="fw-bold promo-heading mb-3"
          style={{ fontFamily: "Syne" }}
        >
          Precision Promotions
        </h1>

        <p
          className="promo-subtext mx-auto mb-4"
          style={{
            fontFamily: "Poppins",
            maxWidth: "700px",
          }}
        >
          Where innovation meets opportunity — discover exclusive breeding
          campaigns, limited-time genetics, and special global offers.
        </p>

        <div className="d-flex justify-content-center gap-3 mt-3">
          <button className="btn btn-gradient px-4 py-2 fw-semibold rounded-1">
            Explore Offers
          </button>
          <button className="btn btn-outline-gradient px-4 py-2 fw-semibold rounded-1">
            Join Campaign
          </button>
        </div>
      </div>
    </section>
  );
}
