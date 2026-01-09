import { Link, useNavigate } from "react-router-dom";
import "../styles/Account.css";
import {
  FaBoxOpen,
  FaUser,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBell,
  FaQuestionCircle,
  FaLifeRing,
  FaSignOutAlt,
  FaUserCircle
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const loginConf = localStorage.getItem("loginConf");
        if (!loginConf) return navigate("/login");

        const parsed = JSON.parse(loginConf);
        const id = parsed.user.id;

        const res = await fetch(`http://localhost:3000/users/${id}`);
        const data = await res.json();

        setUser(data);
      } catch (err) {
        console.error(err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [navigate]);

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
      <div className="account-container">

        <div className="profile-card">
          <div className="avatar">
            {user.avatar ? (
              <img src={user.avatar} alt="avatar" />
            ) : (
              <FaUserCircle />
            )}
          </div>
          <div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        </div>

        {/* SECTIONS */}
        <div className="sections">

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

            <Link className="account-item" to="/change_picture">
            <FaUserCircle className="icon"/>
            <span>Change My Avatar Image</span>
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
      </div>
    </div>
  );
}
