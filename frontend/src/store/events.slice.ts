import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    IGoal,
    IMeta,
    IPrivateRecord,
    IRelation,
    IUserRecord,
    UserRecordTypes} from '../models/user';
import {
    EventRecordType,
    EventType,
    ICriminalEvent,
    IEvent,
    IMedEvent
} from '../models/events';

export interface IEventsState {
    privateRecords: IPrivateRecord[];
    medicalEvents: IMedEvent[];
    criminalEvents: ICriminalEvent[];
    goals: IGoal[];
    relations: IRelation[];
    meta: IMeta[];
}

const initialState: IEventsState = {
    privateRecords: [],
    medicalEvents: [],
    criminalEvents: [],
    goals: [],
    relations: [],
    meta: [],
};

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setEvents: (state, action: PayloadAction<{type: EventRecordType, events: EventType[]}>) => {
            if (action.payload.type === EventRecordType.CRIMINAL) {
                state.criminalEvents = action.payload.events as ICriminalEvent[];
            }
            if (action.payload.type === EventRecordType.MEDICAL) {
                state.medicalEvents = action.payload.events as IMedEvent[];
            }
        },
        setRecords: (state, action: PayloadAction<{type: UserRecordTypes, records: IUserRecord[]}>) => {
            if (action.payload.type === UserRecordTypes.META) {
                state.meta = action.payload.records as IMeta[];
            }
            if (action.payload.type === UserRecordTypes.GOAL) {
                state.goals = action.payload.records as IGoal[];
            }
            if (action.payload.type === UserRecordTypes.PRIVATE_RECORD) {
                state.privateRecords = action.payload.records as IPrivateRecord[];
            }
            if (action.payload.type === UserRecordTypes.RELATION) {
                state.relations = action.payload.records as IRelation[];
            }
        },
        addEvent: (
            state,
            action: PayloadAction<{ type: EventRecordType; event: IEvent }>
        ) => {
            if (action.payload.type === EventRecordType.CRIMINAL) {
                state.criminalEvents.push(
                    action.payload.event as ICriminalEvent
                );
            }

            if (action.payload.type === EventRecordType.MEDICAL) {
                state.medicalEvents.push(
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
            if (action.payload.type === EventRecordType.CRIMINAL) {
                const eventIndex = state.medicalEvents.findIndex(
                    (event) => event.id === action.payload.eventId
                );

                if (eventIndex !== -1) {
                    state.criminalEvents[eventIndex] = {
                        ...state.criminalEvents[eventIndex],
                        ...action.payload.updateData
                    };
                }
            }

            if (action.payload.type === EventRecordType.MEDICAL) {
                const eventIndex = state.medicalEvents.findIndex(
                    (event) => event.id === action.payload.eventId
                );

                if (eventIndex !== -1) {
                    state.medicalEvents[eventIndex] = {
                        ...state.medicalEvents[eventIndex],
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
            if (action.payload.type === UserRecordTypes.META) {
                state.meta.push(action.payload.record as IMeta);
            }

            if (action.payload.type === UserRecordTypes.GOAL) {
                state.goals.push(action.payload.record as IGoal);
            }

            if (action.payload.type === UserRecordTypes.PRIVATE_RECORD) {
                state.privateRecords.push(
                    action.payload.record as IPrivateRecord
                );
            }

            if (action.payload.type === UserRecordTypes.RELATION) {
                state.relations.push(
                    action.payload.record as IRelation
                );
            }
        },
        updateRecord: (
            state,
            action: PayloadAction<{
                type: UserRecordTypes;
                recordId: string;
                updateData: Partial<IUserRecord>;
            }>
        ) => {
            if (action.payload.type === UserRecordTypes.META) {
                const recordIndex = state.meta.findIndex(
                    (record) => record.id === action.payload.recordId
                );

                if (recordIndex !== -1) {
                    state.meta[recordIndex] = {
                        ...state.meta[recordIndex],
                        ...action.payload.updateData as IMeta
                    };
                }
            }

            if (action.payload.type === UserRecordTypes.GOAL) {
                const recordIndex = state.goals.findIndex(
                    (record) => record.id === action.payload.recordId
                );

                if (recordIndex !== -1) {
                    state.goals[recordIndex] = {
                        ...state.goals[recordIndex],
                        ...action.payload.updateData as IGoal
                    };
                }
            }

            if (action.payload.type === UserRecordTypes.PRIVATE_RECORD) {
                const recordIndex = state.privateRecords.findIndex(
                    (record) => record.id === action.payload.recordId
                );

                if (recordIndex !== -1) {
                    state.privateRecords[recordIndex] = {
                        ...state.privateRecords[recordIndex],
                        ...action.payload.updateData as IPrivateRecord
                    };
                }
            }

            if (action.payload.type === UserRecordTypes.RELATION) {
                const recordIndex = state.relations.findIndex(
                    (record) => record.id === action.payload.recordId
                );

                if (recordIndex !== -1) {
                    state.relations[recordIndex] = {
                        ...state.relations[recordIndex],
                        ...action.payload.updateData as IRelation
                    };
                }
            }
        }
    }
});

export const {
    setRecords,
    setEvents,
    addEvent,
    addRecord,
    updateEvent,
    updateRecord
} = eventsSlice.actions;

export default eventsSlice.reducer;
