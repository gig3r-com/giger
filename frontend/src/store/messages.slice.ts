import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IConversation } from '../models/message';
import { IHashData } from '../models/general';

export interface IConversationState {
    conversations: IConversation[];
    gigConversations: IConversation[];
    conversationHashes: Record<string, IHashData>;
    gigConversationHashes: Record<string, IHashData>;
}

const initialState: IConversationState = {
    conversations: [],
    gigConversations: [],
    conversationHashes: {},
    gigConversationHashes: {}
};

export const conversationsSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        setConversations: (state, action: PayloadAction<IConversation[]>) => {
            state.conversations = action.payload;
        },
        setGigConversations: (
            state,
            action: PayloadAction<IConversation[]>
        ) => {
            state.gigConversations = action.payload;
        },
        setConversation: (state, action: PayloadAction<IConversation>) => {
            const convo = state[
                action.payload.gigConversation
                    ? 'gigConversations'
                    : 'conversations'
            ].find((c) => c.id === action.payload.id);

            if (convo) {
                convo.messages = action.payload.messages;
            } else {
                state.conversations.push(action.payload);
            }
        },
        setSeenConversationHash: (
            state,
            action: PayloadAction<{ convoId: string; hash: number }>
        ) => {
            state.conversationHashes[action.payload.convoId].lastSeen =
                action.payload.hash;
        },
        setSeenGigConversationHash: (
            state,
            action: PayloadAction<{ gigId: string; hashData: number }>
        ) => {
            state.gigConversationHashes[action.payload.gigId].lastSeen =
                action.payload.hashData;
        },
        setAllConversationHashes: (
            state,
            action: PayloadAction<Record<string, number>>
        ) => {
            Object.entries(action.payload).forEach(([conversationId, hash]) => {
                state.conversationHashes[conversationId].current = hash;
            });
        },
        setAllGigConversationHashes: (
            state,
            action: PayloadAction<Record<string, number>>
        ) => {
            Object.entries(action.payload).forEach(([gigId, hash]) => {
                state.gigConversationHashes[gigId].current = hash;
            });
        }
    }
});

export const {
    setConversations,
    setGigConversations,
    setConversation,
    setAllConversationHashes,
    setAllGigConversationHashes,
    setSeenConversationHash,
    setSeenGigConversationHash
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
