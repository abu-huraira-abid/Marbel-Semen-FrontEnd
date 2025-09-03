import { useEffect } from "react";
import "../../assets/styles/NavBar.css";

export default function NavBarList() {
  useEffect(() => {
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        links.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      });
    });
  }, []);

  return (
    <>
      <nav
        class="navbar navbar-expand-lg bg-primary"
        style={{ fontFamily: "Poppins" }}
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img
              className="img-fluie"
              fetchpriority="high"
              decoding="async"
              width="60"
              height="60"
              style={{backgroundColor:"white",borderRadius:'5px'}}
              src="https://www.marblesemen.com/wp-content/uploads/2021/05/marblesemenlogo.png"
              alt=""
              title="marblesemenlogo"
              srcset="https://www.marblesemen.com/wp-content/uploads/2021/05/marblesemenlogo.png 2203w, https://www.marblesemen.com/wp-content/uploads/2021/05/marblesemenlogo-1280x1417.png 1280w, https://www.marblesemen.com/wp-content/uploads/2021/05/marblesemenlogo-980x1085.png 980w, https://www.marblesemen.com/wp-content/uploads/2021/05/marblesemenlogo-480x531.png 480w"
              sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 2203px, 100vw"
              class="wp-image-334"
            ></img>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav text-center mx-auto mb-2 mb-lg-0 fs-5 text-uppercase">
              <li className="nav-item">
                <a
                  className="nav-link text-white active"
                  aria-current="page"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Semen
                </a>
                <ul className="dropdown-menu custom-dropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Bull Battery
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Commerical Bulls
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Other Semen
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  Embryos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  the process
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  Specials
                </a>
              </li>
            </ul>
            <div className="cart-icon-wrapper mx-4">
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
    </>
  );
}
