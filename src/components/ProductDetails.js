// src/components/ProductDetails.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import products from '../data/products.json';
import { useCart } from '../context/CartContext';

function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  if (!product) return <Container className="app-container"><p>Product not found.</p></Container>;

  const handleAdd = () => {
    addToCart({ ...product, quantity });
    alert(`${quantity} × ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, quantity });
    navigate('/checkout');
  };

  return (
    <main className="app-container">
      <Container>
        <h2 className="fw-bold mb-4">Product Details</h2>
        <Row className="g-4">
          <Col md={5} className="text-center">
            <img src={product.image} alt={product.name} className="img-fluid rounded" style={{ maxHeight: 400, objectFit: 'contain' }} />
          </Col>

          <Col md={7}>
            <h3 className="fw-bold">{product.name}</h3>
            <p className="fs-4 text-danger">₱{product.price.toLocaleString()}</p>
            <p className="text-muted">{product.description}</p>

            <div className="d-flex align-items-center gap-3 mb-3">
              <label className="fw-semibold mb-0">Quantity:</label>
              <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="form-control" style={{ width: 100 }} />
            </div>

            <div>
              <Button variant="primary" className="me-2" onClick={handleAdd}>Add to Cart</Button>
              <Button variant="success" onClick={handleBuyNow}>Buy Now</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default ProductDetails;
