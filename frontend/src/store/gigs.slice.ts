import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GigCategoryNames, GigModes, IGig } from '../models/gig';
import { IHashData } from '../models/general';

export interface GigsState {
    gigs: IGig[];
    selectedCategories: GigCategoryNames[];
    selectedMode: 'all' | GigModes;
    fetchingGigs: boolean;
    gigStatusHashes: Record<string, IHashData>;
}

const initialState: GigsState = {
    gigs: [],
    selectedCategories: [],
    selectedMode: 'all',
    fetchingGigs: false,
    gigStatusHashes: {}
};

export const gigsSlice = createSlice({
    name: 'gigs',
    initialState,
    reducers: {
        setGigs: (state, action: PayloadAction<IGig[]>) => {
            state.gigs = action.payload;
        },
        updateGig: (state, action: PayloadAction<IGig>) => {
            const updatedGigs = state.gigs.filter(
                (gig) => gig.id !== action.payload.id
            );
            updatedGigs.push(action.payload);
            state.gigs = updatedGigs;
        },
        removeGig: (state, action: PayloadAction<string>) => {
            state.gigs = state.gigs.filter((gig) => gig.id !== action.payload);
        },
        setCategories: (state, action: PayloadAction<GigCategoryNames[]>) => {
            state.selectedCategories = action.payload;
        },
        setMode: (state, action: PayloadAction<'all' | GigModes>) => {
            state.selectedMode = action.payload;
        },
        addCategory: (state, action: PayloadAction<GigCategoryNames>) => {
            state.selectedCategories.push(action.payload);
        },
        removeCategory: (state, action: PayloadAction<GigCategoryNames>) => {
            state.selectedCategories = state.selectedCategories.filter(
                (cat) => cat !== action.payload
            );
        },
        setFetchingGigs: (state, action: PayloadAction<boolean>) => {
            state.fetchingGigs = action.payload;
        },
        setGigStatusHashes: (
            state,
            action: PayloadAction<Record<string, number>>
        ) => {
            Object.keys(action.payload).forEach((hash) => {
                state.gigStatusHashes[hash] = {
                    current: action.payload[hash],
                    lastSeen: state.gigStatusHashes[hash]?.current ?? 0
                };
            });
        },
        setSeenStatusHash: (state, action: PayloadAction<{gigId: string}>) => {
            state.gigStatusHashes[action.payload.gigId] = {
                current: state.gigStatusHashes[action.payload.gigId]?.current ?? 0,
                lastSeen: state.gigStatusHashes[action.payload.gigId]?.current ?? 0
            };
        }

    }
});

export const {
    setGigs,
    addCategory,
    updateGig,
    removeGig,
    removeCategory,
    setCategories,
    setMode,
    setFetchingGigs,
    setSeenStatusHash
} = gigsSlice.actions;

export default gigsSlice.reducer;
