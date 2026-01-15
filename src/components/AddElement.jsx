import { useReducer, useState } from "react";
import "../styles/Modal.css";

const initialState = {
  name: "",
  assestant: "",
  description: "",
  moreInfo: "",
  quantity: "",
  price: "",
  image: "",
  category: ""
};

const categories = [
  "food",
  "home",
  "clothes",
  "electronics",
  "kitchen",
  "cosmetics",
  "music"
];

function reducer(state, action) {
  return { ...state, [action.type]: action.payload };
}

export default function AddElement({ onClose }) {
  const [data, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!data.name.trim()) e.name = "Mahsulot nomi kerak";
    if (!data.category) e.category = "Kategoriya tanlang";
    if (!data.quantity || Number(data.quantity) <= 0) e.quantity = "Son > 0";
    if (!data.price || Number(data.price) <= 0) e.price = "Narx > 0";
    return e;
  };

  async function addelement() {
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          quantity: Number(data.quantity),
          price: Number(data.price),
          status: "new",
          inStock: true,
          purchased: 0
        })
      });

      if (!res.ok) throw new Error("Failed");
      onClose();
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (f, v) => {
    dispatch({ type: f, payload: v });
    setErrors(p => ({ ...p, [f]: null }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal wide" onClick={e => e.stopPropagation()}>
        <h2>Add new element</h2>

        <div className="modal-grid">
          <div className="modal-col">
            <div className={`input-group ${errors.name ? "error" : data.name ? "filled" : ""}`}>
              <input value={data.name} onChange={e => handleChange("name", e.target.value)} />
              <label>Product name</label>
            </div>

            <div className={`input-group ${data.assestant ? "filled" : ""}`}>
              <input value={data.assestant} onChange={e => handleChange("assestant", e.target.value)} />
              <label>Assestant name</label>
            </div>

            <div className={`input-group ${errors.price ? "error" : data.price ? "filled" : ""}`}>
              <input type="number" value={data.price} onChange={e => handleChange("price", e.target.value)} />
              <label>Price</label>
            </div>
          </div>

          <div className="modal-col">
            <div className={`input-group ${data.description ? "filled" : ""}`}>
              <input value={data.description} onChange={e => handleChange("description", e.target.value)} />
              <label>Description</label>
            </div>

            <div className={`input-group ${data.moreInfo ? "filled" : ""}`}>
              <textarea value={data.moreInfo} onChange={e => handleChange("moreInfo", e.target.value)} />
              <label>More info</label>
            </div>

            <div className={`input-group ${errors.category ? "error" : data.category ? "filled" : ""}`}>
              <select value={data.category} onChange={e => handleChange("category", e.target.value)}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <label>Category</label>
            </div>

            <div className={`input-group ${errors.quantity ? "error" : data.quantity ? "filled" : ""}`}>
              <input type="number" value={data.quantity} onChange={e => handleChange("quantity", e.target.value)} />
              <label>Quantity</label>
            </div>

            <div className={`input-group ${data.image ? "filled" : ""}`}>
              <input value={data.image} onChange={e => handleChange("image", e.target.value)} />
              <label>Image URL</label>
            </div>
          </div>
        </div>

        <div className="modal-actions center">
          <button className="btn-save" onClick={addelement} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button className="btn-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
