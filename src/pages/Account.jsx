import { Link } from "react-router-dom";
import "../styles/Account.css";
import {
  FaBoxOpen,
  FaUser,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBell,
  FaQuestionCircle,
  FaLifeRing,
  FaSignOutAlt
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setUser({
        name: "Sirojiddin",
        email: "sirojiddin@gmail.com",
        avatar: "https://i.pravatar.cc/150?img=12"
      });
      setLoading(false);
    }, 500);
  }, []);
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  if (loading) {
    return (
      <div className="account-page">
        <div className="skeleton profile"></div>
        <div className="skeleton card"></div>
        <div className="skeleton card"></div>
        <div className="skeleton button"></div>
      </div>
    );
  }

  return (
    <div className="account-page">

      <div className="profile-card">
        <img src={user.avatar} alt="avatar" />
        <div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      </div>

      <div className="account-section">
        <Link className="account-item" to="/my_orders">
          <FaBoxOpen className="icon" />
          <span>My Orders</span>
        </Link>
      </div>

      <div className="account-section">
        <Link className="account-item" to="/my_details">
          <FaUser className="icon" />
          <span>My Details</span>
        </Link>

        <Link className="account-item" to="/adress_book">
          <FaMapMarkerAlt className="icon" />
          <span>Address Book</span>
        </Link>

        <Link className="account-item" to="/payment_methods">
          <FaCreditCard className="icon" />
          <span>Payment Methods</span>
        </Link>

        <Link className="account-item" to="/notification">
          <FaBell className="icon" />
          <span>Notifications</span>
        </Link>
      </div>

      <div className="account-section">
        <Link className="account-item" to="/faqs">
          <FaQuestionCircle className="icon" />
          <span>FAQs</span>
        </Link>

        <Link className="account-item" to="/help_center">
          <FaLifeRing className="icon" />
          <span>Help Center</span>
        </Link>
      </div>

      <button className="logout-btn" onClick={logout}>
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}
