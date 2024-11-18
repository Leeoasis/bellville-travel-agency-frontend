import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-sm">&copy; 2023 Your Company. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-indigo-200 hover:text-white text-sm">Privacy Policy</a>
            <a href="#" className="text-indigo-200 hover:text-white text-sm">Terms of Service</a>
            <a href="#" className="text-indigo-200 hover:text-white text-sm">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;