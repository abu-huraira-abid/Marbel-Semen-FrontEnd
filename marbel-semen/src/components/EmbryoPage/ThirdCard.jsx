import React from "react";
import {
  FaFlask,
  FaDna,
  FaSnowflake,
  FaGlobe,
} from "react-icons/fa";
import { GiCow } from "react-icons/gi"; // 🐄 correct cow icon
import "../../../src/assets/styles/Embryo.css";

export default function ThirdCard() {
  const steps = [
    {
      icon: <GiCow className="process-icon" />,
      title: "Donor Selection",
      desc: "Elite Wagyu donors are carefully chosen for exceptional marbling, fertility, and genetic strength.",
    },
    {
      icon: <FaFlask className="process-icon" />,
      title: "Fertilization",
      desc: "Embryos are created in advanced lab environments ensuring the highest conception success rates.",
    },
    {
      icon: <FaDna className="process-icon" />,
      title: "Genetic Screening",
      desc: "Each embryo undergoes DNA profiling to confirm purity and performance before freezing.",
    },
    {
      icon: <FaSnowflake className="process-icon" />,
      title: "Cryopreservation",
      desc: "Embryos are preserved in nitrogen chambers, maintaining viability for worldwide shipment.",
    },
    {
      icon: <FaGlobe className="process-icon" />,
      title: "Global Delivery",
      desc: "Safely shipped to breeders and ranches globally — ready for the next generation of Wagyu excellence.",
    },
  ];

  return (
    <section className="process-section py-5 position-relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="gradient-bg"></div>

      <div
        className="container position-relative text-center"
        style={{ zIndex: 2 }}
      >
        <h2
          className="fw-bold text-white mb-3"
          style={{ fontFamily: "Syne" }}
        >
          From Lab to Legacy
        </h2>
        <p className="text-light fs-5 mb-5">
          Every embryo follows a precise path of innovation and care — from
          genetic selection to your ranch.
        </p>

        <div className="row justify-content-center">
          {steps.map((step, index) => (
            <div key={index} className="col-10 col-md-2 mb-5 position-relative">
              <div className="process-card p-3 h-100">
                <div className="icon-container mb-3">{step.icon}</div>
                <h6 className="fw-semibold text-white">{step.title}</h6>
                <p className="text-light small">{step.desc}</p>
              </div>

              {/* connecting line */}
              {index < steps.length - 1 && (
                <div className="connector d-none d-md-block"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
