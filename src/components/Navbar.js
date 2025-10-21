import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container d-flex flex-column">

        <div className="d-flex w-100 align-items-center justify-content-between">
          <Link className="navbar-brand fw-bold" to="/">
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

          <div className="d-flex">
            <Link className="nav-link" to="/signup">Sign Up</Link>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/cart">
              🛒 Cart <span className="badge bg-danger">0</span>
            </Link>
          </div>
        </div>

        <div className="w-100 mt-2">
          <ul className="navbar-nav flex-row p-0 m-0" style={{ gap: "10px" }}>
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
