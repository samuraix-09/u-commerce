import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) throw new Error("Error at submitting!");
            const data = await res.json();
            localStorage.setItem("loginConf", JSON.stringify(data));
            navigate("/home");
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="container">
            <h3>Log In</h3>
            <form onSubmit={handleSubmit}>
                <Link to="/signin">Or Sign In</Link>
                <div>
                    <label style={{ color: "white" }}>Email</label>
                    <input
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        type="email"
                        required
                    />
                </div>
                <div>
                    <label style={{ color: "white" }}>Password</label>
                    <input
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="********"
                        required
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}
