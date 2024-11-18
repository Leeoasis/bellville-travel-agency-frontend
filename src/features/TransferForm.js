import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeTransfer } from '../redux/transactionsSlice';
import { fetchAccounts } from '../redux/accountsSlice';

const TransferForm = () => {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.accounts);
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Check if accounts is an array and has elements
  if (!Array.isArray(accounts) || accounts.length === 0) {
    return <div>No accounts available for transfer.</div>; // Handle the case when accounts is not an array or is empty
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const transferData = { from_account_name: fromAccount, to_account_name: toAccount, amount, date };
      await dispatch(makeTransfer(transferData)).unwrap();
      await dispatch(fetchAccounts()); // Fetch updated accounts
      setFromAccount('');
      setToAccount('');
      setAmount(0);
      setDate(new Date().toISOString().split('T')[0]);
      setSuccessMessage("Transfer completed successfully");
    } catch (error) {
      setErrorMessage("Error processing transfer: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}
      <div>
        <label>From Account:</label>
        <select
          value={fromAccount}
          onChange={(e) => setFromAccount(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Account</option>
          {accounts.map(account => (
            <option key={account.id} value={account.account_name}>{account.account_name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>To Account:</label>
        <select
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Account</option>
          {accounts.map(account => (
            <option key={account.id} value={account.account_name}>{account.account_name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border p-2 rounded"
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <button type="submit" className="bg-purple-500 text-white p-2 rounded">Transfer</button>
    </form>
  );
};

export default TransferForm;