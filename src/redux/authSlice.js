import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for handling user login with error handling
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post('https://belville-travel-agency.onrender.com/auth/sign_in', userData);
      const { data, headers } = response;

      axios.defaults.headers.common['uid'] = headers['uid'];
      // Store tokens in local storage and set auth headers
      const setAuthToken = () => {
        const token = headers['access-token'];
        const client = headers['client'];
        const uid = headers['uid'];

        
        console.log('Access-Token:', token)
        console.log('Client:', client)
        console.log('UID:', uid)

        if (token) {
          // Store tokens in local storage
          localStorage.setItem('access-token', token);
          localStorage.setItem('client', client);
          localStorage.setItem('uid', uid);


          // Set token in axios headers for future requests
          axios.defaults.headers.common['access-token'] = token;
          axios.defaults.headers.common['client'] = client;
          axios.defaults.headers.common['uid'] = uid;
        } else {
          delete axios.defaults.headers.common['access-token'];
          delete axios.defaults.headers.common['client'];
          delete axios.defaults.headers.common['uid'];
        }
      };

      // Call setAuthToken to set the authorization headers
      setAuthToken();

      // Dispatch setUser to update state
      dispatch(setUser(data));
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Thunk for handling user signup with error handling
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post('https://belville-travel-agency.onrender.com/auth', userData);
      const { data, headers } = response;

      // Store tokens in local storage and set auth headers
      const setAuthToken = () => {
        const token = headers['access-token'];
        const client = headers['client'];
        const uid = headers['uid'];

        if (token) {
          // Store tokens in local storage
          localStorage.setItem('access-token', token);
          localStorage.setItem('client', client);
          localStorage.setItem('uid', uid);

          // Set token in axios headers for future requests
          axios.defaults.headers.common['access-token'] = token;
          axios.defaults.headers.common['client'] = client;
          axios.defaults.headers.common['uid'] = uid;
        } else {
          delete axios.defaults.headers.common['access-token'];
          delete axios.defaults.headers.common['client'];
          delete axios.defaults.headers.common['uid'];
        }
      };

      // Call setAuthToken to set the authorization headers
      setAuthToken();

      // Dispatch setUser to update state
      dispatch(setUser(data));
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

// Thunk for handling user logout
export const logoutUser = () => (dispatch) => {
  // Clear local storage and remove token headers
  localStorage.removeItem('access-token');
  localStorage.removeItem('client');
  localStorage.removeItem('uid');
  
  // Remove authorization headers
  setAuthToken();
  
  // Dispatch clearUser to reset state
  dispatch(clearUser());
};

// Utility function to set headers for axios globally+
export const setAuthToken = () => {
  const accessToken = localStorage.getItem('access-token');
  const client = localStorage.getItem('client');
  const uid = localStorage.getItem('uid');

  if (accessToken && client && uid) {
    axios.defaults.headers.common['access-token'] = accessToken;
    axios.defaults.headers.common['client'] = client;
    axios.defaults.headers.common['uid'] = uid;
  } else {
    delete axios.defaults.headers.common['access-token'];
    delete axios.defaults.headers.common['client'];
    delete axios.defaults.headers.common['uid'];
  }
};

// Reducer slice to manage user authentication state
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
