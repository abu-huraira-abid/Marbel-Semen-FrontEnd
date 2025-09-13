import {
  FaHome,
  FaBullhorn,
  FaFlask,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaCog,
  FaBars,
} from "react-icons/fa";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../assets/styles/Dashboard.css";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/account/dashboard" },
    { name: "Bulls", icon: <FaBullhorn />, path: "/account/bulls" },
    { name: "Semen Batches", icon: <FaFlask />, path: "/account/semen-batches" },
    { name: "Orders", icon: <FaShoppingCart />, path: "/account/orders" },
    { name: "Customers", icon: <FaUsers />, path: "/account/customers" },
    { name: "Reports", icon: <FaChartBar />, path: "/account/reports" },
    { name: "Settings", icon: <FaCog />, path: "/account/settings" },
  ];

  return (
    <>
      {/* Toggle button (only visible on mobile/tablet) */}
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
                onClick={() => setIsOpen(false)} // auto-close on mobile
              >
                <span className="me-2">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
