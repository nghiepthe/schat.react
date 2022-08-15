import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '@store';

interface AuthState {
  isLoading: boolean;
  isSignout: boolean;
  id: string;
}

const initialState: AuthState = {
  isLoading: true,
  isSignout: false,
  id: '005',
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
export const selectUserId = (rootState: RootState) => rootState.auth.id;
