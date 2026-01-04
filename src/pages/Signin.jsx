import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";

export default function Signin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
      setError("Please fill out all the fields!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, email: email, password: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to sign in!");
      };

      localStorage.setItem("loginConf", JSON.stringify(data));

      navigate("/home");
    } catch (err) {
      setError(err.message || "Server is not responding!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container signin-container">
      <div className="signin-header">
        <h2>Register</h2>
      </div>

      <form onSubmit={handleSubmit} className="signin-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
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
          {loading ? "Yaratilmoqda..." : "Ro‘yxatdan O‘tish"}
        </button>

        <div className="signin-link">
          <span style={{marginRight: "15px"}}>Have an account?</span>
          <Link to="/login">Log in</Link>
        </div>
      </form>
    </div>
  );
}
