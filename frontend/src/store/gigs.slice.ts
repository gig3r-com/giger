import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GigCategoryNames, GigModes, IGig } from '../models/gig';

export interface GigsState {
    gigs: IGig[];
    selectedCategories: GigCategoryNames[];
    selectedMode: 'all' | GigModes;
    fetchingGigs: boolean;
}

const initialState: GigsState = {
    gigs: [],
    selectedCategories: [],
    selectedMode: 'all',
    fetchingGigs: false
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
        }
    }
});

export const {
    setGigs,
    addCategory,
    removeCategory,
    setCategories,
    setMode,
    setFetchingGigs
} = gigsSlice.actions;

export default gigsSlice.reducer;
