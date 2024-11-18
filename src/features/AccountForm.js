import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAccount } from '../redux/accountsSlice';

const AccountForm = ({ userId }) => {
  const [accountName, setAccountName] = useState('');
  const [balance, setBalance] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the createAccount thunk action
      const accountData = {
        user_id: userId, // pass the user ID
        account_name: accountName,
        balance: parseFloat(balance), // ensure balance is a number
      };

      await dispatch(createAccount(accountData));

      // Handle the response
      setSuccessMessage('Account created successfully!');
      setAccountName('');
      setBalance('');
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || 'Failed to create account. Please try again.'
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create New Account
        </h2>
        {errorMessage && (
          <p className="text-red-500 text-center mt-2">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-center mt-2">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="text"
            name="account_name"
            placeholder="Account Name"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            required
            className="border p-2 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            name="balance"
            placeholder="Initial Balance"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            required
            className="border p-2 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600 transition duration-200"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
