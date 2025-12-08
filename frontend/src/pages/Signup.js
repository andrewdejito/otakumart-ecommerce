import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
    const response = await fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
   
    alert("Registration successful!");
    navigate("/");
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="auth-page">
      <Container className="d-flex justify-content-center align-items-center flex-column">
        <h2 className="fw-bold mb-4">Create Account</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form className="auth-form p-4 rounded-3 shadow-sm bg-white" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control 
              type="text" 
              name="name"
              placeholder="Username" 
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control 
              type="email" 
              name="email"
              placeholder="Email" 
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control 
              type="password" 
              name="password"
              placeholder="Password" 
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 btn-signup" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </Form>
      </Container>
    </main>
  );
}

export default Signup;