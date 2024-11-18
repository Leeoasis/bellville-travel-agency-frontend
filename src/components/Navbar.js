import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-white">Dashboard</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="#home" className="text-white inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium hover:border-white">
                Home
              </a>
              <a href="#accounts" className="text-indigo-200 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-white">
                Accounts
              </a>
              <a href="#transactions" className="text-indigo-200 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-white">
                Transactions
              </a>
              <a href="#transfers" className="text-indigo-200 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-white">
                Transfers
              </a>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;