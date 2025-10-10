import { FaHeart, FaShoppingCart, FaUserCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function QuickLinksGrid() {
  const navigate = useNavigate();

  const links = [
    { label: "Wishlist", icon: <FaHeart />, path: "/account/user/wishlist", color: "danger" },
    { label: "Orders", icon: <FaShoppingCart />, path: "/account/user/order-history", color: "success" },
    { label: "Profile", icon: <FaUserCog />, path: "/account/user/settings", color: "primary" },
  ];

  return (
    <div className="row mt-4">
      {links.map((link, index) => (
        <div className="col-12 col-md-4 mb-3" key={index}>
          <div
            className={`card shadow-sm p-4 text-center border-0 quick-link-card quick-link-${link.color}`}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(link.path)}
          >
            <div className={`fs-2 mb-2 text-${link.color} icon-wrapper`}>{link.icon}</div>
            <h6 className="fw-bold label-text">{link.label}</h6>
          </div>
        </div>
      ))}

      {/* Custom hover styles */}
      <style>
        {`
          .quick-link-card {
            transition: all 0.3s ease;
            border-radius: 15px;
            background-color: #ffffff;
            color: #212529;
          }

          .quick-link-card:hover {
            transform: translateY(-6px) scale(1.03);
            color: #fff !important;
          }

          .quick-link-danger:hover {
            background-color: #dc3545 !important;
            box-shadow: 0 8px 20px rgba(220, 53, 69, 0.25);
          }
          .quick-link-success:hover {
            background-color: #198754 !important;
            box-shadow: 0 8px 20px rgba(25, 135, 84, 0.25);
          }
          .quick-link-primary:hover {
            background-color: #0d6efd !important;
            box-shadow: 0 8px 20px rgba(13, 110, 253, 0.25);
          }

          /* When hovered, make icons & text white */
          .quick-link-card:hover .icon-wrapper,
          .quick-link-card:hover .label-text {
            color: #fff !important;
            text-shadow: none !important;
          }
        `}
      </style>
    </div>
  );
}
