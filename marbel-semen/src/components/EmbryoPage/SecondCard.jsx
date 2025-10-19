import React, { useEffect, useRef } from "react";
import "../../../src/assets/styles/Embryo.css";

export default function SecondCard() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When section is visible — trigger animation
            section.classList.add("animate-visible");
          } else {
            // When section leaves viewport — reset animations
            section.classList.remove("animate-visible");
          }
        });
      },
      { threshold: 0.2 } // triggers when 20% is visible
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="why-embryo-container py-5 position-relative overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div
        className="container text-center text-md-start position-relative fade-in-section"
        style={{ zIndex: 2 }}
      >
        <h2
          className="fw-bold text-white mb-4 fade-up"
          style={{ fontFamily: "Syne" }}
        >
          Why Choose Embryos?
        </h2>

        <p
          className="text-light fs-5 mb-5 fade-up-delay"
          style={{ maxWidth: "750px", fontFamily: "Poppins" }}
        >
          Embryos offer the highest level of genetic potential — ensuring every
          new generation of Wagyu inherits superior marbling, growth, and
          fertility traits. With every embryo, you’re not just breeding — you’re
          engineering excellence.
        </p>

        <div
          className="row justify-content-center justify-content-md-start"
          style={{ fontFamily: "Poppins" }}
        >
          {[
            {
              title: "Genetic Precision",
              desc: "Every embryo is lab-verified for purity and performance.",
            },
            {
              title: "Elite Bloodlines",
              desc: "Preserve the legacy of the world’s top Wagyu sires and dams.",
            },
            {
              title: "Faster Progress",
              desc: "Skip generations and accelerate herd quality instantly.",
            },
          ].map((item, index) => (
            <div key={index} className="col-10 col-md-4 mb-4 fade-card">
              <div className="why-card h-100">
                <h5
                  className="fw-semibold mb-2"
                  style={{ color: "rgba(199, 167, 42, 1)" }}
                >
                  {item.title}
                </h5>
                <p className="text-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
