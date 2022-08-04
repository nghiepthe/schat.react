import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
  isLoading: boolean;
  isSignout: boolean;
}

const initialState: AuthState = {
  isLoading: true,
  isSignout: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onSignin(state) {
      state.isLoading = false;
      state.isSignout = false;
    },
    onSignout(state) {
      state.isLoading = false;
      state.isSignout = true;
    },
  },
});

export const {onSignin, onSignout} = authSlice.actions;
export const authReducer = authSlice.reducer;
