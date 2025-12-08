import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

function ProductList() {
  const { addToCart } = useCart();
  const query = new URLSearchParams(useLocation().search);
  const category = query.get('category');
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Container className="app-container"><p>Loading...</p></Container>;
  if (error) return <Container className="app-container"><p>Error: {error}</p></Container>;

  const filtered = category 
    ? products.filter((p) => p.category?.name === category) 
    : products;

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
              <Card className="card-product h-100">
                <div className="product-img">
                  <img src={product.image} alt={product.name} />
                </div>
                <Card.Body className="p-3 d-flex flex-column">
                  <div className="mb-2">
                    <div className="product-name">{product.name}</div>
                    <div className="text-muted small">{product.category?.name}</div>
                  </div>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <div className="product-price">₱{product.price.toLocaleString()}</div>
                    <div>
                      <Button as={Link} to={`/product/${product.id}`} size="sm" variant="outline-primary" className="me-2">View</Button>
                      <Button size="sm" onClick={() => handleAdd(product)}>Add</Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
}

export default ProductList;