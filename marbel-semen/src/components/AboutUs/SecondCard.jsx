export default function SecondCard() {
  return (
    <>
      <div className="row gx-0">
        <div className="col-lg-6 px-4 d-flex flex-column my-5 my-lg-0 align-items-center justify-content-center order-1 order-lg-0">
          <p
            className="fs-5 text-center my-3"
            style={{ fontFamily: "Poppins" }}
          >
            Each sire has a declaration as to which country his semen is
            available and located in. Many of the Sires are stored in multiple
            countries and as such are rapidly available to ship in many places
            throughout the World.
          </p>
          <p
            className="fs-5 text-center my-3"
            style={{ fontFamily: "Poppins" }}
          >
            Most Sires on offer are available at discounted pricing based on
            volume of purchase.
          </p>
        </div>
        <div className="col-lg-6">
          <img
            src="https://copilot.microsoft.com/th/id/BCO.9dc25ff5-8134-4a92-a34e-88752a492fd1.png"
            alt=""
            className="img-fluid"
          />
        </div>
      </div>
    </>
  );
}
