import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserBase, IUserPrivate, UserRoles } from '../models/user';
import { cloneDeep } from 'lodash-es';

export interface IUsersState {
    users: IUserBase[];
    currentUser?: IUserPrivate;
    requiresGodUserSelection: boolean;
    viewAsUser: IUserPrivate | null;
}

const initialState: IUsersState = {
    users: [],
    currentUser: undefined,
    requiresGodUserSelection: false,
    viewAsUser: null
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
            if (!state.currentUser) return;
            const godMode = state.currentUser.roles.includes(UserRoles.GOD);
            state[godMode ? 'viewAsUser' : 'currentUser'] = {
                ...state.currentUser,
                ...action.payload
            };
        },
        setViewAsUser: (state, action: PayloadAction<IUserPrivate | null>) => {
            state.viewAsUser = action.payload;
        },
        updateViewAsUser: (
            state,
            action: PayloadAction<Partial<IUserPrivate>>
        ) => {
            if (state.viewAsUser) {
                state.viewAsUser = {
                    ...state.viewAsUser,
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
    setViewAsUser,
    updateViewAsUser,
    updateCurrentUser,
    setRequiresGodUserSelection
} = usersSlice.actions;

export default usersSlice.reducer;
