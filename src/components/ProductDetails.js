import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import products from "../data/products.json";
import "../App.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    alert(`${quantity} × ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    alert(`Buying ${quantity} × ${product.name}`);
    navigate("/checkout");
  };

  return (
    <main className="container py-5">
    <h2 className="fw-bold mb-4">Product details</h2>
      <div className="row g-4 product-details">
        <div className="col-12 col-md-5 text-center">
          <div className="product-details-image">
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        <div className="col-12 col-md-7">
        <div className="product-info">
          <h2 className="fw-bold">{product.name}</h2>
          <p className="product-price">₱{product.price.toLocaleString()}</p>
          <p className="mb-3">{product.description}</p>

          <div className="d-flex align-items-center gap-3 mb-3">
             <h2 className="fw-bold">Quantity</h2>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value) || 1)}
              className="form-control"
              style={{ width: "90px" }}
            />

            <button className="addToCart" onClick={handleAddToCart}>Add to Cart</button>
            <button className="buyNow" onClick={handleBuyNow}>Buy Now</button>
            
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;