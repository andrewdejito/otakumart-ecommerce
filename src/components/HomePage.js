import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Otakumart</h1>
      <p>Your one-stop shop for anime merch!</p>
      <Link to="/products"><button>Shop Now</button></Link>
    </div>
  );
};

export default HomePage;
