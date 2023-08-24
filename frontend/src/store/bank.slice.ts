import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAccount } from '../models/banking';

export interface BankState {
    account: IAccount | null;
    businessAccount: IAccount | null;
}

const initialState: BankState = {
    account: null,
    businessAccount: null
};

export const bankSlice = createSlice({
    name: 'bank',
    initialState,
    reducers: {
        setAccount: (state, action: PayloadAction<IAccount>) => {
            state.account = action.payload;
        },
        setBusinessAccount: (state, action: PayloadAction<IAccount>) => {
            state.businessAccount = action.payload;
        }
    }
});

export const { setAccount, setBusinessAccount } = bankSlice.actions;

export default bankSlice.reducer;
