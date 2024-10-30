import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800">Welcome to Bellville Travel Agency</h1>
        <p className="text-gray-600 text-center mt-4 mb-6">
          Sign up to create a new account or log in if you already have one.
        </p>
        <div className="flex flex-col mt-4">
          <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white p-3 mb-3 text-center rounded-lg transition duration-200">
            Sign Up
          </Link>
          <Link to="/login" className="bg-purple-500 hover:bg-purple-600 text-white p-3 text-center rounded-lg transition duration-200">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
