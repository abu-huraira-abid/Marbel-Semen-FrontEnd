// import "../../../src/assets/styles/Promotion.css"

export default function BreederStories() {
  const stories = [
    {
      name: "John Carter",
      country: "Australia",
      flag: "🇦🇺",
      quote:
        "Since switching to Marble genetics, my herd’s marbling quality has reached championship levels. Every calf shows visible improvement.",
    },
    {
      name: "Hiroshi Tanaka",
      country: "Japan",
      flag: "🇯🇵",
      quote:
        "The precision and consistency of Marble semen are unmatched. Our Wagyu line now carries superior texture and fertility traits.",
    },
    {
      name: "Maria Gonzalez",
      country: "Argentina",
      flag: "🇦🇷",
      quote:
        "Exceptional conception rates and elite bloodlines — we’ve seen real performance growth in less than two breeding cycles.",
    },
  ];

  return (
    <section className="breeder-stories-section-light position-relative py-5">
      <div className="container text-center">
        <h2
          className="fw-bold mb-3"
          style={{
            fontFamily: "Syne",
            background: "linear-gradient(90deg, #00c9a7, #ffd56b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Trusted by Breeders Worldwide
        </h2>

        <p
          className="lead mb-5"
          style={{
            fontFamily: "Poppins",
            color: "#444",
            maxWidth: "750px",
            margin: "0 auto",
            opacity: 0.85,
          }}
        >
          Our genetics empower breeders across continents to raise healthier,
          high-performing Wagyu herds. Here’s what they have to say.
        </p>

        <div className="row justify-content-center">
          {stories.map((s, index) => (
            <div key={index} className="col-10 col-md-4 mb-4">
              <div
                className="story-card-light h-100 text-start p-4"
                style={{ borderRadius: "16px" }}
              >
                <div className="d-flex align-items-center mb-3">
                  <div
                    className="quote-icon-light me-2"
                    style={{ color: "#00c9a7", fontSize: "1.8rem" }}
                  >
                    ❝
                  </div>
                  <h5
                    className="mb-0"
                    style={{ color: "#c19a09", fontWeight: "600" }}
                  >
                    {s.name}
                  </h5>
                </div>
                <p
                  className="fst-italic"
                  style={{
                    color: "#333",
                    opacity: 0.9,
                    fontFamily: "Poppins",
                  }}
                >
                  “{s.quote}”
                </p>
                <div className="mt-3 small" style={{ color: "#00c9a7" }}>
                  {s.flag} {s.country}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-gradient mt-4 px-4 py-2 fw-semibold rounded-1">
          Share Your Success
        </button>
      </div>
    </section>
  );
}
    