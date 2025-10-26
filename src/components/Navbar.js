import React from "react";
import { Navbar, Nav, Container, Form, FormControl, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const categories = [
  "Accessories",
  "Apparel",
  "Figures & Collectibles",
  "Home & Lifestyle",
  "Limited Edition / Exclusives",
  "Media & Games",
  "Posters & Wall Art",
  "Stationery & School Supplies"
];


const NavigationBar = () => {
  const { totalItems } = useCart();

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm sticky-top">
      <Container fluid className="flex-column">
        {/* Top Row */}
        <div className="d-flex w-100 justify-content-between align-items-center py-2">
          <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-4">
            OTAKUMART
          </Navbar.Brand>

          <Form className="d-flex mx-auto" style={{ maxWidth: "500px", flex: 1 }}>
            <FormControl
              type="search"
              placeholder="Search products..."
              className="me-2 rounded-pill"
              aria-label="Search"
            />
            <Button variant="primary" className="rounded-pill px-3">
              Search
            </Button>
          </Form>

          <div className="d-flex align-items-center gap-3 ms-auto">
            <Nav.Link as={Link} to="/signup" className="text-dark">
              Sign Up
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="text-dark">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="text-dark position-relative">
              🛒 Cart
              <Badge
                bg="secondary"
                pill
                className="position-absolute top-0 start-100 translate-middle"
              >
                {totalItems}
              </Badge>
            </Nav.Link>
          </div>
        </div>

        {/* Categories Row */}
        <Nav className="justify-content-center border-top pt-2 w-100 flex-wrap">
          {categories.map((cat) => (
            <Nav.Link
              as={Link}
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              className="text-dark mx-3 fw-semibold"
            >
              {cat}
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
