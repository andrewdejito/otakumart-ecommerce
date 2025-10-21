import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  const products = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <main className="container py-5">
      <section className="text-center bg-light py-3 mb-4 rounded">
        <p className="fs-5 fw-semibold">🎉 Limited Time Discount: Plushies & Figures!</p>
      </section>

      <h2 className="fw-bold mb-4 text-center">ALL PRODUCTS</h2>

      <div
        className="d-grid gap-4"
        style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
      >
        {products.map((item) => (
          <Link
            to={`/product/${item}`}
            key={item}
            className="text-decoration-none text-dark"
          >
            <div
              className="shadow-sm"
              style={{
                height: "300px",
                backgroundColor: "white",
                border: "none",
                borderRadius: "12px",
                overflow: "hidden"
              }}
            >
              <div
                className="bg-secondary"
                style={{
                  height: "180px"
                }}
              ></div>

              <div className="p-3 text-start">
                <h5 className="mb-1">Product Name</h5>
                <p className="text-muted mb-0">₱0.00</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Homepage;
