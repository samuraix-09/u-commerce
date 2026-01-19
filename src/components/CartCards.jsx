import "../styles/CardCart.css"

export default function CartCard({ data, onRemove, onIncrease, onDecrease }) {
    const isLowQuantity = data.cartQuantity < 3;
    const isPremium = data.isPremium || data.price > 100;
    
    return (
        <div className="cart-card">
            
            <button 
                className="cart-card__delete-btn"
                onClick={() => onRemove && onRemove(data.id)}
                title="O'chirish"
            >
                ×
            </button>
            
            <div className="cart-card__image-box">
                <img
                    src={data.image}
                    alt={data.name}
                    className="cart-card__image"
                />
            </div>

            <div className="cart-card__content">
                <h1 className="cart-card__title">
                    {data.name}
                </h1>

                <p className="cart-card__description">
                    {data.description}
                </p>

                <p className="cart-card__more">
                    {data.moreInfo}
                </p>

                <div className="cart-card__footer">
                    <span className="cart-card__quantity-label">Soni:</span>
                    
                    <div className="card-cart__buttondiv">
                        <button 
                            onClick={() => onIncrease && onIncrease(data.id)}
                            title="Qo'shish"
                        >
                            +
                        </button>
                        
                        <span className={`cart-card__quantity ${isLowQuantity ? 'cart-card__quantity--low' : ''}`}>
                            {data.cartQuantity}
                        </span>
                        
                        <button 
                            onClick={() => onDecrease && onDecrease(data.id)}
                            title="Kamaytirish"
                            disabled={data.cartQuantity <= 1}
                            style={{ 
                                opacity: data.cartQuantity <= 1 ? 0.5 : 1,
                                cursor: data.cartQuantity <= 1 ? 'not-allowed' : 'pointer' 
                            }}
                        >
                            -
                        </button>
                    </div>
                    
                    {data.price && (
                        <span className="cart-card__price">
                            ${(data.price * data.cartQuantity).toFixed(2)}
                            {data.originalPrice && (
                                <span>
                                    ${(data.originalPrice * data.cartQuantity).toFixed(2)}
                                </span>
                            )}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}