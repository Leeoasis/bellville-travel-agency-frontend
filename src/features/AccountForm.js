import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAccount } from '../redux/accountsSlice';

const AccountForm = ({ userId }) => {
  const [accountName, setAccountName] = useState('');
  const [balance, setBalance] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bookNumber, setBookNumber] = useState('');
  const [paymentType, setPaymentType] = useState('cash');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accountData = {
        user_id: userId,
        account_name: accountName,
        balance: parseFloat(balance),
        phone_number: phoneNumber,
        book_number: bookNumber,
        payment_type: paymentType,
      };

      await dispatch(createAccount(accountData));

      setSuccessMessage('Account created successfully!');
      setAccountName('');
      setBalance('');
      setPhoneNumber('');
      setBookNumber('');
      setPaymentType('cash');
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || 'Failed to create account. Please try again.'
      );
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
      {errorMessage && <p className="text-red-500 text-center mt-2">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-center mt-2">{successMessage}</p>}
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
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="border p-2 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="book_number"
          placeholder="Book Number"
          value={bookNumber}
          onChange={(e) => setBookNumber(e.target.value)}
          required
          className="border p-2 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div>
          <label>Payment Type:</label>
          <select
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            className="border p-2 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600 transition duration-200"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default AccountForm;
