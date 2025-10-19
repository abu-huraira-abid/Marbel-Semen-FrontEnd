import React from "react";
import "../../../src/assets/styles/Semen.css";
import DNAStrand from "./DNAStrand";

export default function FinalCTA() {
  return (
    <section className="final-cta-modern position-relative overflow-hidden text-center text-light py-5 d-flex align-items-center justify-content-center">
      {/* Animated Background Layers */}
      <div className="light-beam beam-1"></div>
      <div className="light-beam beam-2"></div>
      <div className="light-beam beam-3"></div>

      {/* DNA Strand Animation */}
      <div className="dna-overlay">
        <DNAStrand />
      </div>

      {/* CTA Content */}
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <h2
          className="fw-bold mb-3"
          style={{ fontFamily: "Syne", color: "#fff", fontSize: "2.6rem" }}
        >
          From Innovation to Impact — Let’s Build the Future of Breeding
        </h2>

        <p
          className="lead mx-auto mb-4"
          style={{
            fontFamily: "Poppins",
            maxWidth: "700px",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          Partner with Marble Semen and access precision-driven Wagyu genetics,
          trusted by breeders across continents. Together, we elevate
          performance, lineage, and legacy.
        </p>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <button className="btn btn-gold px-4 py-2 fw-semibold rounded-1 shadow-sm">
            Become a Partner
          </button>
          <button className="btn btn-outline-gold px-4 py-2 fw-semibold rounded-1">
            Explore Global Reach
          </button>
        </div>
      </div>
    </section>
  );
}
