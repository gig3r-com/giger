import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IConversation } from '../models/message';

export interface IConversationState {
    conversations: IConversation[];
    gigConversations: IConversation[];
}

const initialState: IConversationState = {
    conversations: [],
    gigConversations: []
};

export const conversationsSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        setConversations: (state, action: PayloadAction<IConversation[]>) => {
            state.conversations = action.payload;
        },
        setGigConversations: (state, action: PayloadAction<IConversation[]>) => {
            state.gigConversations = action.payload;
        }
    }
});

export const { setConversations } = conversationsSlice.actions;

export default conversationsSlice.reducer;
