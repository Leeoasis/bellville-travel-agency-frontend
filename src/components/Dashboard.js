import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAccounts } from '../redux/accountsSlice';
import { fetchTransactions } from '../redux/transactionsSlice';
import BalanceSummary from '../features/BalanceSummary';
import AccountSummary from '../features/AccountSummary';
import RecentTransactions from '../features/RecentTransactions';
import AccountForm from '../features/AccountForm';
import TransferForm from '../features/TransferForm';
import TransactionForm from '../features/TransactionForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
      <Navbar />
      <div className="flex-grow p-6">
        <div id="home" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <BalanceSummary />
            <AccountSummary />
            <RecentTransactions />
          </div>
          <div className="space-y-8">
            <div id="accounts" className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 duration-300">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Create Account</h2>
              <AccountForm />
            </div>
            <div id="transactions" className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 duration-300">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Make a Transaction</h2>
              <TransactionForm />
            </div>
            <div id="transfers" className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 duration-300">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Transfer Funds</h2>
              <TransferForm />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;