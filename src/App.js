import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthToken, logoutUser } from '../src/redux/authSlice';
import WelcomePage from './components/WelcomePage';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setAuthToken(); // Set auth token if available in localStorage
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/home" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
