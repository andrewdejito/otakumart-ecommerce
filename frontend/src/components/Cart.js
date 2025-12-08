// src/components/Cart.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useCart();
  const navigate = useNavigate();

  const increaseQty = (item) => {
    const newQty = (item.quantity || 1) + 1;
    updateCartItemQuantity(item.id, newQty);
  };

  const decreaseQty = (item) => {
    const current = item.quantity || 1;
    if (current <= 1) return;
    const newQty = current - 1;
    updateCartItemQuantity(item.id, newQty);
  };

  const getTotal = () =>
    cartItems.reduce(
      (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1),
      0
    );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  const handleRemove = (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from your cart?`)) {
      removeFromCart(id);
      alert(`🗑️ "${name}" has been removed from your cart.`);
    }
  };

  return (
    <Container className="app-container">
      <h2 className="fw-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p>Your cart is currently empty.</p>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <Table bordered hover responsive className="align-middle">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th style={{ width: 160 }}>Quantity</th>
                <th style={{ width: 150 }}>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="d-flex align-items-center gap-3">
                    <img
                      src={`http://192.168.99.100:8082/${item.product?.image || ''}`}
                      alt={item.product?.name || 'Product'}
                      width="70"
                      height="70"
                      style={{ objectFit: 'cover', borderRadius: 8 }}
                    />
                    <div>
                      <p className="m-0 fw-semibold">{item.product?.name || 'Product'}</p>
                      <p className="text-muted small m-0">₱{(item.product?.price || 0).toLocaleString()}</p>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      <Button variant="outline-secondary" size="sm" onClick={() => decreaseQty(item)}>-</Button>
                      <span className="mx-3">{item.quantity || 1}</span>
                      <Button variant="outline-secondary" size="sm" onClick={() => increaseQty(item)}>+</Button>
                    </div>
                  </td>
                  <td>₱{((item.product?.price || 0) * (item.quantity || 1)).toLocaleString()}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleRemove(item.id, item.product?.name || 'Product')}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-end align-items-center mt-4 gap-3">
            <h5 className="me-3">
              Subtotal: <span className="text-primary">₱{getTotal().toLocaleString()}</span>
            </h5>
            <Button variant="primary" onClick={handleCheckout}>Checkout</Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Cart;
