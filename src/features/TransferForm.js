import React, { useState } from 'react';
import { makeTransfer } from '../redux/transactionsSlice';

const TransferForm = ({ accounts, onTransferComplete }) => {
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState(0);

  // Check if accounts is an array and has elements
  if (!Array.isArray(accounts) || accounts.length === 0) {
    return <div>No accounts available for transfer.</div>; // Handle the case when accounts is not an array or is empty
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transferData = { from_account_id: fromAccount, to_account_id: toAccount, amount };
      await makeTransfer(transferData);
      onTransferComplete();
      setFromAccount('');
      setToAccount('');
      setAmount(0);
    } catch (error) {
      console.error("Error processing transfer:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>From Account:</label>
        <select
          value={fromAccount}
          onChange={(e) => setFromAccount(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Account</option>
          {accounts.map(account => (
            <option key={account.id} value={account.id}>{account.account_name}</option>
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
            <option key={account.id} value={account.id}>{account.account_name}</option>
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
      <button type="submit" className="bg-purple-500 text-white p-2 rounded">Transfer</button>
    </form>
  );
};

export default TransferForm;
