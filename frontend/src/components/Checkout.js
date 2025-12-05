// src/components/Checkout.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: '',
    zipcode: '',
    email: '',
    cardNumber: '',
    payment: ''
  });

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.address || !form.payment) {
      alert('⚠️ Please fill all required fields.');
      return;
    }

    alert(`✅ Order placed successfully!\nThank you, ${form.firstName}!\nTotal: ₱${total.toLocaleString()}`);

    clearCart();
    navigate('/');
  };

  return (
    <Container className="app-container">
      <h2 className="fw-bold mb-4">Checkout</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="g-4">
          <Col md={5}>
            <h5>Delivery Address</h5>
            <p className="text-muted small">Shipping Information</p>

            <Row>
              <Col>
                <Form.Control type="text" name="firstName" placeholder="First Name" className="mb-2" value={form.firstName} onChange={handleInput} />
              </Col>
              <Col>
                <Form.Control type="text" name="lastName" placeholder="Last Name" className="mb-2" value={form.lastName} onChange={handleInput} />
              </Col>
            </Row>

            <Form.Control type="text" name="address" placeholder="Address" className="mb-2" value={form.address} onChange={handleInput} />
            <Form.Control type="text" name="apartment" placeholder="Apartment, suite, etc. (optional)" className="mb-2" value={form.apartment} onChange={handleInput} />
            <Form.Control type="text" name="city" placeholder="City" className="mb-2" value={form.city} onChange={handleInput} />

            <Row>
              <Col>
                <Form.Control type="text" name="country" placeholder="Country" className="mb-2" value={form.country} onChange={handleInput} />
              </Col>
              <Col>
                <Form.Control type="text" name="zipcode" placeholder="Zipcode" className="mb-2" value={form.zipcode} onChange={handleInput} />
              </Col>
            </Row>

            <Form.Check type="checkbox" label="Save information" className="mt-2" />
          </Col>

          <Col md={4}>
            <h5>Payment Method</h5>
            <Form.Check type="radio" name="payment" label="Cash on Delivery" value="COD" onChange={handleInput} />
            <Form.Check type="radio" name="payment" label="Credit Card" value="Credit Card" onChange={handleInput} className="mb-3" />

            <h6>Payment Details</h6>
            <Form.Control type="email" name="email" placeholder="Email" className="mb-2" value={form.email} onChange={handleInput} />
            <Form.Control type="text" name="cardNumber" placeholder="Card Number" value={form.cardNumber} onChange={handleInput} />
          </Col>

          <Col md={3}>
            <h5>Products Ordered</h5>
            <div className="border rounded p-2 mb-2">
              {cartItems.length === 0 ? (
                <div className="small text-muted">No items in cart</div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="d-flex align-items-center mb-2">
                    <Image src={item.image} alt={item.name} width={60} height={60} rounded style={{ objectFit: 'cover' }} />
                    <div className="ms-2 flex-grow-1">
                      <div className="mb-0 fw-semibold small">{item.name}</div>
                      <div className="text-muted small">₱{item.price.toLocaleString()}</div>
                      <div className="small">Quantity: {item.quantity || 1}</div>
                    </div>
                  </div>
                ))
              )}

              <Form.Control type="text" placeholder="Enter discount code" className="form-control-sm mt-2" />
            </div>

            <h6 className="text-end">
              Total Payment: <span className="text-danger fw-bold">₱{total.toLocaleString()}</span>
            </h6>

            <div className="d-flex flex-column mt-3">
              <Button variant="outline-secondary" className="mb-2" onClick={() => navigate('/cart')}>Cancel</Button>
              <Button type="submit" variant="primary">Place Order</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Checkout;
