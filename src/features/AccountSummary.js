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
    <div className="bg-gray-100 p-4 rounded shadow">
      <h2 className="text-xl font-bold">Accounts Overview</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account.id} className="py-2 border-b border-gray-200">
            <p className="font-medium">{account.account_name}</p>
            <p>Balance: R{account.balance}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountSummary;