import { useEffect, useState } from "react";
import Card from "../components/Card";
import "../styles/Cart.css";
import { getMethod } from "../utils/cartSavedInteractions";

function Saved() {
  const [cartproducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const data = await getMethod(
        JSON.parse(localStorage.getItem("loginConf")).user.id,
        "saved"
      );
      setCartProducts(data);
    };

    fetchCart();
  }, []);

  return (
    <div className="cart-page">
      <h1 className="cart-title">There appears the products you added to your saved list</h1>

      {cartproducts.length === 0 && (
        <p className="cart-empty">It seems like you have not liked anything, yet.</p>
      )}

      <div className="cart-grid">
        {cartproducts.map(item => (
          <Card
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            quantity={item.quantity}
            inCart={item.inCart}
            inStock={item.inStock}
            id={item.id}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Saved;
