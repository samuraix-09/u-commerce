import { useEffect, useState } from "react";
import "../styles/Cart.css";
import { getMethod } from "../utils/cartSavedInteractions";
import CartCard from "../components/CartCards";

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

  console.log(cartproducts);

  return (
    <div className="cart-page">
      <h1 className="cart-title">There appears the products you added to your cart</h1>

      {cartproducts.length === 0 && (
        <p className="cart-empty">Cart is empty, for now.</p>
      )}

      <div className="cart-grid">
        {cartproducts.map(item => (
          <CartCard key={item.id} data={item}/>
        ))}
      </div>
    </div>
  );
}

export default Cart;
