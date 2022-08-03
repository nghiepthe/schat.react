import {createSlice} from '@reduxjs/toolkit';
import {io, Socket} from 'socket.io-client';

interface AuthState {
  isLoading: boolean;
  isSignout: boolean;
  connected: boolean;
}

const initialState: AuthState = {
  isLoading: true,
  isSignout: false,
  connected: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin(state) {
      state.isLoading = false;
    },
    restore(state) {
      state.isLoading = false;
    },
  },
});

export const {signin, restore} = authSlice.actions;
export const authReducer = authSlice.reducer;
