import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "",
    zipcode: "",
    email: "",
    cardNumber: "",
    payment: "",
  });

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.address || !form.payment) {
      alert("⚠️ Please fill all required fields.");
      return;
    }

    alert(
      `✅ Order placed successfully!\nThank you, ${form.firstName}!\nTotal: ₱${total.toLocaleString()}`
    );

    clearCart();
    navigate("/");
  };

  return (
    <main className="container py-5">
      <h2 className="fw-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          {/* Shipping Info */}
          <div className="col-md-5">
            <h5>Delivery Address</h5>
            <p className="text-muted small">Shipping Information</p>

            <div className="row">
              <div className="col">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="form-control mb-2"
                  value={form.firstName}
                  onChange={handleInput}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="form-control mb-2"
                  value={form.lastName}
                  onChange={handleInput}
                />
              </div>
            </div>

            <input
              type="text"
              name="address"
              placeholder="Address"
              className="form-control mb-2"
              value={form.address}
              onChange={handleInput}
            />
            <input
              type="text"
              name="apartment"
              placeholder="Apartment, suite, etc. (optional)"
              className="form-control mb-2"
              value={form.apartment}
              onChange={handleInput}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              className="form-control mb-2"
              value={form.city}
              onChange={handleInput}
            />
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="form-control mb-2"
                  value={form.country}
                  onChange={handleInput}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  name="zipcode"
                  placeholder="Zipcode"
                  className="form-control mb-2"
                  value={form.zipcode}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="form-check mt-2">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label small">Save information</label>
            </div>
          </div>

          {/* Payment Info */}
          <div className="col-md-4">
            <h5>Payment Method</h5>
            <div className="form-check">
              <input
                type="radio"
                name="payment"
                value="COD"
                className="form-check-input"
                onChange={handleInput}
              />
              <label className="form-check-label">Cash on Delivery</label>
            </div>
            <div className="form-check mb-3">
              <input
                type="radio"
                name="payment"
                value="Credit Card"
                className="form-check-input"
                onChange={handleInput}
              />
              <label className="form-check-label">Credit Card</label>
            </div>

            <h6>Payment Details</h6>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control mb-2"
              value={form.email}
              onChange={handleInput}
            />
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              className="form-control"
              value={form.cardNumber}
              onChange={handleInput}
            />
          </div>

          {/* Order Summary */}
          <div className="col-md-3">
            <h5>Products Ordered</h5>
            <div className="border rounded p-2 mb-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between align-items-center mb-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    width="60"
                    height="60"
                    style={{ objectFit: "cover", borderRadius: "6px" }}
                  />
                  <div className="ms-2 flex-grow-1">
                    <p className="mb-0 fw-semibold small">{item.name}</p>
                    <p className="text-muted small mb-0">
                      ₱{item.price.toLocaleString()}
                    </p>
                    <p className="small mb-0">
                      Quantity: {item.quantity || 1}
                    </p>
                  </div>
                </div>
              ))}
              <input
                type="text"
                placeholder="Enter discount code"
                className="form-control form-control-sm"
              />
            </div>

            <h6 className="text-end">
              Total Payment:{" "}
              <span className="text-danger fw-bold">
                ₱{total.toLocaleString()}
              </span>
            </h6>

            <div className="d-flex flex-column mt-3">
              <button
                type="button"
                className="btn btn-outline-secondary mb-2"
                onClick={() => navigate("/cart")}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Checkout;
