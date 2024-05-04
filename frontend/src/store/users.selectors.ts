import { createSelector } from '@reduxjs/toolkit';
import {
    UserRoles
} from '../models/user';
import { IUsersState } from './users.slice';

export const selectCurrentUser = (state: { users: IUsersState }) =>
    state.users.currentUser;
export const selectUsers = (state: { users: IUsersState }) => state.users.users;
export const selectIsGod = (state: { users: IUsersState }) =>
    state.users.currentUser?.roles.includes(UserRoles.GOD) ?? false;
export const selectRequiresGodUserSelection = (state: { users: IUsersState }) =>
    state.users.requiresGodUserSelection;
export const selectIsAdmin = (state: { users: IUsersState }) =>
    state.users.currentUser?.roles.includes(UserRoles.ADMIN) ?? false;

export const selectActiveUsers = createSelector(
    (state: { users: IUsersState }) => state.users.users,
    (users) => users.filter((user) => user.active)
);

export const selectRevealCodes = createSelector(
    (state: { users: IUsersState }) => state.users.currentUser?.revealCodes,
    (revealCodes) => revealCodes
);
