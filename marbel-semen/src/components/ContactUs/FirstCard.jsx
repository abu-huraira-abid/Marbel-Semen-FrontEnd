import Img from '../../../src/assets/media/About3.png'

export default function FirstCard()
{
    return(
        <>
        <div className="row gx-0 bg-light">
        <div className="col-lg-6 px-5 d-flex flex-column my-5 my-lg-0 justify-content-center order-1 order-lg-0">
          <h5 className="fs-3">Please direct any inquiries to</h5>
          <p
            className="fs-5 my-3"
            style={{ fontFamily: "Poppins" }}
          >
            Marblesemen.com
          </p>
          <p
            className="fs-5 my-3"
            style={{ fontFamily: "Poppins" }}
          >
            1866 Omni Blvd
            <br />
            Mount Pleasant, SC 29466
          </p>
          <p
            className="fs-5 my-3"
            style={{ fontFamily: "Poppins" }}
          >
            305-923-1730
          </p>
          <p
            className="fs-5 my-3"
            style={{ fontFamily: "Poppins" }}
          >
            marblesemen@gmail.com
          </p>
        </div>
        <div className="col-lg-6">
          <div className="m-3 m-lg-5">
            <img
            src={Img}
            alt=""
            className="img-fluid rounded-4"
          />
          </div>
        </div>
      </div>
        </>
    )
}