import React, { useEffect, useState } from "react";
import "../../../src/assets/styles/Promotions.css";

export default function LimitedOffer() {
  const calculateTimeLeft = () => {
    const difference = +new Date("2025-10-30") - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="limited-offer-section text-center position-relative overflow-hidden py-5">
      {/* Aqua-Gold Glow Background */}
      <div className="offer-gradient-bg"></div>

      {/* Content */}
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <h2
          className="fw-bold mb-3"
          style={{
            fontFamily: "Syne",
            background: "linear-gradient(90deg, #00c9a7, #ffd56b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Exclusive Offer Ends Soon
        </h2>

        <p
          className="lead mb-4"
          style={{
            fontFamily: "Poppins",
            color: "#333",
            maxWidth: "750px",
            margin: "0 auto",
            opacity: 0.85,
          }}
        >
          Secure premium Wagyu genetics at unbeatable rates — 
          limited availability, exceptional quality, and timeless legacy.
        </p>

        {/* Countdown Timer */}
        <div className="countdown-wrapper d-flex justify-content-center gap-4 mb-5 flex-wrap">
          {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => (
            <div key={label} className="countdown-box shadow-sm">
              <h3 className="countdown-value" style={{fontFamily:"Poppins"}}>
                {Object.values(timeLeft)[i] ?? "00"}
              </h3>
              <span className="countdown-label">{label}</span>
            </div>
          ))}
        </div>

        <button className="btn offer-btn px-5 py-2 fw-semibold rounded-1 shadow-sm">
          Claim Offer
        </button>
      </div>
    </section>
  );
}
