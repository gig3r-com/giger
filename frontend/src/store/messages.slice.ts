import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IConversation, IMessage } from '../models/message';
import { IHashData } from '../models/general';

export interface IConversationState {
    conversations: IConversation[];
    gigConversations: IConversation[];
    conversationHashes: Record<string, IHashData>;
    gigConversationHashes: Record<string, IHashData>;
    unreadMessages: Record<string, string[]>; // convoId, messageId[]
    unreadGigMessages: Record<string, string[]>; // convoId, messageId[]
}

const initialState: IConversationState = {
    conversations: [],
    gigConversations: [],
    conversationHashes: {},
    gigConversationHashes: {},
    unreadMessages: {},
    unreadGigMessages: {}
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
        addConversation: (state, action: PayloadAction<IConversation>) => {
            state.conversations.push(action.payload);
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
            if (!action.payload) return;
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
        },
        updateConversation: (
            state,
            action: PayloadAction<{
                convoId: string;
                message: IMessage;
                gigConvo: boolean;
                currentUserHandle: string;
            }>
        ) => {
            const convo = state[
                action.payload.gigConvo ? 'gigConversations' : 'conversations'
            ].find((c) => c.id === action.payload.convoId);

            if (!convo) return;
            const messageAlreadyExists = convo.messages
                .map((m) => m.id)
                .includes(action.payload.message.id);
            const isCurrentUsersMessage =
                action.payload.message.sender ===
                action.payload.currentUserHandle;

            if (!messageAlreadyExists) {
                convo.messages.push(action.payload.message);

                if (isCurrentUsersMessage) return;
                const convoAccessor =
                    action.payload.gigConvo
                        ? 'unreadGigMessages'
                        : 'unreadMessages'
                state[convoAccessor][convo.id] = [
                    ...(state[convoAccessor][convo.id] ?? []),
                    action.payload.message.id
                ];
            }
        },
        setUnreadMessage: (
            state,
            action: PayloadAction<{ convoId: string; messageId: string }>
        ) => {
            state.unreadMessages[action.payload.convoId] = [
                ...(state.unreadMessages[action.payload.convoId] ?? []),
                action.payload.messageId
            ];
        },
        setMessagesAsRead: (
            state,
            action: PayloadAction<{ convoId: string; gigConvo: boolean }>
        ) => {
            state[
                action.payload.gigConvo ? 'unreadGigMessages' : 'unreadMessages'
            ][action.payload.convoId] = [];
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
    setSeenGigConversationHash,
    updateConversation,
    setMessagesAsRead,
    addConversation,
    setUnreadMessage
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
