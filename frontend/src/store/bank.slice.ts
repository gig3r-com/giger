import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    AccountType,
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
                accountType: AccountType;
                transaction: ITransaction;
            }>
        ) => {
            if (action.payload.accountType === AccountType.BUSINESS) {
                state.businessAccount!.transactions.push(
                    action.payload.transaction
                );
            } else {
                state.account!.transactions.push(action.payload.transaction);
            }
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
