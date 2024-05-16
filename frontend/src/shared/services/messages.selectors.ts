import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export const selectConversations = createSelector(
    (state: RootState) => state.conversations.conversations,
    (conversations) => conversations
);
export const selectUnreadMessages = createSelector(
    (state: RootState) => state.conversations.unreadMessages,
    (unreadMessages) => unreadMessages
);
export const selectGigConversations = createSelector(
    (state: RootState) => state.conversations.gigConversations,
    (gigConversations) => gigConversations
);
