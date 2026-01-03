import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ setStatus }) {
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
      // Login uchun backendga GET qilish yoki query orqali tekshirish
      const res = await fetch(
        `http://localhost:3000/users?email=${email}&password=${password}`
      );
      const users = await res.json();

      if (users.length === 0) {
        // Foydalanuvchi topilmadi
        setError("Email yoki parol noto‘g‘ri. Ro'yxatdan o'ting!");
        navigate("/signin");
      } else {
        // Foydalanuvchi topildi
        const user = users[0];

        // Token yoki shunchaki localStorage saqlash
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", "dummy-token"); // backend bo'lmasa

        setStatus("entered");
        navigate("/home");
      }
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
