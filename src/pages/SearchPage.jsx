import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchElements from "../components/SearchElements";
import "../styles/SearchPage.css";


export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const [elements, setElements] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();

      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );

      setElements(filtered);
    }

    if (query) fetchData();
    else setElements([]);
  }, [query]);

  return (
    <div className="search-page">
      <SearchElements elements={elements} />
    </div>
  );
}
