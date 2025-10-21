import React from "react";
import { Link } from "react-router-dom";
import products from "../data/products.json";
import "../App.css";

function ProductList() {
  return (
    <main className="container py-5">
      <h2 className="fw-bold mb-4 text-center">All Products</h2>

      <div className="product-list-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className="product-link">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="product-info text-start">
                <h5 className="product-name">{product.name}</h5>
                <p className="product-price">₱{product.price.toLocaleString()}</p>
              </div>
            </Link>

            <div className="card-actions">
              <button className="addToCart">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ProductList;