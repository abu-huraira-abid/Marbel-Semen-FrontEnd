import MainImg from '../../assets/media/Landingpage.png'
import "../../../src/assets/styles/LandingPage.css"
import { useNavigate } from 'react-router-dom';

export default function FirstCard() {
  const navigate = useNavigate()
  return (
    <>
    <div id="carouselExampleCaptions" className="carousel slide carousel-dark" data-bs-ride="carousel"
  data-bs-interval="5000">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>

  <div className="carousel-inner">
    {/* First Slide */}
    <div className="carousel-item active">
      <div
        style={{
          backgroundImage: `url(${MainImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "600px",
          width: "100%",
        }}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        {/* Shared content (logo + button) */}
        <div className="shadow-box p-3 mb-3">
          <img
            className="img-fluid"
            width={"300px"}
            src="https://www.marblesemen.com/wp-content/uploads/2021/06/Marblesemen-logo-no-outline.png"
            alt="logo"
          />
        </div>
        <div className="button-shadow p-2">
          <button className="btn btn-primary rounded-1 btn-lg" onClick={()=> navigate('/bull-battery')}>
            BULL BATTERY
          </button>
        </div>
      </div>
    </div>

    {/* Second Slide */}
    <div className="carousel-item">
      <div
        style={{
          backgroundImage: `url(https://copilot.microsoft.com/th/id/BCO.bec12b84-208f-406b-9256-2ec2df4f4b4c.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "600px",
          width: "100%",
        }}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <div className="shadow-box p-3 mb-3">
          <img
            className="img-fluid"
            width={"300px"}
            src="https://www.marblesemen.com/wp-content/uploads/2021/06/Marblesemen-logo-no-outline.png"
            alt="logo"
          />
        </div>
        <div className="button-shadow p-2">
          <button className="btn btn-danger rounded-1 btn-lg">
            Commercal Bulls
          </button>
        </div>
      </div>
    </div>

    {/* Third Slide */}
    <div className="carousel-item">
      <div
        style={{
          backgroundImage: `url(https://copilot.microsoft.com/th/id/BCO.b9d5ef6f-505c-4f41-ab5f-06d5d9622d07.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "600px",
          width: "100%",
        }}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <div className="shadow-box p-3 mb-3">
          <img
            className="img-fluid"
            width={"300px"}
            src="https://www.marblesemen.com/wp-content/uploads/2021/06/Marblesemen-logo-no-outline.png"
            alt="logo"
          />
        </div>
        <div className="button-shadow p-2">
          <button className="btn btn-primary rounded-1 btn-lg">
            BULL BATTERY
          </button>
        </div>
      </div>
    </div>
  </div>

  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

    </>
  );
}
