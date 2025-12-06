import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Fake login: navigate to admin products
    navigate("/admin/products");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3">Admin Login</h3>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
