import React from "react";
import "../../../src/assets/styles/Semen.css";
import { FaGlobeAmericas, FaTruck, FaWarehouse, FaAward } from "react-icons/fa";
import WorldMap from "../../../src/assets/media/WorldHigh.svg"; // replace with your bg image

export default function GlobalReach() {
  const stats = [
    {
      icon: <FaGlobeAmericas className="reach-icon" />,
      title: "20+ Countries",
      desc: "Supplying premium Wagyu genetics across North America, Asia, and Europe.",
    },
    {
      icon: <FaWarehouse className="reach-icon" />,
      title: "5 Global Storage Hubs",
      desc: "Cryogenic facilities ensuring secure and rapid access worldwide.",
    },
    {
      icon: <FaTruck className="reach-icon" />,
      title: "Fast International Shipping",
      desc: "Partnered with certified logistics for cold-chain delivery.",
    },
    {
      icon: <FaAward className="reach-icon" />,
      title: "ISO Certified Quality",
      desc: "Maintaining global standards for safety, purity, and genetic verification.",
    },
  ];

  return (
    <section className="global-reach-section position-relative overflow-hidden py-5 text-center text-light">
      {/* Background Map Image */}
      <img
        src={WorldMap}
        alt="World Map"
        className="world-map-bg position-absolute top-0 start-0 w-100 h-100"
      />

      {/* Overlay */}
      <div className="map-overlay position-absolute top-0 start-0 w-100 h-100"></div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <h2 className="fw-bold mb-4" style={{ fontFamily: "Syne" }}>
          Trusted Worldwide
        </h2>
        <p
          className="fs-5 mb-5"
          style={{ fontFamily: "Poppins", maxWidth: "700px", margin: "0 auto" }}
        >
          Marble Semen proudly delivers elite Wagyu genetics to breeders across continents.
          Our global logistics and preservation standards ensure seamless access wherever you are.
        </p>

        <div className="row justify-content-center">
          {stats.map((item, i) => (
            <div className="col-10 col-md-3 mb-4" key={i}>
              <div className="reach-card h-100">
                <div className="reach-icon-wrapper mb-3">{item.icon}</div>
                <h5 className="fw-semibold mb-2">{item.title}</h5>
                <p className="small text-light opacity-75">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Glowing country dots (decorative) */}
      <div className="country-dot dot-1"></div>
      <div className="country-dot dot-2"></div>
      <div className="country-dot dot-3"></div>
      <div className="country-dot dot-4"></div>
    </section>
  );
}
