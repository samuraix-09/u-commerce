import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import Card from "../components/Card";

function Home() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function productCaller() {
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();
      setProduct(data);
    }
    productCaller();
  }, []);

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="home">

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>

      <div className="product-list">
        {product.map((item) => (
          <Card name={item.name} description={item.description} 
          price={item.price} quantity={item.quantity} inCart={item.inCart} inStock={item.inStock}
          key={item.id}/>
        ))}
      </div>
    </div>
  );
}

export default Home;
