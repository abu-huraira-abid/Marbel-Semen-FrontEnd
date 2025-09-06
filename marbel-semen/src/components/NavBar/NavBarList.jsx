import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../assets/styles/NavBar.css";

export default function NavBarList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("Home");

  // Sync active state with URL on page load / refresh / direct navigation
  useEffect(() => {
    const path = location.pathname;

    if (path === "/") setActive("Home");
    else if (path.includes("/bull-battery")) setActive("Bull Battery");
    else if (path.includes("/commerical-bulls")) setActive("Commerical Bulls");
    else if (path.includes("/other-semen")) setActive("Other Semen");
    else if (path.includes("/embryos")) setActive("Embryos");
    else if (path.includes("/process")) setActive("Process");
    else if (path.includes("/specials")) setActive("Specials");
    else if (path.includes("/about-us")) setActive("About Us");
    else if (path.includes("/contact-us")) setActive("Contact Us");
  }, [location.pathname]);

  const handleClick = (label, path) => {
    setActive(label);
    if (path) navigate(path);
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-primary"
      style={{ fontFamily: "Poppins" }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand" href="#">
          <img
            className="img-fluie"
            fetchpriority="high"
            decoding="async"
            width="60"
            height="60"
            style={{ backgroundColor: "white", borderRadius: "5px" }}
            src="https://www.marblesemen.com/wp-content/uploads/2021/05/marblesemenlogo.png"
            alt=""
            title="marblesemenlogo"
          />
        </a>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav text-center mx-auto mb-2 mb-lg-0 fs-5 text-uppercase">
            <li className="nav-item">
              <a
                className={`nav-link text-white ${
                  active === "Home" ? "active" : ""
                }`}
                onClick={() => handleClick("Home", "/")}
              >
                Home
              </a>
            </li>

            {/* Semen Dropdown */}
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle text-white ${
                  ["Bull Battery", "Commerical Bulls", "Other Semen"].includes(
                    active
                  )
                    ? "active"
                    : ""
                }`}
                role="button"
                data-bs-toggle="dropdown"
              >
                Semen
              </a>
              <ul className="dropdown-menu custom-dropdown">
                <li>
                  <a
                    className={`dropdown-item ${
                      active === "Bull Battery" ? "active" : ""
                    }`}
                    onClick={() => handleClick("Bull Battery", "/bull-battery")}
                  >
                    Bull Battery
                  </a>
                </li>
                <li>
                  <a
                    className={`dropdown-item ${
                      active === "Commerical Bulls" ? "active" : ""
                    }`}
                    onClick={() =>
                      handleClick("Commerical Bulls", "/commerical-bulls")
                    }
                  >
                    Commerical Bulls
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className={`dropdown-item ${
                      active === "Other Semen" ? "active" : ""
                    }`}
                    onClick={() => handleClick("Other Semen", "/other-semen")}
                  >
                    Other Semen
                  </a>
                </li>
              </ul>
            </li>

            {/* Embryos */}
            <li className="nav-item">
              <a
                className={`nav-link text-white ${
                  active === "Embryos" ? "active" : ""
                }`}
                onClick={() => handleClick("Embryos", "/embryos")}
              >
                Embryos
              </a>
            </li>

            {/* The Process */}
            <li className="nav-item">
              <a
                className={`nav-link text-white ${
                  active === "Process" ? "active" : ""
                }`}
                onClick={() => handleClick("Process", "/process")}
              >
                The Process
              </a>
            </li>

            {/* Specials */}
            <li className="nav-item">
              <a
                className={`nav-link text-white ${
                  active === "Specials" ? "active" : ""
                }`}
                onClick={() => handleClick("Specials", "/specials")}
              >
                Specials
              </a>
            </li>

            {/* More Dropdown */}
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle text-white ${
                  ["About Us", "Contact Us"].includes(active) ? "active" : ""
                }`}
                role="button"
                data-bs-toggle="dropdown"
              >
                More
              </a>
              <ul className="dropdown-menu custom-dropdown">
                <li>
                  <a
                    className={`dropdown-item ${
                      active === "About Us" ? "active" : ""
                    }`}
                    onClick={() => handleClick("About Us", "/about-us")}
                  >
                    About us
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className={`dropdown-item ${
                      active === "Contact Us" ? "active" : ""
                    }`}
                    onClick={() => handleClick("Contact Us", "/contact-us")}
                  >
                    Contact us
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          {/* Cart Icon */}
          <div className="cart-icon-wrapper text-center mx-lg-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              className="bi bi-cart-check-fill"
              viewBox="0 0 16 16"
            >
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708" />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
}
