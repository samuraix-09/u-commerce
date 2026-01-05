import { useEffect, useState } from "react";
import Card from "../components/Card";
import "../styles/Cart.css";

function Cart() {
  const [cartproducts, setCartProducts] = useState([]);

  useEffect(() => {
    async function cartelement() {
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();

      const editData = data.filter(item => item.inCart === true);
      setCartProducts(editData);
    }

    cartelement();
  }, []);

  return (
    <div className="cart-page">
      <h1 className="cart-title">Korzinkangizga solgan narsalaringizni ko'rishingiz mumkin!!</h1>

      {cartproducts.length === 0 && (
        <p className="cart-empty">Savat hozircha bo‘sh</p>
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
          />
        ))}
      </div>
    </div>
  );
}

export default Cart;
