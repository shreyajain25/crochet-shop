// src/LoginPage.js
import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "./AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/products" replace />;
  }

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      // AuthContext will update and redirect
      navigate("/products");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ marginTop: 15 }}>
          Login
        </button>
      </form>
      <p style={{ marginTop: 10 }}>
        New user? <Link to="/register">Create account</Link>
      </p>
    </div>
  );
};

export default LoginPage;
