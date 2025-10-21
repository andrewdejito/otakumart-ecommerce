// src/components/ProductDetails.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products.json";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    alert(`${quantity} × ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, quantity });
    navigate("/checkout");
  };

  if (!product) return <p>Product not found.</p>;

  return (
    <main className="container py-5">
      <h2 className="fw-bold mb-4">Product Details</h2>
      <div className="row g-4">
        <div className="col-md-5 text-center">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
            style={{ maxHeight: "350px", objectFit: "cover" }}
          />
        </div>

        <div className="col-md-7">
          <h3 className="fw-bold">{product.name}</h3>
          <p className="fs-5 text-danger">
            ₱{product.price.toLocaleString()}
          </p>
          <p>{product.description}</p>

          <div className="d-flex align-items-center gap-3 mb-3">
            <label className="fw-semibold">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="form-control"
              style={{ width: "90px" }}
            />
          </div>

          <button className="btn btn-primary me-3" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="btn btn-success" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
