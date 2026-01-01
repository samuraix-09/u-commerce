import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";

export default function SignIn() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
    });
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, id: String(Date.now()) }),
            });
            console.log(res);
            if (!res.ok) throw new Error("Error at submitting!");
            const data = await res.json();
            localStorage.setItem("loginConf", JSON.stringify(data));
            setForm({ name: "", email: "", password: "", role: "student" });
            navigate("/");
            console.log(data);
        } catch (error) {
            alert(error.message);
        };
    };

    return (
        <div className="container">
            <h3>Register</h3>
            <form onSubmit={handleSubmit}>
                <Link to="/login">Or Log In</Link>
                <div>
                    <label style={{ color: "white" }}>Name</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Name"
                        type="text"
                        required
                    />
                </div>

                <div>
                    <label style={{ color: "white" }}>Email</label>
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        type="email"
                        required
                    />
                </div>

                <div>
                    <label style={{ color: "white" }}>Password</label>
                    <input
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="********"
                        required
                    />
                </div>

                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};