export default function CartCard({ data }) {
    console.log("here: ", data);
    return (
        <div className="cart-card">
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <h3>{data.cartQuantity}</h3>
        </div>
    )
};