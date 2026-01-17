import { useNavigate } from "react-router-dom";
import "../styles/AdCard.css";

function AddCard({ name, description, price, id }) {
  const navigate = useNavigate();

  return (
    <div
      className="hero-slide"
      onClick={() => navigate(`/productDetails/${id}`)}
    >
      <div className="hero-content">
        <h1>{name}</h1>
        <p>{description}</p>
        <h3>{price} so'm</h3>
      </div>
    </div>
  );
}

export default AddCard;
