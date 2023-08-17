import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IConversation } from '../models/message';

export interface IConversationState {
    conversations: IConversation[];
}

const initialState: IConversationState = {
    conversations: []
};

export const conversationsSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        setConversations: (state, action: PayloadAction<IConversation[]>) => {
            state.conversations = action.payload;
        }
    }
});

export const { setConversations } = conversationsSlice.actions;

export default conversationsSlice.reducer;
