import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';
import { makeDeposit, makeWithdrawal } from './transactionsSlice';

const BASE_URL = 'https://belville-travel-agency.onrender.com/api/accounts';

const initialState = {
  accounts: [],
  account: {},
  status: 'idle',
  loading: false,
  error: null,
};

// Fetch all accounts
export const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    return isRejectedWithValue(error.response.data);
  }
});

// Fetch a single account
export const fetchAccount = createAsyncThunk(
  'account/fetchAccount',
  async (id, thunkApi) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

// Create a new account
export const createAccount = createAsyncThunk(
  'account/createAccount',
  async (accountData, thunkApi) => {
    try {
      const response = await axios.post(`${BASE_URL}`, accountData);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    addAccount(state, action) {
      state.accounts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accounts = action.payload;
        state.loading = false;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // fetch a single account
      .addCase(fetchAccount.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchAccount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.account = action.payload;
        state.loading = false;
      })
      .addCase(fetchAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // create a new account
      .addCase(createAccount.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accounts.push(action.payload);
        state.loading = false;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // update account balance
      .addCase(makeDeposit.fulfilled, (state, action) => {
        const account = state.accounts.find((account) => account.id === action.payload.account_id);
        if (account) {
          account.balance += action.payload.amount;
        }
      })
      .addCase(makeWithdrawal.fulfilled, (state, action) => {
        const account = state.accounts.find((account) => account.id === action.payload.account_id);
        if (account) {
          account.balance -= action.payload.amount;
        }
      });
  },
});

export const { addAccount } = accountsSlice.actions;

export default accountsSlice.reducer;
