export default function RecentlyAdded() {
  return (
    <>
      <div className="container-fluid py-4">
        <h1 className="text-center fw-bold" style={{ fontFamily: "Syne" }}>
          RECENTLY ADDED BULLS
        </h1>
        <div className="container mt-5" style={{fontFamily:"Poppins"}}>
          <div className="row mx-auto">
            {/* Card 1 */}
            <div className="col-md-4 h-100">
              <div
                className="card position-relative"
                style={{ width: "20rem",height:"25rem" }}
              >
                <div className="image-container">
                  <img
                    src="https://copilot.microsoft.com/th/id/BCO.034ab4d6-139c-4774-b7d8-9040567092ce.png"
                    className="card-img-top img-fluid"
                    alt="..."
                  />
                  <div className="overlay d-flex align-items-center justify-content-center">
                    <a href="#" className="btn btn-primary rounded-circle">
                      +
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="card-title" style={{ cursor: "pointer" }}>
                    FWCF23U215L FLORIDA FW TOMU KUN S001 215L
                  </h5>
                  <p className="card-text">
                    <span className="fw-bold">Price:</span> $400.00
                  </p>
                  <a href="#" className="btn btn-primary rounded-1">
                    View Details
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-4  my-3 my-lg-0 h-100">
              <div
                className="card position-relative"
                style={{ width: "20rem",height:"25rem"  }}
              >
                <div className="image-container">
                  <img
                    src="https://copilot.microsoft.com/th/id/BCO.42910af5-694d-4d11-82b2-567e34a33d44.png"
                    className="card-img-top img-fluid"
                    alt="..."
                  />
                  <div className="overlay d-flex align-items-center justify-content-center">
                    <a href="#" className="btn btn-primary rounded-circle">
                      +
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="card-title" style={{ cursor: "pointer" }}>
                    Wyndford Itoguni 308H – Conventional
                  </h5>
                  <p className="card-text">
                    <span className="fw-bold">Price:</span> $575.00
                  </p>
                  <a href="#" className="btn btn-primary rounded-1">
                    View Details
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-4 h-100">
              <div
                className="card position-relative"
                style={{ width: "20rem",height:"25rem"  }}
              >
                <div className="image-container">
                  <img
                    src="https://copilot.microsoft.com/th/id/BCO.034ab4d6-139c-4774-b7d8-9040567092ce.png"
                    className="card-img-top img-fluid"
                    alt="..."
                  />
                  <div className="overlay d-flex align-items-center justify-content-center">
                    <a href="#" className="btn btn-primary rounded-circle">
                      +
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="card-title" style={{ cursor: "pointer" }}>
                    FWCF23U215L FLORIDA FW TOMU KUN S001 215L Sexed for Female
                  </h5>
                  <p className="card-text">
                    <span className="fw-bold">Price:</span> $400.00
                  </p>
                  <a href="#" className="btn btn-primary rounded-1">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
