// src/components/ProductList.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useProducts } from '../data/products'; // use hook
import { useCart } from '../context/CartContext';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ProductCard({ product, onAdd }) {
  return (
    <Card className="card-product h-100">
      <div className="product-img">
        <img src={`http://192.168.99.100:8082/${product.image}`} alt={product.name} />
      </div>
      <Card.Body className="p-3 d-flex flex-column">
        <div className="mb-2">
          <div className="product-name">{product.name}</div>
          <div className="text-muted small">{product.category?.name || product.category}</div>
        </div>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div className="product-price">₱{Number(product.price).toLocaleString()}</div>
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
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();
  const query = useQuery();
  const category = query.get('category');

  const handleAdd = (product) => {
    addToCart({ ...product, quantity: 1 });
    alert(`${product.name} added to cart`);
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Error fetching products: {error.message}</Alert>;

  const filtered = category
    ? products.filter((p) => (p.category?.name || p.category) === category)
    : products;

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
