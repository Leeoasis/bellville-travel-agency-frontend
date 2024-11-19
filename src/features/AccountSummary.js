import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAccounts, deleteAccount, updateAccount } from '../redux/accountsSlice';

const AccountSummary = () => {
  const [loading, setLoading] = useState(true);
  const [editingAccount, setEditingAccount] = useState(null);
  const [formData, setFormData] = useState({});
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

  const handleEditClick = (account) => {
    setEditingAccount(account.id);
    setFormData({
      account_name: account.account_name,
      balance: account.balance,
      phone_number: account.phone_number,
      book_number: account.book_number,
    });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateAccount({ id: editingAccount, data: formData }));
      setEditingAccount(null);
    } catch (error) {
      console.error('Failed to update account:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        await dispatch(deleteAccount(id));
      } catch (error) {
        console.error('Failed to delete account:', error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Accounts Overview</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account.id} className="py-2 border-b border-gray-200 flex justify-between items-center">
            {editingAccount === account.id ? (
              <form onSubmit={handleFormSubmit} className="flex flex-col space-y-2 w-full">
                <input
                  type="text"
                  name="account_name"
                  value={formData.account_name}
                  onChange={handleFormChange}
                  placeholder="Account Name"
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  name="balance"
                  value={formData.balance}
                  onChange={handleFormChange}
                  placeholder="Balance"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleFormChange}
                  placeholder="Phone Number"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  name="book_number"
                  value={formData.book_number}
                  onChange={handleFormChange}
                  placeholder="Book Number"
                  className="border p-2 rounded"
                />
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingAccount(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div>
                  <p className="font-medium text-gray-700">{account.account_name}</p>
                  <p className="text-gray-600">Balance: R{account.balance}</p>
                  {account.phone_number && <p className="text-gray-600">Phone Number: {account.phone_number}</p>}
                  {account.book_number && <p className="text-gray-600">Book Number: {account.book_number}</p>}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(account)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(account.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountSummary;
