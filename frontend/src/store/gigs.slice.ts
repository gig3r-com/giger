import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GigCategoryNames, GigModes, IGig } from '../models/gig';
import { IHashData } from '../models/general';

export interface IGigsState {
    gigs: IGig[];
    selectedCategories: GigCategoryNames[];
    selectedMode: 'all' | GigModes;
    selectedGigId: string;
    fetchingGigs: boolean;
    gigStatusHashes: Record<string, IHashData>;
}

const initialState: IGigsState = {
    gigs: [],
    selectedCategories: [],
    selectedMode: 'all',
    selectedGigId: '',
    fetchingGigs: false,
    gigStatusHashes: {},
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
        setSeenStatusHash: (state, action: PayloadAction<{ gigId: string }>) => {
            state.gigStatusHashes[action.payload.gigId] = {
                current: state.gigStatusHashes[action.payload.gigId]?.current ?? 0,
                lastSeen: state.gigStatusHashes[action.payload.gigId]?.current ?? 0
            };
        },
        setNewStatusHash: (state, action: PayloadAction<{ gigId: string, hash: number }>) => {
            state.gigStatusHashes[action.payload.gigId] = {
                current: action.payload.hash,
                lastSeen: state.gigStatusHashes[action.payload.gigId]?.current ?? 0
            };
        },
        setSelectedGig: (state, action: PayloadAction<{ gigId: string }>) => {
            state.selectedGigId = action.payload.gigId;
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
    setSeenStatusHash,
    setNewStatusHash,
    setGigStatusHashes,
    setSelectedGig
} = gigsSlice.actions;

export default gigsSlice.reducer;
