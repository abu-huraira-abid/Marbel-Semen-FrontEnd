import { useNavigate } from "react-router-dom";

export default function ConnectedCard() {
  const navigate = useNavigate()
  return (
    <>
      <div className="container-fluid stay-connected-section">
        <div className="overlay d-flex flex-column align-items-center justify-content-center text-center">
          <h2 className="text-white mb-3" style={{fontFamily:"Syne"}}>Stay Connected With Us</h2>
          <button className="btn btn-primary rounded-1 btn-lg rounded-0 fs-4" onClick={()=> navigate('/account')}>
            Join us
          </button>
        </div>
      </div>
    </>
  );
}
