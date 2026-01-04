import "../styles/Card.css"
function Card({name , description , price , quantity , inCart , inStock }){

    return <div className={inStock ? "ok" : "false"}>
            <h1>Nomi: {name}</h1>
            <p>Ta'rif: {description}</p>
            <h3>Narxi: {price}</h3>
            <h5>Bizda mavjud {quantity} dona</h5>
            <button>Qoshish</button>
    </div>
}

export default Card