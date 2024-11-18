import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAccounts } from '../redux/accountsSlice';
import { fetchTransactions } from '../redux/transactionsSlice';
import BalanceSummary from '../features/BalanceSummary';
import AccountSummary from '../features/AccountSummary';
import RecentTransactions from '../features/RecentTransactions';
import AccountForm from '../features/AccountForm';
import TransferForm from '../features/TransferForm';
import TransactionForm from '../features/TransactionForm';

const Dashboard = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);

  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchTransactions());
  }, [dispatch]);

  useEffect(() => {
    console.log('Fetched transactions:', transactions);
  }, [transactions]);

  return (
    <div className="p-6 bg-gradient-to-b from-white to-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Dashboard</h1>
      <BalanceSummary />
      <AccountSummary />
      <RecentTransactions />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Account</h2>
          <AccountForm />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Make a Transaction</h2>
          <TransactionForm />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transfer Funds</h2>
          <TransferForm />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;