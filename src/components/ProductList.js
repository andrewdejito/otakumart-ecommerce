// src/components/ProductList.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import products from '../data/products.json';
import { useCart } from '../context/CartContext';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ProductCard({ product, onAdd }) {
  return (
    <Card className="card-product h-100">
      <div className="product-img">
        <img src={product.image} alt={product.name} />
      </div>
      <Card.Body className="p-3 d-flex flex-column">
        <div className="mb-2">
          <div className="product-name">{product.name}</div>
          <div className="text-muted small">{product.category}</div>
        </div>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div className="product-price">₱{product.price.toLocaleString()}</div>
          <div>
            <Button as={Link} to={`/product/${product.id}`} size="sm" variant="outline-primary" className="me-2">View</Button>
            <Button size="sm" onClick={() => onAdd(product)}>Add</Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

function ProductList() {
  const { addToCart } = useCart();
  const query = useQuery();
  const category = query.get('category');
  const filtered = category ? products.filter((p) => p.category === category) : products;

  const handleAdd = (product) => {
    addToCart({ ...product, quantity: 1 });
    alert(`${product.name} added to cart`);
  };

  return (
    <main className="app-container">
      <Container>
        <h2 className="fw-bold mb-4 text-center">{category || 'All Products'}</h2>

        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
          {filtered.map((product) => (
            <Col key={product.id}>
              <ProductCard product={product} onAdd={handleAdd} />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
}

export default ProductList;
