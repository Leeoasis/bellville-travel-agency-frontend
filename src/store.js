// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/redux/authSlice';
import accountReducer from '../src/redux/accountsSlice';
import transactionReducer from '../src/redux/transactionsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountReducer,
    transactions: transactionReducer,
  },
});

export default store;
