import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-sm">&copy; Bellville Travel Agency. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#home" className="text-indigo-200 hover:text-white text-sm">Home</a>
            <a href="#accounts" className="text-indigo-200 hover:text-white text-sm">Accounts</a>
            <a href="#transactions" className="text-indigo-200 hover:text-white text-sm">Transactions</a>
            <a href="#transfers" className="text-indigo-200 hover:text-white text-sm">Transfers</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;