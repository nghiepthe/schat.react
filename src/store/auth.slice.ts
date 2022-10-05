import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@store';

interface AuthState {
  isLoading: boolean;
  isSignout: boolean;
  id: string;
  connectionId: string;
}

const initialState: AuthState = {
  isLoading: true,
  isSignout: false,
  connectionId: "",
  id: "",
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLoadingComplete(state) {
      state.isLoading = false;
      state.isSignout = true;
    },
    onUpdateConnectionId(state, action) {
      state.connectionId = action.payload;
    }
  },
});

export const { onLoadingComplete, onUpdateConnectionId } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectUserId = (rootState: RootState) => rootState.auth.id;
export const selectConnectionId = (rootState: RootState) => rootState.auth.connectionId;
