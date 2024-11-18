import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/transactions';

const initialState = {
  transactions: [],
  transaction: {},
  status: 'idle',
  loading: false,
  error: null,
};

// Fetch all transactions
export const fetchTransactions = createAsyncThunk('transactions/fetchTransactions', async (_, thunkApi) => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error.response);
    return thunkApi.rejectWithValue(error.response.data);
  }
});

// Make a deposit
export const makeDeposit = createAsyncThunk(
  'transaction/makeDeposit',
  async (transactionData, thunkApi) => {
    try {
      const response = await axios.post(`${BASE_URL}/deposit`, transactionData);
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
      const response = await axios.post(`${BASE_URL}/withdraw`, transactionData);
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
      const response = await axios.post(`${BASE_URL}/transfer`, transferData);
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
        state.transactions.push(action.payload);
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