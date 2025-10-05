import { useNavigate } from "react-router-dom";

export default function Connect() {
  const navigate = useNavigate()
  return (
    <>
      <div className="site-links-section py-5">
        <div className="container">
          <h2 className="mb-4" style={{ fontFamily: "Syne" }}>
            Connect Now
          </h2>
          <div className="border border-primary"></div>
          <div className="fs-5 my-2" style={{ fontFamily: "Poppins" }}>
            We want to hear from you! Please click the button below to Contact
            Us.
          </div>
          <button className="btn btn-primary btn-lg rounded-1" onClick={()=> navigate('/contact-us')}>Contact us</button>
        </div>
      </div>
    </>
  );
}
