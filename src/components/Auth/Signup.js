import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    avatar: null,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('user[email]', formData.email);
    form.append('user[password]', formData.password);
    form.append('user[name]', formData.name);
    if (formData.avatar) {
      form.append('user[avatar]', formData.avatar);
    }

    const response = await fetch('http://localhost:3001/signup', {
      method: 'POST',
      body: form,
    });

    if (response.ok) {
      const data = await response.json();
      onSignup(data);
      setErrorMessage(''); // Clear any previous error messages
      navigate('/login'); // Redirect to the login page after successful signup
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.status.message || 'Signup failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
        {errorMessage && <p className="text-red-500 text-center mt-2">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="border p-2 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="border p-2 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="border p-2 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600 transition duration-200">
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
