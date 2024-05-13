import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    IBusinessAccount,
    IPrivateAccount,
    ITransaction
} from '../models/banking';

export interface BankState {
    account: IPrivateAccount | null;
    businessAccount: IBusinessAccount | null;
}

const initialState: BankState = {
    account: null,
    businessAccount: null
};

export const bankSlice = createSlice({
    name: 'bank',
    initialState,
    reducers: {
        setAccount: (state, action: PayloadAction<IPrivateAccount>) => {
            state.account = action.payload;
        },
        setBusinessAccount: (
            state,
            action: PayloadAction<IBusinessAccount>
        ) => {
            state.businessAccount = action.payload;
        },
        addTransaction: (
            state,
            action: PayloadAction<{
                transaction: ITransaction;
            }>
        ) => {
            if (!state.account || !state.businessAccount) return;
            const account = [state.account, state.businessAccount].find(
                (acc) =>
                    acc.owner === action.payload.transaction.to ||
                    acc.id === action.payload.transaction.from
            );

            if (!account) return;
            account.transactions.push(action.payload.transaction);
        }
    }
});

export const { setAccount, setBusinessAccount, addTransaction } =
    bankSlice.actions;

export const selectAccounts = createSelector(
    (state: { bank: BankState }) => state.bank,
    (bank) => {
        return {
            private: bank.account,
            business: bank.businessAccount
        };
    }
);

export default bankSlice.reducer;
