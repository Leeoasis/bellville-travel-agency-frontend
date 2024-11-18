import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactions, fetchTransfers } from '../redux/transactionsSlice';

const RecentTransactions = () => {
  const dispatch = useDispatch();
  const { transactions, transfers, loading, error } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchTransfers());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if ((!Array.isArray(transactions) || transactions.length === 0) && (!Array.isArray(transfers) || transfers.length === 0)) {
    return <div>No transactions or transfers found.</div>;
  }

  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h2 className="text-xl font-bold">Recent Transactions and Transfers</h2>
      <table className="w-full mt-2">
        <thead>
          <tr>
            <th className="text-left">Date</th>
            <th className="text-left">Account</th>
            <th className="text-left">Type</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.slice(0, 10).map(transaction => (
            <tr key={transaction.id}>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>{transaction.account_name}</td>
              <td>{transaction.transaction_type}</td>
              <td className="text-right">${transaction.amount}</td>
            </tr>
          ))}
          {transfers.slice(0, 10).map(transfer => (
            <tr key={transfer.id}>
              <td>{new Date(transfer.date).toLocaleDateString()}</td>
              <td>From: {transfer.from_account_name} To: {transfer.to_account_name}</td>
              <td>Transfer</td>
              <td className="text-right">${transfer.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactions;