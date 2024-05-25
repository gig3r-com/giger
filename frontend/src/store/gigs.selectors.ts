import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IGigsState } from "./gigs.slice";

export const selectHasStatusUpdates = createSelector(
    (state: RootState) => state.gigs.gigStatusHashes,
    (hashes) => Object.values(hashes).some((hash) => hash.current !== hash.lastSeen)
)
export const selectStatusHashes = (state: RootState) => state.gigs.gigStatusHashes;
export const selectSelectedGig = createSelector(
    (state: RootState) => state.gigs,
    (state: IGigsState) => state.gigs.find(gig => gig.id === state.selectedGigId)
)