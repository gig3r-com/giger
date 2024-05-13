import { createSelector } from '@reduxjs/toolkit';
import { UserRoles } from '../models/user';
import { IUsersState } from './users.slice';

export const selectIsGod = (state: { users: IUsersState }) =>
    state.users.currentUser?.roles.includes(UserRoles.GOD) ?? false;
export const selectCurrentUser = createSelector(
    (state: { users: IUsersState }) => state.users.currentUser,
    (state: { users: IUsersState }) => state.users.viewAsUser,
    selectIsGod,
    (currentUser, viewAsUser, isGod) => {
        return isGod ? viewAsUser : currentUser;
    }
);
export const selectUsers = (state: { users: IUsersState }) => state.users.users;
export const selectRequiresGodUserSelection = (state: { users: IUsersState }) =>
    state.users.requiresGodUserSelection;
export const selectIsAdmin = createSelector(
    selectCurrentUser,
    (currentUser) => currentUser?.roles.includes(UserRoles.ADMIN) ?? false
);
export const selectIsModerator = createSelector(
    selectCurrentUser,
    (currentUser) => currentUser?.roles.includes(UserRoles.MODERATOR) ?? false
);

export const selectActiveUsers = createSelector(
    (state: { users: IUsersState }) => state.users.users,
    (users) => users.filter((user) => user.active)
);

export const selectRevealCodes = createSelector(
    selectCurrentUser,
    (currentUser) => currentUser?.revealCodes
);
