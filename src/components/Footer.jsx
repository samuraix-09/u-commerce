import { Link, useLocation } from "react-router-dom";
import { 
  FaHome, 
  FaSearch, 
  FaHeart, 
  FaShoppingCart, 
  FaUser 
} from "react-icons/fa";
import "../styles/Footer.css";

export default function Footer() {
  const location = useLocation();

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/home" },
    { name: "Search", icon: <FaSearch />, path: "/search" },
    { name: "Saved", icon: <FaHeart />, path: "/saved" },
    { name: "Cart", icon: <FaShoppingCart />, path: "/cart" },
    { name: "Account", icon: <FaUser />, path: "/account" },
  ];

  return (
    <footer className="footer">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`footer-link ${location.pathname === item.path ? "active" : ""}`}
        >
          <div className="footer-icon">{item.icon}</div>
          <div className="footer-label">{item.name}</div>
        </Link>
      ))}
    </footer>
  );
}
