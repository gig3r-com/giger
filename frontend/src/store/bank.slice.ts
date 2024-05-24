import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    IBusinessAccount,
    IPrivateAccount,
    ITransaction
} from '../models/banking';
import { IHashData } from '../models/general';

export interface BankState {
    account: IPrivateAccount | null;
    businessAccount: IBusinessAccount | null;
    transferHashes: Record<string, IHashData>;
}

const initialState: BankState = {
    account: null,
    businessAccount: null,
    transferHashes: {}
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
        },
        setTransferHashes: (
            state,
            action: PayloadAction<Record<string, number>>
        ) => {
            Object.keys(action.payload).forEach((id) => {
                state.transferHashes[id] = {
                    current: action.payload[id],
                    lastSeen: state.transferHashes[id].current ?? 0
                };
            })
        },
        setNewCurrentTransferHash: (
            state,
            action: PayloadAction<{ id: string; hash: number }>
        ) => {
            state.transferHashes[action.payload.id] = {
                current: action.payload.hash,
                lastSeen: state.transferHashes[action.payload.id]?.current ?? 0
            };

        },
        setSeenTransferHash: (
            state,
            action: PayloadAction<{ id: string }>
        ) => {
            if (state.transferHashes[action.payload.id]) {
                state.transferHashes[action.payload.id].lastSeen = state.transferHashes[action.payload.id].current;
            }
        }
    }
});

export const { setAccount, setBusinessAccount, addTransaction, setTransferHashes, setSeenTransferHash, setNewCurrentTransferHash } =
    bankSlice.actions;

export const selectAccounts = createSelector(
    (state: { bank: BankState }) => state.bank,
    (bank) => {
        return {
            private: bank.account,
            ...(bank.businessAccount ? { business: bank.businessAccount } : {})
        };
    }
);

export default bankSlice.reducer;
