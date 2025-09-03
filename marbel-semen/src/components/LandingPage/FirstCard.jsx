import MainImg from '../../assets/media/Landingpage.png'
import "../../../src/assets/styles/LandingPage.css"

export default function FirstCard() {
  return (
    <>
      <div 
        style={{
          backgroundImage: `url(${MainImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "600px",  
          width: "100%"
        }}
        className='d-flex flex-column align-items-center justify-content-center'
      >
        {/* Logo inside white box */}
        <div className="shadow-box p-3 mb-3">
          <img 
            className='img-fluid' 
            width={"300px"} 
            src="https://www.marblesemen.com/wp-content/uploads/2021/06/Marblesemen-logo-no-outline.png" 
            alt="logo" 
          />
        </div>

        {/* Button inside white box */}
        <div className="button-shadow p-2">
          <button className="btn btn-primary rounded-1 btn-lg">
            BULL BATTERY
          </button>
        </div>
      </div>
    </>
  );
}
