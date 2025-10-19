import React, { useEffect, useRef } from "react";
import "../../../src/assets/styles/Semen.css";
import { FaDna, FaMicroscope, FaSnowflake, FaGlobe } from "react-icons/fa";

export default function EducationalSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add("animate-visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <FaDna className="edu-icon" />,
      title: "Genetic Validation",
      desc: "Each sample undergoes DNA profiling to confirm Wagyu lineage purity.",
    },
    {
      icon: <FaMicroscope className="edu-icon" />,
      title: "Motility Analysis",
      desc: "AI-assisted systems evaluate sperm motility and overall viability.",
    },
    {
      icon: <FaSnowflake className="edu-icon" />,
      title: "Cryogenic Preservation",
      desc: "Stored at −196°C using advanced nitrogen-based stabilization.",
    },
    {
      icon: <FaGlobe className="edu-icon" />,
      title: "Global Compliance",
      desc: "Certified under ISO and veterinary-approved international standards.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="educational-section py-5 position-relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="dna-light-bg"></div>
      <div className="glow-orb orb-left"></div>
      <div className="glow-orb orb-right"></div>

      <div
        className="container text-center position-relative fade-in-section"
        style={{ zIndex: 2 }}
      >
        <h2
          className="fw-bold mb-4 fade-up"
          style={{ fontFamily: "Syne", color: "#1b1b1b" }}
        >
          The Science Behind Every Drop
        </h2>

        <p
          className="fs-5 text-muted mb-5 fade-up-delay"
          style={{ fontFamily: "Poppins", maxWidth: "750px", margin: "0 auto" }}
        >
          From genetic profiling to cryogenic storage — discover how Marble Semen ensures
          world-class fertility and purity in every batch.
        </p>

        <div className="row justify-content-center">
          {features.map((item, i) => (
            <div className="col-10 col-md-3 mb-4 fade-card" key={i}>
              <div className="edu-card h-100">
                <div className="icon-wrapper mb-3">{item.icon}</div>
                <h5 className="fw-semibold mb-2">{item.title}</h5>
                <p className="text-muted small">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
