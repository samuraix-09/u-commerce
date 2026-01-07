import Card from "./Card";

function SearchElements({ elements }) {
  if (!elements.length) return <p>Natija topilmadi</p>;

  return (
    <div className="search-results">
      {elements.map(item => (
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
  );
}

export default SearchElements;
