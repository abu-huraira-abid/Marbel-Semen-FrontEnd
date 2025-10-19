import Img from "../../../src/assets/media/EmbryoFirst.png";
import "../../../src/assets/styles/Embryo.css"; 

export default function FirstCard() {
  return (
    <>
      <div
        className="embryo-hero position-relative d-flex align-items-center justify-content-center text-center text-white"
        style={{
          backgroundImage: `url(${Img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "90vh",
          position: "relative",
        }}
      >
        {/* Overlay */}
        <div
          className="overlay position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "rgba(0, 0, 0, 0.55)", // soft dark overlay
            backdropFilter: "blur(2px)", // subtle glass effect
          }}
        ></div>

        {/* Content */}
        <div
          className="content position-relative"
          style={{ zIndex: 2, maxWidth: "750px" }}
        >
          <h1
            className="fw-bold mb-3"
            style={{ fontFamily: "Syne", fontSize: "3.5rem" }}
          >
            Premium Wagyu Embryos
          </h1>
          <p
            className="lead mb-4"
            style={{
              fontFamily: "Poppins",
              fontSize: "1.25rem",
              color: "#e6e6e6",
            }}
          >
            Discover the next generation of elite Wagyu genetics — meticulously
            bred, scientifically certified, and globally trusted for excellence.
          </p>
          <button
            className="btn btn-light px-5 py-3 rounded-0 text-uppercase"
            style={{
              letterSpacing: "1px",
              fontWeight: "600",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#d4af37")}
            onMouseLeave={(e) => (e.target.style.background = "#fff")}
          >
            Explore Embryos
          </button>
        </div>
      </div>
    </>
  );
}
