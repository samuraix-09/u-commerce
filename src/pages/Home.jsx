import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import Card from "../components/Card";
import AddCard from "../components/AddCard";

function Home() {
  const [product, setProduct] = useState([]);
  const [newProduct, setNewProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function productCaller() {
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();

      setProduct(data.filter(x => x.status === "active"));
      setNewProduct(data.filter(x => x.status === "new"));
    }
    productCaller();
  }, []);
  useEffect(() => {
    const track = document.querySelector(".hero-track");
    const slides = document.querySelectorAll(".hero-slide");
    if (!track || slides.length === 0) return;

    let index = 0;

    const update = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
    };

    const interval = setInterval(() => {
      index = (index + 1) % slides.length;
      update();
    }, 10000);

    document.querySelector(".hero-btn.right").onclick = () => {
      index = (index + 1) % slides.length;
      update();
    };

    document.querySelector(".hero-btn.left").onclick = () => {
      index = (index - 1 + slides.length) % slides.length;
      update();
    };

    return () => clearInterval(interval);
  }, [newProduct]);

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="home">
      <button className="logout-btn" onClick={logout}>Logout</button>
      <div className="hero-slider">
        <button className="hero-btn left">‹</button>

        <div className="hero-track">
          {newProduct.map(item => (
            <AddCard
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              quantity={item.quantity}
              inStock={item.inStock}
              id={item.id}
            />
          ))}
        </div>

        <button className="hero-btn right">›</button>
      </div>
      <div className="product-list">
        {product.map(item => (
          <Card
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            quantity={item.quantity}
            inStock={item.inStock}
            id={item.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
