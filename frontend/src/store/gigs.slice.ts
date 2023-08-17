import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GigCategoryNames, IGig } from '../models/gig';

export interface GigsState {
    gigs: IGig[];
    selectedCategories: GigCategoryNames[];
}

const initialState: GigsState = {
    gigs: [],
    selectedCategories: []
};

export const gigsSlice = createSlice({
    name: 'gigs',
    initialState,
    reducers: {
        setGigs: (state, action: PayloadAction<IGig[]>) => {
            state.gigs = action.payload;
        },
        setCategories: (state, action: PayloadAction<GigCategoryNames[]>) => {
            state.selectedCategories = action.payload;
        },
        addCategory: (state, action: PayloadAction<GigCategoryNames>) => {
            state.selectedCategories.push(action.payload);
        },
        removeCategory: (state, action: PayloadAction<GigCategoryNames>) => {
            state.selectedCategories = state.selectedCategories.filter(cat => cat !== action.payload);
        }
    }
});

export const { setGigs, addCategory, removeCategory, setCategories } = gigsSlice.actions;

export default gigsSlice.reducer;
