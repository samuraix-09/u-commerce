import { useEffect, useState } from "react";
import Card from "../components/Card";
import "../styles/Cart.css";
import { getMethod } from "../utils/cartSavedInteractions";

function Cart() {
  const [cartproducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const data = await getMethod(
        JSON.parse(localStorage.getItem("loginConf")).user.id,
        "cart"
      );
      setCartProducts(data);
    };

    fetchCart();
  }, []);

  

  return (
    <div className="cart-page">
      <h1 className="cart-title">There appears the products you added to your cart</h1>

      {cartproducts.length === 0 && (
        <p className="cart-empty">Cart is empty, for now.</p>
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

export default Cart;
