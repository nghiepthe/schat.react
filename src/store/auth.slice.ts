import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
  isLoading: boolean;
  isSignout: boolean;
  wallet: unknown;
}

const initialState: AuthState = {
  isLoading: true,
  isSignout: false,
  wallet: null,
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
