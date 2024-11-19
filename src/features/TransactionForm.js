import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeDeposit, makeWithdrawal } from '../redux/transactionsSlice';
import { fetchAccounts } from '../redux/accountsSlice';
import { fetchTransactions } from '../redux/transactionsSlice';

const TransactionForm = () => {
  const { accounts } = useSelector((state) => state.accounts);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [transactionType, setTransactionType] = useState('deposit');
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]?.account_name || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  if (!Array.isArray(accounts) || accounts.length === 0) {
    return <div>No accounts available for transactions.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    try {
      const transactionData = { amount, account_name: selectedAccount, date, transaction_type: transactionType };
      let response;
      if (transactionType === 'deposit') {
        response = await dispatch(makeDeposit(transactionData)).unwrap();
      } else if (transactionType === 'withdraw') {
        response = await dispatch(makeWithdrawal(transactionData)).unwrap();
      }
      // Check if the response contains an error
      if (response.errors) {
        throw new Error(response.errors.join(', '));
      }
      // Refresh accounts and transactions
      await dispatch(fetchAccounts());
      await dispatch(fetchTransactions());
      setSuccessMessage("Transaction created successfully");
      // Clear form fields
      setAmount(0);
      setSelectedAccount(accounts[0]?.account_name || '');
      setDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      setErrorMessage("Error processing transaction: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 p-2 rounded">{successMessage}</div>}
      {errorMessage && <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded">{errorMessage}</div>}
      <div>
        <label>Transaction Type:</label>
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
        </select>
      </div>
      <div>
        <label>Account:</label>
        <select
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
          className="border p-2 rounded"
        >
          {accounts.map((account) => (
            <option key={account.account_name} value={account.account_name}>
              {account.account_name}
            </option>
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
      <button type="submit" className="bg-green-500 text-white p-2 rounded">Submit</button>
    </form>
  );
};

export default TransactionForm;