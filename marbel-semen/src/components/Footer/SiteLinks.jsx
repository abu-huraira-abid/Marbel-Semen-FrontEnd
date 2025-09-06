import { useNavigate } from "react-router-dom";

export default function SiteLinks() {

  const navigate = useNavigate()
  return (
    <div className="site-links-section py-5">
      <div className="container">
        <h2 className="mb-4"style={{fontFamily:"Syne"}}>Site Links</h2>
        <div className="border border-primary"></div>
        <ul className="site-links list-unstyled" style={{fontFamily:"Poppins"}}>
          <li>
            <a href="#">Bull Battery</a>
          </li>
          <li>
            <a href="#">The Process</a>
          </li>
          <li>
            <a href="#" onClick={()=> navigate("/about-us")}>About Us</a>
          </li>
          <li>
            <a href="#" onClick={()=> navigate("/contact-us")}>Contact Us</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
