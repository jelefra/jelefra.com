import { Link } from 'react-router-dom';
import React from 'react';

const PageNotFound = () => (
  <div className="container">
    <main>
      <p>Page not found</p>
      <Link to="/">Home</Link>
    </main>
  </div>
);

export default PageNotFound;
