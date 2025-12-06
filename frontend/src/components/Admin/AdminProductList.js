import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AdminProductList() {
  const [products, setProducts] = useState([]);

  // Temporary sample products (frontend only)
  useEffect(() => {
    setProducts([
      { id: 1, name: "Plush Toy", price: 499, stock: 10 },
      { id: 2, name: "Anime Figure", price: 1999, stock: 5 },
      { id: 3, name: "Poster", price: 150, stock: 20 },
    ]);
  }, []);

  const deleteProduct = (id) => {
    if (window.confirm("Delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Admin Product List</h2>

        <Link to="/admin/products/add" className="btn btn-primary">
          + Add Product
        </Link>
      </div>

      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price (₱)</th>
            <th>Stock</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.name}</td>
              <td>₱{prod.price.toLocaleString()}</td>
              <td>{prod.stock}</td>

              <td className="text-center">
                <Link
                  to={`/admin/products/edit/${prod.id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProduct(prod.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductList;
