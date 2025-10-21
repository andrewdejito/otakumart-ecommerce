import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from '../context/CartContext'; 

function Navbar() {
  const { cartItems } = useCart(); 

  const totalCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm">
      <div className="container d-flex flex-column">

        <div className="d-flex w-100 align-items-center justify-content-between">
          <Link className="navbar-brand fw-bold text-primary" to="/">
            OTAKUMART
          </Link>

          <form className="d-flex flex-grow-1 mx-4">
            <input
              className="form-control"
              type="search"
              placeholder="Search products..."
              aria-label="Search"
            />
          </form>

          <div className="d-flex align-items-center gap-3">
            <Link className="nav-link" to="/signup">Sign Up</Link>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link position-relative" to="/cart">
              🛒 Cart
              {totalCount > 0 && (
                <span
                  className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.8rem' }}
                >
                  {totalCount}
                </span>
              )}
              {totalCount === 0 && (
                <span className="badge bg-secondary ms-1">0</span>
              )}
            </Link>
          </div>
        </div>

        <div className="w-100 mt-2">
          <ul className="navbar-nav flex-row p-0 m-0" style={{ gap: '10px' }}>
            <li className="nav-item text-nowrap"><Link className="nav-link" to="/new-arrivals">New Arrivals</Link></li>
            <li className="nav-item text-nowrap"><Link className="nav-link" to="/sales">Sales</Link></li>
            <li className="nav-item text-nowrap"><Link className="nav-link" to="/figures">Figures</Link></li>
            <li className="nav-item text-nowrap"><Link className="nav-link" to="/accessories">Accessories</Link></li>
            <li className="nav-item text-nowrap"><Link className="nav-link" to="/manga-books">Manga & Books</Link></li>
            <li className="nav-item text-nowrap"><Link className="nav-link" to="/apparel">Apparels</Link></li>
            <li className="nav-item text-nowrap"><Link className="nav-link" to="/plushies">Plushies</Link></li>
            <li className="nav-item text-nowrap"><Link className="nav-link" to="/cosplay">Cosplay</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
