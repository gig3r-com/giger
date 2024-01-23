import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../models/user';
import { users } from '../mocks/users';

export interface IUsersState {
    users: IUser[];
    currentUserId?: string;
}

const initialState: IUsersState = {
    users: JSON.parse(JSON.stringify(users)),
    currentUserId: undefined
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload;
        },
        setUser: (state, action: PayloadAction<IUser>) => {
            const userIndex = state.users.findIndex(
                (user) => user.id === action.payload.id
            );

            if (userIndex !== -1) {
                const updatedUsers = [...state.users];
                updatedUsers[userIndex] = action.payload;
                state.users = updatedUsers;
            }
        },
        setCurrentUser: (state, action: PayloadAction<string | undefined>) => {
            state.currentUserId = action.payload;
        }
    }
});

export const { setUsers, setCurrentUser, setUser } = usersSlice.actions;

export const selectCurrentUser = (state: { users: IUsersState }) =>
    state.users.users.find((user) => user.id === state.users.currentUserId);

export const selectUsers = (state: { users: IUsersState }) => state.users.users;

export default usersSlice.reducer;
