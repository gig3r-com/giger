import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    IGoal,
    IMeta,
    IPrivateRecord,
    IRelation,
    IUserBase,
    IUserPrivate,
    IUserRecord,
    UserRecordTypes} from '../models/user';
import { users } from '../mocks/users';
import { cloneDeep } from 'lodash-es';
import {
    EventRecordType,
    ICriminalEvent,
    IEvent,
    IMedEvent
} from '../models/events';

export interface IUsersState {
    users: IUserBase[];
    currentUser?: IUserPrivate;
    isGod: boolean;
    requiresGodUserSelection: boolean;
}

const initialState: IUsersState = {
    users: JSON.parse(JSON.stringify([...users])),
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
        },
        addEvent: (
            state,
            action: PayloadAction<{ type: EventRecordType; event: IEvent }>
        ) => {
            if (!state.currentUser) {
                return;
            }

            if (action.payload.type === EventRecordType.CRIMINAL) {
                state.currentUser.criminalRecord.push(
                    action.payload.event as ICriminalEvent
                );
            }

            if (action.payload.type === EventRecordType.MEDICAL) {
                state.currentUser.medHistory.push(
                    action.payload.event as IMedEvent
                );
            }
        },
        updateEvent: (
            state,
            action: PayloadAction<{
                type: EventRecordType;
                eventId: string;
                updateData: Partial<IEvent>;
            }>
        ) => {
            if (!state.currentUser) {
                return;
            }

            if (action.payload.type === EventRecordType.CRIMINAL) {
                const eventIndex = state.currentUser.criminalRecord.findIndex(
                    (event) => event.id === action.payload.eventId
                );

                if (eventIndex !== -1) {
                    state.currentUser.criminalRecord[eventIndex] = {
                        ...state.currentUser.criminalRecord[eventIndex],
                        ...action.payload.updateData
                    };
                }
            }

            if (action.payload.type === EventRecordType.MEDICAL) {
                const eventIndex = state.currentUser.medHistory.findIndex(
                    (event) => event.id === action.payload.eventId
                );

                if (eventIndex !== -1) {
                    state.currentUser.medHistory[eventIndex] = {
                        ...state.currentUser.medHistory[eventIndex],
                        ...action.payload.updateData
                    };
                }
            }
        },
        addRecord: (
            state,
            action: PayloadAction<{
                type: UserRecordTypes;
                record: IUserRecord;
            }>
        ) => {
            if (!state.currentUser) {
                return;
            }

            if (action.payload.type === UserRecordTypes.META) {
                state.currentUser.meta.push(action.payload.record as IMeta);
            }

            if (action.payload.type === UserRecordTypes.GOAL) {
                state.currentUser.goals.push(action.payload.record as IGoal);
            }

            if (action.payload.type === UserRecordTypes.PRIVATE_RECORD) {
                state.currentUser.privateRecords.push(
                    action.payload.record as IPrivateRecord
                );
            }

            if (action.payload.type === UserRecordTypes.RELATION) {
                state.currentUser.relations.push(
                    action.payload.record as IRelation
                );
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
    setRequiresGodUserSelection,
    addEvent,
    addRecord,
    updateEvent
} = usersSlice.actions;

export default usersSlice.reducer;
