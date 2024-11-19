import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://belville-travel-agency.onrender.com/api';

const initialState = {
  transactions: [],
  transfers: [],
  status: 'idle',
  loading: false,
  error: null,
};

// Fetch all transactions
export const fetchTransactions = createAsyncThunk('transactions/fetchTransactions', async (_, thunkApi) => {
  try {
    const response = await axios.get(`${BASE_URL}/transactions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error.response);
    return thunkApi.rejectWithValue(error.response.data);
  }
});

// Fetch all transfers
export const fetchTransfers = createAsyncThunk('transfers/fetchTransfers', async (_, thunkApi) => {
  try {
    const response = await axios.get(`${BASE_URL}/transfers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transfers:', error.response);
    return thunkApi.rejectWithValue(error.response.data);
  }
});

// Make a deposit
export const makeDeposit = createAsyncThunk(
  'transaction/makeDeposit',
  async (transactionData, thunkApi) => {
    try {
      const response = await axios.post(`${BASE_URL}/transactions/deposit`, transactionData);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

// Make a withdrawal
export const makeWithdrawal = createAsyncThunk(
  'transaction/makeWithdrawal',
  async (transactionData, thunkApi) => {
    try {
      const response = await axios.post(`${BASE_URL}/transactions/withdraw`, transactionData);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

// Make a transfer
export const makeTransfer = createAsyncThunk(
  'transaction/makeTransfer',
  async (transferData, thunkApi) => {
    try {
      const response = await axios.post(`${BASE_URL}/transfers`, transferData);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction(state, action) {
      state.transactions.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions = action.payload;
        state.loading = false;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(fetchTransfers.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchTransfers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transfers = action.payload;
        state.loading = false;
      })
      .addCase(fetchTransfers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      // make a deposit
      .addCase(makeDeposit.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(makeDeposit.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions.push(action.payload);
        state.loading = false;
      })
      .addCase(makeDeposit.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      // make a withdrawal
      .addCase(makeWithdrawal.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(makeWithdrawal.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions.push(action.payload);
        state.loading = false;
      })
      .addCase(makeWithdrawal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      // make a transfer
      .addCase(makeTransfer.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(makeTransfer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transfers.push(action.payload);
        state.loading = false;
      })
      .addCase(makeTransfer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : action.error.message;
      });
  },
});

export const { addTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;