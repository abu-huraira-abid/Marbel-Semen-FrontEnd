// DNAStrand.jsx
import React from "react";
import "../../../src/assets/styles/DNA.css"; // we'll add this file next

export default function DNAStrand() {
  return (
    <div className="dna-strand-wrapper" aria-hidden="true">
      <svg
        className="dna-svg"
        viewBox="0 0 200 500"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0" x2="1">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="50%" stopColor="#f5e3a1" />
            <stop offset="100%" stopColor="#c19a09" />
          </linearGradient>
        </defs>

        {/* Left backbone */}
        <path
          d="M60 20 C40 80, 40 140, 60 200 C80 260, 80 320, 60 380 C40 440, 40 500, 60 560"
          stroke="url(#goldGradient)"
          strokeWidth="3"
          fill="none"
          className="dna-backbone"
        />

        {/* Right backbone */}
        <path
          d="M140 20 C160 80, 160 140, 140 200 C120 260, 120 320, 140 380 C160 440, 160 500, 140 560"
          stroke="url(#goldGradient)"
          strokeWidth="3"
          fill="none"
          className="dna-backbone"
        />

        {/* Rungs */}
        {[40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520].map(
          (y, i) => (
            <line
              key={i}
              x1="60"
              y1={y}
              x2="140"
              y2={y}
              stroke="rgba(212,175,55,0.8)"
              strokeWidth="2"
              className="dna-rung"
            />
          )
        )}
      </svg>
    </div>
  );
}
