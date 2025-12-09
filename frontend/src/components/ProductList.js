import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

function ProductList() {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();
  const query = new URLSearchParams(useLocation().search);
  const category = query.get('category');
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
      const response = await fetch(`${apiUrl}/products`);
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

  const [addingId, setAddingId] = useState(null); // track product being added

  const handleAdd = async (product) => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    setAddingId(product.id);
    try {
      await addToCart(product, 1);
    } catch (err) {
      alert("Failed to add to cart: " + err.message);
    } finally {
      setAddingId(null);
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-4" />;
  if (error) return <Alert variant="danger">Error fetching products: {error.message}</Alert>;

  // Filter products by category and search term
  let filtered = products;
  if (category) {
    filtered = filtered.filter(
      (p) => (p.category?.name || p.category)?.toLowerCase() === category.toLowerCase()
    );
  }

  if (searchTerm) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm) ||
        (p.category?.name || p.category)?.toLowerCase().includes(searchTerm)
    );
  }

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