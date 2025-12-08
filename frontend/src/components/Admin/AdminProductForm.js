import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

function AdminProductForm() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ 
    id: null, 
    name: "", 
    description: "",
    price: 0,
    category_id: "",
    image: "",
    stock: 0
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError("Failed to load categories");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const url = form.id 
        ? `${API_URL}/admin/products/${form.id}` 
        : `${API_URL}/admin/products`;
      
      const method = form.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Operation failed');
      }

      setSuccess(form.id ? 'Product updated!' : 'Product added!');
      setForm({ id: null, name: "", description: "", price: 0, category_id: "", image: "", stock: 0 });
      fetchProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const response = await fetch(`${API_URL}/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Delete failed');

      setSuccess("Product deleted!");
      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3>{form.id ? "Edit Product" : "Add Product"}</h3>
      
      {error && <Alert variant="danger" dismissible onClose={() => setError("")}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess("")}>{success}</Alert>}
      
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
        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          className="form-control mb-2"
          onChange={handleChange}
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
        <select
          name="category_id"
          value={form.category_id}
          className="form-control mb-2"
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <input
          type="text"
          name="image"
          value={form.image}
          placeholder="Image URL"
          className="form-control mb-2"
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          value={form.stock}
          placeholder="Stock"
          className="form-control mb-2"
          onChange={handleChange}
        />
        <button className="btn btn-success" disabled={loading}>
          {loading ? "Saving..." : (form.id ? "Update" : "Add")}
        </button>
        {form.id && (
          <button 
            type="button" 
            className="btn btn-secondary ms-2" 
            onClick={() => setForm({ id: null, name: "", description: "", price: 0, category_id: "", image: "", stock: 0 })}
          >
            Cancel
          </button>
        )}
      </form>

      <h4>Products List</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (₱)</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.category?.name}</td>
              <td>{p.stock || 0}</td>
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