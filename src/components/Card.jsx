import { useNavigate } from "react-router-dom";
import "../styles/Card.css";
import addMethod from "../utils/cartSavedInteractions";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";

function Card({ name, description, price, quantity, inStock, id , image }) {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("loginConf"))?.user?.id;

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("saved")) || [];
    setLiked(saved.includes(id));
  }, [id]);

  function addToCart(id) {
    addMethod(userId, "cart", id);
  }

  function toggleSaved(e) {
    e.stopPropagation();

    addMethod(userId, "saved", id);
    setLiked(prev => !prev);
  }

  return (
    <div className={`product-card ${!inStock ? "disabled" : ""}`}>
      <img src={image} alt="" width={280} height={350} className="product-image"/>
      
      <FaHeart
        className={`heart-icon ${liked ? "liked" : ""}`}
        onClick={toggleSaved}
      />

      <div
        className="product-body"
        onClick={() => navigate(`/productDetails/${id}`)}
      >
        <h1>{name}</h1>
        <p>{description}</p>
        <h3>{price} so'm</h3>
        <h5>{quantity} dona mavjud</h5>
      </div>

      <button
        className="product-btn"
        onClick={() => addToCart(id)}
        disabled={!inStock}
      >
        Add to cart
      </button>
    </div>
  );
}

export default Card;
