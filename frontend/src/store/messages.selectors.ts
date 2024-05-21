import { createSelector } from '@reduxjs/toolkit';
import { IConversationState } from './messages.slice';

export const selectHasUnreadMessages = createSelector(
    (state: { conversations: IConversationState }) =>
        state.conversations.unreadMessages,
    (unreadMessages) => {
        return Object.values(unreadMessages).flat().length > 0;
    }
);

export const selectHasGigUnreadMessages = createSelector(
    (state: { conversations: IConversationState }) =>
        state.conversations.unreadGigMessages,
    (unreadMessages) => {
        return Object.values(unreadMessages).flat().length > 0;
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
