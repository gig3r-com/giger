import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const selectHasNewTransfers = createSelector(
    (state: RootState) => state.bank.transferHashes,
    (hashes) => Object.values(hashes).some((hash) => hash.current !== hash.lastSeen)
)
export const selectTransferHashes = (state: RootState) => state.bank.transferHashes;