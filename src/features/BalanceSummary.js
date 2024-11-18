import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAccounts } from '../redux/accountsSlice';

const BalanceSummary = () => {
  const [loading, setLoading] = useState(true);
  const { accounts, error } = useSelector((state) => state.accounts);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        await dispatch(fetchAccounts());
      } catch (error) {
        console.error('Error loading accounts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAccounts();
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  if (!Array.isArray(accounts)) {
    return <div>No accounts available</div>;
  }

  const totalBalance = accounts.reduce((sum, account) => {
    return sum + Number(account.balance || 0);
  }, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        <span className="mr-2">💰</span> Total Balance
      </h2>
      <p className="text-3xl font-semibold text-green-600">R {totalBalance.toFixed(2)}</p>
    </div>
  );
};

export default BalanceSummary;