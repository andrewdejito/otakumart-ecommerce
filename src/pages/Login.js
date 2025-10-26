import React from "react";
import { Form, Button, Container } from "react-bootstrap";

function Login() {
  return (
    <main className="auth-page">
      <Container className="d-flex justify-content-center align-items-center flex-column">
        <h2 className="fw-bold mb-4">Login</h2>
        <Form className="auth-form p-4 rounded-3 shadow-sm bg-white">
          <Form.Group className="mb-3">
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control type="password" placeholder="Password" />
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
