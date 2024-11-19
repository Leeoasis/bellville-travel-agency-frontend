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
    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 mx-4 lg:mx-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Transactions and Transfers</h2>
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
          {transactions.slice(0, 500).map(transaction => (
            <tr key={transaction.id} className="border-b border-gray-200">
              <td className="py-2">{new Date(transaction.date).toLocaleDateString()}</td>
              <td className="py-2">{transaction.account_name}</td>
              <td className="py-2">{transaction.transaction_type}</td>
              <td className="py-2 text-right">R{transaction.amount}</td>
            </tr>
          ))}
          {transfers.slice(0, 10).map(transfer => (
            <tr key={transfer.id} className="border-b border-gray-200">
              <td className="py-2">{new Date(transfer.date).toLocaleDateString()}</td>
              <td className="py-2">From: {transfer.from_account_name} To: {transfer.to_account_name}</td>
              <td className="py-2">Transfer</td>
              <td className="py-2 text-right">R{transfer.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactions;