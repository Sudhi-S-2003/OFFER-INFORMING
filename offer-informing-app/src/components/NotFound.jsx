import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Oops! The page you are looking for doesn't exist.</p>
      <p className="mt-2 text-gray-500">It might have been moved or deleted.</p>
      <Link 
        to="/" 
        className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
