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
    <div className="bg-gray-100 p-4 rounded shadow">
      <h2 className="text-xl font-bold">Total Balance</h2>
      <p className="text-2xl font-semibold">R {totalBalance.toFixed(2)}</p>
    </div>
  );
};

export default BalanceSummary;
