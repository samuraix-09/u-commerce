import Card from "./Card";

function SearchElements({ elements }) {
  if (!elements.length) {
    return <div className="search-noresult">
      <h1>🔎</h1>
      <h2>No results</h2>
      <p>Try something more general</p>
    </div>
  };

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
