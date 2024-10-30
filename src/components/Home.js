import React from 'react';

const HomePage = ({ user, onLogout }) => {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl">Welcome, {user.name}!</h1>
      <button onClick={onLogout} className="bg-red-500 text-white p-2">Logout</button>
    </div>
  );
};

export default HomePage;
