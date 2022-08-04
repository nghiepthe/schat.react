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
    onLoadingComplete(state, action) {
      state.isLoading = false;
      state.isSignout = action.payload.isSignout;
    },
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

export const {onLoadingComplete, onSignin, onSignout} = authSlice.actions;
export const authReducer = authSlice.reducer;
