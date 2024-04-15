import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserBase, IUserPrivate } from '../models/user';
import { users } from '../mocks/users';
import { cloneDeep } from 'lodash-es';

export interface IUsersState {
    users: IUserBase[];
    currentUser?: IUserPrivate;
    isGod: boolean;
    requiresGodUserSelection: boolean;
}

const initialState: IUsersState = {
    users: JSON.parse(JSON.stringify(users)),
    currentUser: undefined,
    isGod: false,
    requiresGodUserSelection: false
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
        setIsGod: (state, action: PayloadAction<boolean>) => {
            state.isGod = action.payload;
        },
        setRequiresGodUserSelection: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.requiresGodUserSelection = action.payload;
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
    setIsGod,
    setRequiresGodUserSelection
} = usersSlice.actions;

export const selectCurrentUser = (state: { users: IUsersState }) =>
    state.users.currentUser;
export const selectUsers = (state: { users: IUsersState }) => state.users.users;
export const selectIsGod = (state: { users: IUsersState }) =>
    state.users.isGod;
export const selectRequiresGodUserSelection = (state: {
    users: IUsersState;
}) => state.users.requiresGodUserSelection;

export default usersSlice.reducer;
