import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";

export default function SignIn() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
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
            setForm({ name: "", email: "", password: ""});
            navigate("/home");
            console.log(data);
        } catch (error) {
            alert(error.message);
        };
    };

    return (
        <div className="container">
            <h3>Create an account</h3>
            <p className="subtitle">Let’s create your account.</p>

            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label>Full Name</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        type="text"
                        required
                    />
                </div>

                <div className="field">
                    <label>Email</label>
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        type="email"
                        required
                    />
                </div>

                <div className="field password">
                    <label>Password</label>
                    <input
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="Enter your password"
                        required
                    />
                    <span className="eye">👁</span>
                </div>

                <button type="submit" className="primary">
                    Create an Account
                </button>

                <div className="divider">Or</div>

                <button type="button" className="google">
                    Sign Up with Google
                </button>

                <p className="bottom">
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </form>
        </div>

    );
};