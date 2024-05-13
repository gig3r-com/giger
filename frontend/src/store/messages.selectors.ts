import { createSelector } from '@reduxjs/toolkit';
import { IConversationState } from './messages.slice';

export const selectHasUnreadMessages = createSelector(
    (state: { conversations: IConversationState }) =>
        state.conversations.conversationHashes,
    (conversationHashes) => {
        return Object.values(conversationHashes).some(
            (hashData) => hashData.lastSeen !== hashData.current
        );
    }
);
export const selectHasUnreadGigMessages = createSelector(
    (state: { conversations: IConversationState }) =>
        state.conversations.gigConversationHashes,
    (gigConversationHashes) => {
        return Object.values(gigConversationHashes).some(
            (hashData) => hashData.lastSeen !== hashData.current
        );
    }
);
