import { useEffect, useRef, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/CardDetails.css";
import { addToCart } from "../utils/cartSavedInteractions";

export default function CardDetails() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        (async function fetchItem() {
            const res = await fetch(`http://localhost:3000/products/${id}`);
            const data = await res.json();
            setItem(data);
        })();
    }, [id]);

    const increaseQuantity = () => {
        if (item && quantity < item.quantity) {
            setQuantity(prev => prev + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);

        if (!isNaN(value) && value > 0) {
            if (item && value > item.quantity) {
                setQuantity(item.quantity);
            } else {
                setQuantity(value);
            }
        } else if (e.target.value === "") {
            setQuantity("");
        }
    };

    const handleQuantityBlur = () => {
        if (quantity === "" || quantity < 1) {
            setQuantity(1);
        }
    };

    if (!item) return <h2>Loading...</h2>

    return (
        <div className="card-details">
            <div className="inner-cartDetails">
                <img src={item.image} alt="" width={220} height={370} className="product-image-in-detail" />
                <h1>Name: {item.name}</h1>
                <p>Description: {item.description}</p>
                <h3>Price: {item.price}</h3>
                <h3>In stock: {item.quantity}</h3>
            </div>
            <div className="inner-cartDetails">
                {quantity === 0 ?
                    <div>
                        <button
                            className="add-to-cart-btn"
                            onClick={() => {
                                setQuantity(1);
                                addToCart(id, 1);
                            }}
                        >
                            Add to cart
                        </button>
                    </div> :
                    <div className="quantity-div">
                        <button
                            className="quantity-btn"
                            onClick={decreaseQuantity}
                            disabled={quantity <= 1}
                        >
                            <FaMinus />
                        </button>

                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            onBlur={handleQuantityBlur}
                            min="1"
                            max={item.quantity}
                            className="quantity-input"
                        />

                        <button
                            className="quantity-btn"
                            onClick={increaseQuantity}
                            disabled={item && quantity >= item.quantity}
                        >
                            <FaPlus />
                        </button>

                        <button
                            className="see-in-cart-btn"
                            onClick={() => {
                                addToCart(id, quantity);
                            }}
                        >
                            Add to cart
                        </button>
                    </div>}

                <div className="delivery-info">
                    <h3>Gets delivered within a week</h3>
                    <p>To the pick-up point or by a courier</p>
                </div>

                <div className="payment-info">
                    <h3>Pay however you want</h3>
                    <p>By credit card or by cash</p>
                </div>
            </div>
        </div>
    );
};