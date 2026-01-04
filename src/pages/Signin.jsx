import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";

export default function Signin() {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState(localStorage.getItem("password") || "");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!name || !email || !password) {
      setError("Iltimos, barcha maydonlarni to‘ldiring");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password , status:"user" , id:Math.random()*1000000000000}),
      });
      
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Ro‘yxatdan o‘tish muvaffaqiyatsiz");
      }

      // Foydalanuvchi muvaffaqiyatli ro‘yxatdan o‘tgandan so‘ng localStorage tozalash
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("password");

      navigate("/home");
    } catch (err) {
      setError(err.message || "Server xatosi");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container signin-container">
      <div className="signin-header">
        <h2>Ro'yxatdan O'tish</h2>
      </div>

      <form onSubmit={handleSubmit} className="signin-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label>Ism</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Parol</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              minLength={8}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Yaratilmoqda..." : "Ro'yxatdan O'tish"}
        </button>

        <div className="signin-link">
          <span>Allaqachon hisobingiz bormi? </span>
          <Link to="/login">Tizimga kirish</Link>
        </div>
      </form>
    </div>
  );
}
