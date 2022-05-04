import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import decode from 'jwt-decode';
import * as authApi from 'api/authAPIs';

export const login = createAsyncThunk('auth/login', (loginInfo) =>
  authApi.login(loginInfo),
);

export const register = createAsyncThunk('auth/login', (registerInfo) =>
  authApi.register(registerInfo),
);

const initialState = {
  isLoggedIn: false,
  userName: '',
  isLoading: false,
};

const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decodedToken = decode(token);
    return !!decodedToken.userId;
  } catch (e) {
    return false;
  }
};

const token = localStorage.getItem('token');

if (isTokenValid(token)) {
  initialState.isLoggedIn = true;
  initialState.userName = decode(token).userName;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      /* eslint-disable */
      state.isLoggedIn = false;
      state.userName = '';
      localStorage.removeItem('token');
      /* eslint-enable */
    },
    setIsLoading(state, action) {
      /* eslint-disable */
      state.isLoading = action.payload;
      /* eslint-enable */
    },
    resetAuthState: (state) => {
      /* eslint-disable */
      state.isLoggedIn = false;
      state.userName = '';
      state.isLoading = false;
      /* eslint-enable */
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      /* eslint-disable */
      localStorage.setItem('token', action.payload.data);
      state.isLoggedIn = true;
      state.userName = decode(action.payload.data).userName;
      /* eslint-enable */
    },
    [register.fulfilled]: (state, action) => {
      /* eslint-disable */
      localStorage.setItem('token', action.payload.data);
      state.isLoggedIn = true;
      state.userName = decode(action.payload.data).userName;
      /* eslint-enable */
    },
  },
});

export default authSlice.reducer;

export const { logIn, logout, resetAuthState } = authSlice.actions;
