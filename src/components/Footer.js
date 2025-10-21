import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer mt-auto py-4 border-top">
      <div className="container d-flex justify-content-between align-items-center flex-wrap">

        <div className="mb-2">
          <span className="fw-bold">OTAKUMART</span> |{" "}
          <Link to="/privacy-policy" className="text-decoration-none">Privacy Policy</Link> |{" "}
          <Link to="/terms-of-service" className="text-decoration-none">Terms of Service</Link> |{" "}
          <Link to="/contact-us" className="text-decoration-none">Contact Us</Link>
          <div className="small">© 2025 OTAKUMART. All rights reserved.</div>
        </div>

        <div className="d-flex flex-column align-items-center">
          <span className="fw-semibold mb-1">Follow Us</span>
          <div className="d-flex">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="me-2">📘</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="me-2">📸</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="me-2">🐦</a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">📌</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
