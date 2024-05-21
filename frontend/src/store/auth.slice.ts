import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
    authToken: string | null;
}

const initialState: AuthState = {
    authToken: localStorage.getItem('authToken') ?? null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthToken: (state, action: PayloadAction<string | null>) => {
            state.authToken = action.payload;
        }
    }
});

export const {
    setAuthToken
} = authSlice.actions;

export const selectAuthToken = (state: { auth: AuthState }) => state.auth.authToken;

export default authSlice.reducer;
