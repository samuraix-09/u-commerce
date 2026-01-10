import { useReducer, useState } from "react";
import "../styles/Modal.css";

const initialState = {
  name: "",
  description: "",
  number: "",
  price: "",
  image: ""
};

function reducer(state, action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "description":
      return { ...state, description: action.payload };
    case "number":
      return { ...state, number: action.payload };
    case "price":
      return { ...state, price: action.payload };
    case "image":
      return { ...state, image: action.payload };
    default:
      return state;
  }
}

export default function AddElement({ onClose }) {
  const [data, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!data.name.trim()) newErrors.name = "Mahsulot nomi kerak";
    if (!data.number || Number(data.number) <= 0) newErrors.number = "Son > 0 bo‘lishi kerak";
    if (!data.price || Number(data.price) <= 0) newErrors.price = "Narx > 0 bo‘lishi kerak";
    return newErrors;
  };

  async function addelement() {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          number: Number(data.number),
          price: Number(data.price),
          status: "new",
          inStock: true,
          purchased: 0
        })
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to Add element");

      alert("Element muvaffaqiyatli qo‘shildi!");
      onClose();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (field, value) => {
    dispatch({ type: field, payload: value });
    setErrors(prev => ({ ...prev, [field]: null }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>Add new element</h2>

        {/** INPUTS **/}
        <div className={`input-group ${errors.name ? "error" : data.name ? "filled" : ""}`}>
          <input
            type="text"
            placeholder="Name"
            value={data.name}
            onChange={e => handleChange("name", e.target.value)}
          />
          <label>Mahsulot nomi</label>
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>

        <div className={`input-group ${data.description ? "filled" : ""}`}>
          <input
            type="text"
            placeholder="Description"
            value={data.description}
            onChange={e => handleChange("description", e.target.value)}
          />
          <label>Mahsulot haqida</label>
        </div>

        <div className={`input-group ${errors.number ? "error" : data.number ? "filled" : ""}`}>
          <input
            type="number"
            placeholder="Number"
            value={data.number}
            onChange={e => handleChange("number", e.target.value)}
          />
          <label>Mahsulot soni</label>
          {errors.number && <span className="error-msg">{errors.number}</span>}
        </div>

        <div className={`input-group ${errors.price ? "error" : data.price ? "filled" : ""}`}>
          <input
            type="number"
            placeholder="Price"
            value={data.price}
            onChange={e => handleChange("price", e.target.value)}
          />
          <label>Mahsulot narxi</label>
          {errors.price && <span className="error-msg">{errors.price}</span>}
        </div>

        <div className={`input-group ${data.image ? "filled" : ""}`}>
          <input
            type="text"
            placeholder="Image URL"
            value={data.image}
            onChange={e => handleChange("image", e.target.value)}
          />
          <label>Mahsulot rasm linki</label>
        </div>

        <div className="modal-actions">
          <button className="btn-save" onClick={addelement} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button className="btn-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
