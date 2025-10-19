export default function FourthCard() {
  return (
    <>
      <div
        className="container-fluid py-5 position-relative text-light"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(199,167,42,0.15), transparent 60%), linear-gradient(180deg, #000 0%, #111 100%)",
          overflow: "hidden",
        }}
      >
        {/* Glowing DNA animation background */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "url('https://www.transparenttextures.com/patterns/dna.png')",
            backgroundSize: "contain",
            opacity: 0.07,
            animation: "floatDNA 15s ease-in-out infinite alternate",
            zIndex: 1,
          }}
        ></div>

        <div
          className="container text-center py-5 position-relative"
          style={{ zIndex: 2 }}
        >
          <h1
            className="fw-bold mb-3"
            style={{ fontFamily: "Syne", color: "rgba(199,167,42,1)" }}
          >
            Embryo Innovation & Lab Excellence
          </h1>
          <h4
            className="fw-light mx-auto"
            style={{ fontFamily: "Poppins", maxWidth: "850px" }}
          >
            “Where science meets perfection — combining advanced biotechnology,
            genetic screening, and world-class lab expertise to shape the
            next generation of Wagyu excellence.”
          </h4>
        </div>
      </div>
    </>
  );
}
