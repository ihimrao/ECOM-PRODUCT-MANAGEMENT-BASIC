import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl text-red-600">404 - Not Found</h1>
      <p className="text-lg mt-4">The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-500 mt-4 block">Go to Home</Link>
    </div>
  );
};

export default NotFound;
