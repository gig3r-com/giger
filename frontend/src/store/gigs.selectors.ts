import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const selectHasStatusUpdates = createSelector(
    (state: RootState) => state.gigs.gigStatusHashes,
    (hashes) => Object.values(hashes).some((hash) => hash.current !== hash.lastSeen)
)
export const selectStatusHashes = (state: RootState) => state.gigs.gigStatusHashes;
