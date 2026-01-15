import { useNavigate } from "react-router-dom";
import "../styles/Card.css";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";

const API = "http://localhost:3000";

function Card({ name, description, price, quantity, inStock, id, image }) {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("loginConf"))?.user?.id;

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!userId) return;

    fetch(`${API}/users/${userId}`)
      .then(res => res.json())
      .then(user => {
        setLiked(user.saved?.includes(id));
      });
  }, [id, userId]);

  // 🛒 Cart
  async function addToCart(e) {
    e.stopPropagation();

    const res = await fetch(`${API}/users/${userId}`);
    const user = await res.json();

    const updatedCart = user.cart?.includes(id)
      ? user.cart
      : [...(user.cart || []), id];

    await fetch(`${API}/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart: updatedCart })
    });
  }

  async function toggleSaved(e) {
    e.stopPropagation();

    const res = await fetch(`${API}/users/${userId}`);
    const user = await res.json();

    let updatedSaved;

    if (user.saved?.includes(id)) {
      updatedSaved = user.saved.filter(pid => pid !== id);
      setLiked(false);
    } else {
      updatedSaved = [...(user.saved || []), id];
      setLiked(true);
    }

    await fetch(`${API}/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ saved: updatedSaved })
    });
  }

  return (
    <div
      className={`product-card ${!inStock ? "disabled" : ""}`}
      onClick={() => navigate(`/productDetails/${id}`)}
    >
      <img
        src={image}
        alt={name}
        width={280}
        height={350}
        className="product-image"
      />

      <FaHeart
        className={`heart-icon ${liked ? "liked" : ""}`}
        onClick={toggleSaved}
      />

      <div className="product-body">
        <h1>{name}</h1>
        <p>{description}</p>
        <div className="price-div">
          <p className="card-price">{price} so'm</p>
        </div>
        <h5>{quantity} dona mavjud</h5>
      </div>

      <button
        className="product-btn"
        onClick={addToCart}
        disabled={!inStock}
      >
        Add to cart
      </button>
    </div>
  );
}

export default Card;
