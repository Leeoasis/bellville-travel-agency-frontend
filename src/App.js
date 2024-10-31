import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import Signup from './components/Auth/Signup'; 
import Login from './components/Auth/Login';
import HomePage from './components/Home';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleSignup = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/home" element={user ? <HomePage user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
