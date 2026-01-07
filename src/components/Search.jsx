import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Search() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    const v = e.target.value;
    setValue(v);

    navigate(`/search?q=${v}`);
  }

  return (
    <div className="search">
      <input
        type="search"
        placeholder="Search 🔎..."
        className="search__input"
        value={value}
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;
