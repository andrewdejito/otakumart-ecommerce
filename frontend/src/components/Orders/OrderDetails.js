import React from "react";
import { useParams, Link } from "react-router-dom";

export function OrderDetails() {
  const { id } = useParams();
  return (
    <div className="container mt-4">
      <h3>Order Details - #{id}</h3>
      <p>Customer: Sample Customer</p>
      <p>Total: ₱1234</p>
      <p>Items:</p>
      <ul>
        <li>Figure A x1 - ₱1200</li>
        <li>Plushie B x1 - ₱1200</li>
      </ul>
      <Link to="/admin/orders" className="btn btn-secondary mt-2">
        Back to Orders
      </Link>
    </div>
  );
}
