import React, { useState, useEffect } from "react";
import products from "../../data/products";

function AdminProductForm() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", price: 0 });

  useEffect(() => {
    // Load products from JSON
    setProducts(products);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.id) {
      // Edit existing product
      setProducts(
        products.map((p) =>
          p.id === form.id ? { ...p, name: form.name, price: Number(form.price) } : p
        )
      );
    } else {
      // Add new product
      setProducts([...products, { ...form, id: Date.now() }]);
    }

    setForm({ id: null, name: "", price: 0 });
  };

  const handleEdit = (product) => {
    setForm(product);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="container mt-4">
      <h3>{form.id ? "Edit Product" : "Add Product"}</h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Product Name"
          className="form-control mb-2"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          placeholder="Price"
          className="form-control mb-2"
          onChange={handleChange}
          required
        />
        <button className="btn btn-success">{form.id ? "Update" : "Add"}</button>
      </form>

      <h4>Products List</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (₱)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(p)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>
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

export default AdminProductForm;
