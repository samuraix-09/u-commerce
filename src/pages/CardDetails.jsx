import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/CardDetails.css"

export default function CardDetails() {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        (async function fetchItem() {
            const res = await fetch(`http://localhost:3000/products/${id}`);
            const data = await res.json();
            setItem(data);
        })();
    }, [id]);

    if (!item) return <h2>Loading...</h2>;

    return (
        <div className="card-details">
            <img src={item.image} alt={item.description} />
            <div className="detail-description">
            <h1>Name: {item.name}</h1>
            <p>Description: {item.description}</p>
            <h3>Price: {item.price}</h3>
            <h5>In stock: {item.quantity}</h5>
            <button>To cart</button>
            </div>
        </div>
    );
}
