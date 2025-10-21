// src/components/Cart.js
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const increaseQty = (item) => {
    item.quantity = (item.quantity || 1) + 1;
  };

  const decreaseQty = (item) => {
    if ((item.quantity || 1) > 1) item.quantity -= 1;
  };

  const getTotal = () =>
    cartItems.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  const handleRemove = (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to remove "${name}" from your cart?`
    );
    if (confirmDelete) {
      removeFromCart(id);
      alert(`🗑️ "${name}" has been removed from your cart.`);
    }
  };

  return (
    <main className="container py-5">
      <h2 className="fw-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p>Your cart is currently empty.</p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th style={{ width: "160px" }}>Quantity</th>
                <th style={{ width: "150px" }}>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="d-flex align-items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      width="70"
                      height="70"
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                    <div>
                      <p className="m-0 fw-semibold">{item.name}</p>
                      <p className="text-muted small m-0">
                        ₱{item.price.toLocaleString()}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => decreaseQty(item)}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity || 1}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => increaseQty(item)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    ₱{(item.price * (item.quantity || 1)).toLocaleString()}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemove(item.id, item.name)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-end align-items-center mt-4">
            <h5 className="me-3">
              Subtotal:{" "}
              <span className="text-primary">
                ₱{getTotal().toLocaleString()}
              </span>
            </h5>
            <button className="btn btn-primary" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Cart;
