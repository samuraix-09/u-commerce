import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Iltimos, email va parolni kiriting");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login muvaffaqiyatsiz");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/home");
    } catch (err) {
      setError(err.message || "Server xatosi");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container login-container">
      <div className="login-header">
        <h2>Tizimga Kirish</h2>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Parol</label>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
              disabled={loading}
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
          {loading ? "Kirilmoqda..." : "Tizimga Kirish"}
        </button>

        <div className="signup-link">
          <span>Hisobingiz yo'qmi? </span>
          <Link to="/signin">Ro'yxatdan o'ting</Link>
        </div>
      </form>
    </div>
  );
}
