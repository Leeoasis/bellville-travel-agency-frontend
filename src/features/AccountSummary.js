import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAccounts } from '../redux/accountsSlice';

const AccountSummary = () => {
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Accounts Overview</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account.id} className="py-2 border-b border-gray-200">
            <p className="font-medium text-gray-700">{account.account_name}</p>
            <p className="text-gray-600">Balance: R{account.balance}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountSummary;