import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserBase, IUserPrivate } from '../models/user';
import { users } from '../mocks/users';
import { cloneDeep } from 'lodash-es';

export interface IUsersState {
    users: IUserBase[];
    currentUser?: IUserPrivate;
    isAdmin: boolean;
    requiresAdminUserSelection: boolean;
}

const initialState: IUsersState = {
    users: JSON.parse(JSON.stringify(users)),
    currentUser: undefined,
    isAdmin: false,
    requiresAdminUserSelection: false
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<IUserBase[]>) => {
            state.users = action.payload;
        },
        setUser: (state, action: PayloadAction<Partial<IUserBase>>) => {
            const userIndex = state.users.findIndex(
                (user) => user.id === action.payload.id
            );

            if (userIndex !== -1) {
                const updatedUsers = cloneDeep(state.users);
                updatedUsers[userIndex] = {
                    ...updatedUsers[userIndex],
                    ...action.payload
                };
                state.users = updatedUsers;
            }
        },
        setCurrentUser: (
            state,
            action: PayloadAction<IUserPrivate | undefined>
        ) => {
            state.currentUser = action.payload;
        },
        setIsAdmin: (state, action: PayloadAction<boolean>) => {
            state.isAdmin = action.payload;
        },
        setRequiresAdminUserSelection: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.requiresAdminUserSelection = action.payload;
        },
        updateCurrentUser: (
            state,
            action: PayloadAction<Partial<IUserPrivate>>
        ) => {
            if (state.currentUser) {
                state.currentUser = {
                    ...state.currentUser,
                    ...action.payload
                };
            }
        }
    }
});

export const {
    setUsers,
    setCurrentUser,
    setUser,
    updateCurrentUser,
    setIsAdmin,
    setRequiresAdminUserSelection
} = usersSlice.actions;

export const selectCurrentUser = (state: { users: IUsersState }) =>
    state.users.currentUser;
export const selectUsers = (state: { users: IUsersState }) => state.users.users;
export const selectIsAdmin = (state: { users: IUsersState }) =>
    state.users.isAdmin;
export const selectRequiresAdminUserSelection = (state: {
    users: IUsersState;
}) => state.users.requiresAdminUserSelection;

export default usersSlice.reducer;
