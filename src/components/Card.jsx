import { useNavigate } from "react-router-dom";
import "../styles/Card.css";
import addMethod from "../utils/cartSavedInteractions";

function Card({ name, description, price, quantity, inStock, id }) {
  const navigate = useNavigate();

  function addToCart(id) {
    addMethod(
      JSON.parse(localStorage.getItem("loginConf")).user.id,
      "cart",
      id
    );
  };

  function addToSaved(id) {
    addMethod(
      JSON.parse(localStorage.getItem("loginConf")).user.id,
      "saved",
      id
    );
  };

  return (
    <div className={`product-card ${!inStock ? "disabled" : ""}`}>
      <div
        className="product-body"
        onClick={() => navigate(`/productDetails/${id}`)}
      >
        <h1>{name}</h1>
        <p>{description}</p>
        <h3>{price} so'm</h3>
        <h5>{quantity} dona mavjud</h5>
      </div>

      <button className="product-btn" onClick={() => addToCart(id)}>
        Add to cart
      </button>
      <button className="product-btn" onClick={() => addToSaved(id)}>
        Add to saved
      </button>
    </div>
  );
};

export default Card;
