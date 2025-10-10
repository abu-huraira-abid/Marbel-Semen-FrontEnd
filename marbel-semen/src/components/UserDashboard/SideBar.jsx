import {
  FaHome,
  FaShoppingCart,
  FaChartBar,
  FaCog,
  FaBars,
  FaSignOutAlt,
  FaHeart, 
} from "react-icons/fa";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../../src/assets/styles/Dashboard.css";
import API from "../Register/utils/Api";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const LOGOUT_URL = import.meta.env.VITE_LOGOUT;
      const refresh = localStorage.getItem("refresh_token");
      const access = localStorage.getItem("access_token");

      if (refresh && access) {
        await API.post(
          LOGOUT_URL,
          { refresh: refresh },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access}`,
            },
          }
        );
      }
    } catch (error) {
      console.error("Logout API error:", error.response?.data || error.message);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("userEmail");
      setLoggingOut(false);
      navigate("/account");
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/account/user/dashboard" },
    { name: "Order History", icon: <FaShoppingCart />, path: "/account/user/order-history" },
    { name: "Bull WishList", icon: <FaHeart />, path: "/account/user/wishlist" }, // ❤️ Updated icon
    { name: "Monthly Reports", icon: <FaChartBar />, path: "/account/user/reports" },
    { name: "Settings", icon: <FaCog />, path: "/account/user/settings" },
  ];

  return (
    <>
      {/* Toggle button (mobile/tablet) */}
      <button
        className="btn btn-dark d-lg-none m-2 position-fixed"
        style={{ left: "10px", top: "10px", zIndex: "1100" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars size={20} />
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar d-flex flex-column bg-dark text-white p-3 ${
          isOpen ? "open" : ""
        }`}
      >
        {/* Logo */}
        <div className="d-flex align-items-center mb-4">
          <img
            src="https://copilot.microsoft.com/th/id/BCO.9007888a-9818-481b-811f-4d5a4ecf8c29.png"
            width={"100px"}
            alt="logo"
          />
          <h4 className="m-0 ms-2" style={{ fontFamily: "Syne" }}>
            MARBEL <br /> SEMEN
          </h4>
        </div>

        {/* Nav Menu */}
        <ul className="nav nav-pills flex-column mb-auto">
          {menuItems.map((item) => (
            <li className="nav-item mb-2" key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center ${
                    isActive ? "bg-primary text-white fw-bold" : "text-white"
                  }`
                }
                style={{ transition: "0.3s" }}
                onClick={() => setIsOpen(false)}
              >
                <span className="me-2">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <div className="mt-auto text-center mx-auto mb-5 mb-lg-4">
          <button
            className="btn btn-danger px-5 rounded-1 d-flex align-items-center justify-content-center"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut && (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              >
                <span className="visually-hidden">Logging out...</span>
              </span>
            )}
            <FaSignOutAlt className="me-2" /> Logout
          </button>
        </div>
      </div>
    </>
  );
}
