import React from "react";
import "../../../src/assets/styles/Semen.css";
import DNAStrand from "./DNAStrand"; 
import Img from '../../../src/assets/media/SemenDark.png';

export default function FirstCard() {
  return (
    <section
      className="semen-hero-light d-flex align-items-center justify-content-center text-center position-relative overflow-hidden"
      style={{
        backgroundImage: `url(${Img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background Decorative Elements */}
      <div className="gradient-circle circle-1"></div>
      <div className="gradient-circle circle-2"></div>

      {/* 🧬 Animated DNA Strand */}
      <DNAStrand />

      {/* Hero Content */}
      <div className="container position-relative" style={{ zIndex: 3 }}>
        <h1
          className="fw-bold mb-3 semen-heading"
          style={{ fontFamily: "Syne" }}
        >
          Elevate Breeding Standards
        </h1>

        <p
          className="fs-5 mb-4"
          style={{
            fontFamily: "Poppins",
            color: "rgba(255, 255, 255, 0.85)",
            maxWidth: "750px",
            margin: "0 auto",
          }}
        >
          Experience precision genetics with our curated Wagyu semen selection — 
          designed for exceptional fertility, marbling, and global lineage excellence.
        </p>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <button className="btn px-4 py-2 rounded-1 fw-semibold semen-btn" style={{backgroundColor:"#edb61eff"}}>
            View Catalogue
          </button>
          <button className="btn btn-dark px-4 py-2 rounded-1 fw-semibold semen-btn">
            Genetic Insights
          </button>
        </div>
      </div>
    </section>
  );
}
