import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://192.168.99.100:8082/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // store token and user in localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // set user in state to show welcome
      setUser(data.user);

    } catch (err) {
      setError(err.message);
    }
  };

  // If user is logged in, show welcome message
  if (user) {
    return (
      <main className="auth-page">
        <Container className="d-flex justify-content-center align-items-center flex-column">
          <h2 className="fw-bold mb-4">Welcome, {user.name}!</h2>
          <p>You have successfully logged in.</p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Go to Homepage
          </Button>
        </Container>
      </main>
    );
  }

  // Otherwise, show login form
  return (
    <main className="auth-page">
      <Container className="d-flex justify-content-center align-items-center flex-column">
        <h2 className="fw-bold mb-4">Login</h2>
        <Form onSubmit={handleSubmit} className="auth-form p-4 rounded-3 shadow-sm bg-white">
          {error && <p className="text-danger">{error}</p>}
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 btn-signup">
            Login
          </Button>
        </Form>
      </Container>
    </main>
  );
}

export default Login;
