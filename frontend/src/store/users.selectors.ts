import { createSelector } from '@reduxjs/toolkit';
import {
    IGoal,
    IMeta,
    IPrivateRecord,
    IRelation,
    UserRoles
} from '../models/user';
import { addLockData } from '../shared/utils/addLockData';
import { IUsersState } from './users.slice';
import { ICriminalEvent, IMedEvent } from '../models/events';

export const selectCurrentUser = (state: { users: IUsersState }) =>
    state.users.currentUser;
export const selectUsers = (state: { users: IUsersState }) => state.users.users;
export const selectIsGod = (state: { users: IUsersState }) => state.users.isGod;
export const selectRequiresGodUserSelection = (state: { users: IUsersState }) =>
    state.users.requiresGodUserSelection;
export const selectIsAdmin = (state: { users: IUsersState }) =>
    state.users.currentUser?.roles.includes(UserRoles.ADMIN) ?? false;

export const selectActiveUsers = createSelector(
    (state: { users: IUsersState }) => state.users.users,
    (users) => users.filter((user) => user.active)
);
export const selectMedicalEvents = createSelector(
    (state: { users: IUsersState }) => state.users,
    (users) => {
        const revealCodes = users.currentUser?.revealCodes;
        const medEvents = users.currentUser?.medHistory;
        return medEvents && revealCodes
            ? addLockData<IMedEvent>(medEvents, revealCodes)
            : [];
    }
);
export const selectCriminalEvents = createSelector(
    (state: { users: IUsersState }) => state.users,
    (users) => {
        const revealCodes = users.currentUser?.revealCodes;
        const criminalEvents = users.currentUser?.criminalRecord;
        return criminalEvents && revealCodes
            ? addLockData<ICriminalEvent>(criminalEvents, revealCodes)
            : [];
    }
);
export const selectGoals = createSelector(
    (state: { users: IUsersState }) => state.users,
    (users) => {
        const revealCodes = users.currentUser?.revealCodes;
        const goals = users.currentUser?.goals;
        return goals && revealCodes
            ? addLockData<IGoal>(goals, revealCodes)
            : [];
    }
);
export const selectMeta = createSelector(
    (state: { users: IUsersState }) => state.users,
    (users) => {
        const revealCodes = users.currentUser?.revealCodes;
        const meta = users.currentUser?.meta;
        return meta && revealCodes ? addLockData<IMeta>(meta, revealCodes) : [];
    }
);
export const selectPrivateRecords = createSelector(
    (state: { users: IUsersState }) => state.users,
    (users) => {
        const revealCodes = users.currentUser?.revealCodes;
        const privateRecords = users.currentUser?.privateRecords;
        return privateRecords && revealCodes
            ? addLockData<IPrivateRecord>(privateRecords, revealCodes)
            : [];
    }
);
export const selectRelations = createSelector(
    (state: { users: IUsersState }) => state.users,
    (users) => {
        const revealCodes = users.currentUser?.revealCodes;
        const relations = users.currentUser?.relations;
        return relations && revealCodes
            ? addLockData<IRelation>(relations, revealCodes)
            : [];
    }
);
