import React from "react";
import { FaBullhorn, FaClock, FaGlobeAmericas } from "react-icons/fa";
import "../../../src/assets/styles/Promotions.css";

export default function SecondCard() {
  const features = [
    {
      icon: <FaBullhorn className="promo-icon" />,
      title: "Highlighted Genetics",
      desc: "Discover premium Wagyu sires and embryos featured for limited-time promotional campaigns.",
    },
    {
      icon: <FaClock className="promo-icon" />,
      title: "Time-Limited Offers",
      desc: "Exclusive discounts and bundles — crafted to give breeders access to elite genetics affordably.",
    },
    {
      icon: <FaGlobeAmericas className="promo-icon" />,
      title: "Global Reach",
      desc: "Seamless worldwide shipping and distribution ensure availability wherever excellence is needed.",
    },
  ];

  return (
    <section className="promo-approach-section py-5 position-relative overflow-hidden">
      <div className="container text-center">
        <h2 className="fw-bold mb-4" style={{ fontFamily: "Syne", color: "#1a1a1a" }}>
          Our Promotion Approach
        </h2>
        <p
          className="text-muted mb-5 mx-auto"
          style={{ maxWidth: "750px", fontFamily: "Poppins" }}
        >
          We blend genetics, marketing, and accessibility — ensuring each campaign not only 
          highlights excellence but also connects breeders worldwide with the industry’s best.
        </p>

        <div className="row justify-content-center">
          {features.map((item, index) => (
            <div key={index} className="col-10 col-md-4 mb-4">
              <div className="promo-feature-card h-100 text-center p-4">
                <div className="icon-wrap mb-3">{item.icon}</div>
                <h5 className="fw-semibold mb-2" style={{ color: "#222" }}>
                  {item.title}
                </h5>
                <p className="text-muted">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
