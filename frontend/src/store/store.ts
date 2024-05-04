import { configureStore } from '@reduxjs/toolkit';
import gigsReducer from './gigs.slice';
import conversationsReducer from './messages.slice';
import usersReducer from './users.slice';
import bankSlice from './bank.slice';
import eventsSlice from './events.slice';

export const store = configureStore({
    reducer: {
        gigs: gigsReducer,
        conversations: conversationsReducer,
        users: usersReducer,
        bank: bankSlice,
        events: eventsSlice
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
