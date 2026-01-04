import { useNavigate } from "react-router-dom";
import "../styles/Card.css"
import addMethod from "../utils/cartSavedInteractions";

function Card({ name, description, price, quantity, inCart, inStock, id }) {
    const navigate = useNavigate();

    function addToCart(id) {
        addMethod((JSON.parse(localStorage.getItem("loginConf")).user.id), "cart", id);
    }

    return <div className={inStock ? "ok" : "false"}>
        <div onClick={() => navigate(`/productDetails/${id}`)}>
            <h1>Nomi: {name}</h1>
            <p>Ta'rif: {description}</p>
            <h3>Narxi: {price}</h3>
            <h5>Bizda mavjud {quantity} dona</h5>
        </div>
        <button onClick={() => addToCart(id)}>Add to cart</button>
    </div>
}

export default Card;