import React from 'react';
import useAuth from '../../Hooks/auth';

const PageNotFound = () => {
    useAuth();
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-gray-700 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</p>
        <p className="text-lg text-gray-500 mb-8">
          Sorry, the page you’re looking for doesn’t exist.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
